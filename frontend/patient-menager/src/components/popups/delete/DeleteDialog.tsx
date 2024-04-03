import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Patient } from '../../../types';

interface DeleteDialogProps {
    onClose: (deleted: boolean) => void;
    patient: Patient | null;
    onDelete: (editedPatient: Patient) => void;
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({ onClose, patient, onDelete }) => {
    const handleDelete = async () => {
        if (patient) {
            try {
                const url = 'http://localhost:5000/delete/' + patient.id.toString();
                const response = await fetch(url, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(patient)
                });
                if (response.ok) {
                    onDelete(patient);
                    onClose(true);
                } else {
                    console.error('Failed to delete patient');
                }
            } catch (error) {
                console.error('Error deleting patient:', error);
                onClose(false);

            }
        }
    };

    const handleClose = () => {
        onClose(false);
    };

    return (
        <React.Fragment>
            <Dialog
                open={true}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Are you sure you want to delete this patient?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Deleting this patient will permanently remove it from the system. This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleDelete} autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>

    );
}

export default DeleteDialog;