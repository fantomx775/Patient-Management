import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Patient } from '../../../types';

interface AddPatientPopupProps {
  open: boolean;
  onClose: () => void;
  onSave: (newPatient: Patient) => void;
}

const AddPatientPopup: React.FC<AddPatientPopupProps> = ({ open, onClose, onSave }) => {
  const [newPatient, setNewPatient] = useState<Patient>({
    id: -1,
    first_name: '',
    last_name: '',
    pesel: '',
    street: '',
    city: '',
    post_code: '',
    created_at: '',
    updated_at: ''
  });

  const handleSave = async () => {
    try {
      const response = await fetch('http://localhost:5000/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPatient)
      });
      if (response.ok) {
        newPatient.id = (await response.json()).id;
        newPatient.created_at = new Date().toISOString();
        newPatient.updated_at = new Date().toISOString();
        onSave(newPatient);
        onClose();
      } else {
        console.error('Failed to save new patient');
      }
    } catch (error) {
      console.error('Error saving new patient:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewPatient(prevPatient => ({
      ...prevPatient,
      [name]: value
    }));
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Patient</DialogTitle>
      <DialogContent style={{ paddingBottom: '24px', paddingTop: '24px' }}>
        <TextField
          name="first_name"
          label="First Name"
          value={newPatient.first_name}
          onChange={handleChange}
          fullWidth
          placeholder="Enter first name"
          style={{ marginBottom: '16px' }}
        />
        <TextField
          name="last_name"
          label="Last Name"
          value={newPatient.last_name}
          onChange={handleChange}
          fullWidth
          placeholder="Enter last name"
          style={{ marginBottom: '16px' }}
        />
        <TextField
          name="pesel"
          label="PESEL"
          value={newPatient.pesel}
          onChange={handleChange}
          fullWidth
          placeholder="Enter PESEL"
          style={{ marginBottom: '16px' }}
        />
        <TextField
          name="street"
          label="Street"
          value={newPatient.street}
          onChange={handleChange}
          fullWidth
          placeholder="Enter street"
          style={{ marginBottom: '16px' }}
        />
        <TextField
          name="city"
          label="City"
          value={newPatient.city}
          onChange={handleChange}
          fullWidth
          placeholder="Enter city"
          style={{ marginBottom: '16px' }}
        />
        <TextField
          name="post_code"
          label="Post Code"
          value={newPatient.post_code}
          onChange={handleChange}
          fullWidth
          placeholder="Enter post code"
          style={{ marginBottom: '16px' }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSave} color="primary">Save</Button>
        <Button onClick={onClose} color="secondary">Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddPatientPopup;
