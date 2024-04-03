import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Patient } from '../../../types';

interface EditPopupProps {
  open: boolean; 
  onClose: () => void;
  patient: Patient | null;
  onSave: (editedPatient: Patient) => void;
}

const EditPopup: React.FC<EditPopupProps> = ({ open, onClose, patient, onSave }) => {
  const [editedPatient, setEditedPatient] = useState<Patient | null>(null);

  useEffect(() => {
    setEditedPatient(patient);
  }, [patient]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedPatient(prevPatient => ({
      ...(prevPatient as Patient || {}),
      [name]: value
    }));
  };

  const handleSave = async () => {
    if (editedPatient) {
        try {
          const url = 'http://localhost:5000/edit/' + editedPatient.id.toString();
          const response = await fetch(url, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(editedPatient)
          });
          if (response.ok) {
            onSave(editedPatient);
            onClose();
          } else {
            console.error('Failed to update new patient');
          }
        } catch (error) {
          console.error('Error updating new patient:', error);
        }
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Patient</DialogTitle>
      <DialogContent style={{ paddingBottom: '24px', paddingTop: '24px' }}>
        {editedPatient && (
          <>
            <TextField
              name="first_name"
              label="First Name"
              value={editedPatient.first_name}
              onChange={handleChange}
              fullWidth
              style={{ marginBottom: '16px' }}
            />
            <TextField
              name="last_name"
              label="Last Name"
              value={editedPatient.last_name}
              onChange={handleChange}
              fullWidth
              style={{ marginBottom: '16px' }}
            />
            <TextField
              name="pesel"
              label="PESEL"
              value={editedPatient.pesel}
              onChange={handleChange}
              fullWidth
              style={{ marginBottom: '16px' }}
            />
            <TextField
              name="street"
              label="Street"
              value={editedPatient.street}
              onChange={handleChange}
              fullWidth
              style={{ marginBottom: '16px' }}
            />
            <TextField
              name="city"
              label="City"
              value={editedPatient.city}
              onChange={handleChange}
              fullWidth
              style={{ marginBottom: '16px' }}
            />
            <TextField
              name="post_code"
              label="Post Code"
              value={editedPatient.post_code}
              onChange={handleChange}
              fullWidth
              style={{ marginBottom: '16px' }}
            />
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSave} color="primary">Save</Button>
        <Button onClick={onClose} color="secondary">Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditPopup;
