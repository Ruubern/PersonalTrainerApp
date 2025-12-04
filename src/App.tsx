import { useState } from 'react';
import { AppBar, Toolbar, Typography, CssBaseline, Drawer, IconButton, List, ListItem, ListItemText, ListItemButton, Box } from '@mui/material';
import Customerlist from './components/Customerlist';
import Traininglist from './components/Traininglist';
import MenuIcon from '@mui/icons-material/Menu';
import TrainingCalendar from './components/TrainingCalendar';

function App() {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState('customers');

  const handleViewChange = (newView: 'customers' | 'trainings' | 'calendar') => {
    setView(newView);   //Asettaa uuden näkymän
    setOpen(false);     //Sulkee drawerin valinnan jälkeen
  };

  return (
    <Box sx={{ display: 'flex'}}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton color="inherit" edge="start" onClick={() => setOpen(true)} sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            PersonalTrainerApp
          </Typography>
        </Toolbar>
      </AppBar>
      
      <Drawer 
      anchor="left" 
      open={open} 
      onClose={() => setOpen(false)}
      ModalProps={{keepMounted: true}}>
          <List sx={{ marginTop: 8 }}>
            <ListItem disablePadding>
              <ListItemButton onClick={() => handleViewChange('customers')}>
                <ListItemText primary="Customers" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => handleViewChange('trainings')}>
                <ListItemText primary="Trainings" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => handleViewChange('calendar')}>
                <ListItemText primary="Calendar" />
              </ListItemButton>
            </ListItem>
          </List>
      </Drawer>

      <Toolbar />
      <Box 
        component="main" 
        sx={{ flexGrow: 1, 
        p: 3, margin: "0 auto", 
        maxWidth: 1800,
        width: '100%'}}>

        {view === 'customers' && <Customerlist />}
        {view === 'training sessions' && <Traininglist />}
        {view === 'calendar' && <TrainingCalendar />}
      </Box>
    </Box>
  );
}

export default App;
