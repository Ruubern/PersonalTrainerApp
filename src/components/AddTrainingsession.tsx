import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import DialogTitle from '@mui/material/DialogTitle';
import type { TrainingForm } from '../types';
import { saveTraining } from '../trainingApi';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

type AddTrainingProps = {
    fetchTrainings: () => void;
    customerLink: string;
}

export default function AddTraining({ fetchTrainings, customerLink }: AddTrainingProps) {
    
    const [open, setOpen] = useState(false);

    const [training, setTraining] = useState<TrainingForm>({
        date: new Date() ,
        duration: 0,
        activity: "",
        customer: customerLink
        }
    );

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setTraining(
            {
                date: new Date() ,
                duration: 0,
                activity: "",
                customer: customerLink
            }
        )
    };

    const handleSave = () => {

        saveTraining(training) // funktio määritelty customerApi.ts tiedostossa
            .then(() => {
                fetchTrainings();
                handleClose();

            })
            .catch(err => console.error(err))
    };

    return (
        <>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add Training Session
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add new session</DialogTitle>
                <DialogContent>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                        label="Date and Time"
                        value={dayjs(training.date)}
                        onChange={(newValue) => 
                            setTraining({ ...training, date: newValue ? newValue.toDate() : new Date() })}
                    />
                    </LocalizationProvider>
                    <TextField
                        margin="dense"
                        required
                        label="duration"
                        value={training.duration}
                        onChange={event => setTraining({ ...training, duration: Number(event.target.value) })}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        label="Activity"
                        value={training.activity}
                        onChange={event => setTraining({ ...training, activity: event.target.value })}
                        fullWidth
                        variant="standard"
                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}