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

  const handleSave = () => {
    if (editedPatient) {
      onSave(editedPatient);
      onClose();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedPatient((prevPatient: Patient | null) => ({
      ...(prevPatient as Patient || {}),
      [name]: value
    }));
  };
  
  
  

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Patient</DialogTitle>
      <DialogContent style={{ paddingBottom: '24px', paddingTop: '24px' }}>
        {editedPatient && (
          <>
            <TextField
              name="firstName"
              label="First Name"
              value={editedPatient.firstName}
              onChange={handleChange}
              fullWidth
              style={{ marginBottom: '16px' }}
            />
            <TextField
              name="lastName"
              label="Last Name"
              value={editedPatient.lastName}
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
              name="postCode"
              label="Post Code"
              value={editedPatient.postCode}
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
