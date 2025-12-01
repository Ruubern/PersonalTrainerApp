import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, CssBaseline, Drawer, IconButton, List, ListItem, ListItemText, ListItemButton, Container, Box } from '@mui/material';
import Customerlist from './components/Customerlist';
import Traininglist from './components/Traininglist';
import MenuIcon from '@mui/icons-material/Menu';

function App() {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState('customers');

  const handleViewChange = (newView: 'customers' | 'trainings') => {
    setView(newView);   //Asettaa uuden näkymän
    setOpen(false);     //Sulkee drawerin valinnan jälkeen
  };

  return (
    <>
      <CssBaseline />
      <AppBar>
        <Toolbar>
          <IconButton color="inherit" edge="start" onClick={() => setOpen(true)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">PersonalTrainerApp</Typography>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
        <List>
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
        </List>
      </Drawer>

      <Container sx={{ mt: 12 }}>
        <Box sx={{ maxWidth: 900, margin: '0 auto' }}>
          {view === 'customers' && <Customerlist />}
          {view === 'trainings' && <Traininglist />}
        </Box>
      </Container>


    </>
  );
}

export default App;
