import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Patient } from '../../../types';

interface SearchDialogProps {
  open: boolean;
  onClose: () => void;
  onSearch: (patients: Patient[]) => void;
}

const SearchDialog: React.FC<SearchDialogProps> = ({ open, onClose, onSearch }) => {
    const [searchPatient, setSearchPatient] = useState<Patient>({
        id: 14,
        first_name: '',
        last_name: '',
        pesel: '',
        street: '',
        city: '',
        post_code: '',
        created_at: '',
        updated_at: ''
      });
      

      const handleSearch = () => {
        const queryString = Object.entries(searchPatient)
          .filter(([key, value]) => value !== '')
          .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
          .join('&');
        fetch(`http://localhost:5000/search/?${queryString}`)
          .then(response => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error('Failed to search patients');
            }
          })
          .then(data => {
            onSearch(data);
            onClose();
          })
          .catch(error => {
            console.error('Error searching patients:', error);
          });
      };
      
      
      

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearchPatient(prevPatient => ({
      ...prevPatient,
      [name]: value
    }));
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Search Patients</DialogTitle>
      <DialogContent style={{ paddingBottom: '24px', paddingTop: '24px' }}>
        <TextField
          name="first_name"
          label="First Name"
          value={searchPatient.first_name}
          onChange={handleChange}
          fullWidth
          placeholder="Enter first name"
          style={{ marginBottom: '16px' }}
        />
        <TextField
          name="last_name"
          label="Last Name"
          value={searchPatient.last_name}
          onChange={handleChange}
          fullWidth
          placeholder="Enter last name"
          style={{ marginBottom: '16px' }}
        />
        <TextField
          name="pesel"
          label="PESEL"
          value={searchPatient.pesel}
          onChange={handleChange}
          fullWidth
          placeholder="Enter PESEL"
          style={{ marginBottom: '16px' }}
        />
        <TextField
          name="street"
          label="Street"
          value={searchPatient.street}
          onChange={handleChange}
          fullWidth
          placeholder="Enter street"
          style={{ marginBottom: '16px' }}
        />
        <TextField
          name="city"
          label="City"
          value={searchPatient.city}
          onChange={handleChange}
          fullWidth
          placeholder="Enter city"
          style={{ marginBottom: '16px' }}
        />
        <TextField
          name="post_code"
          label="Post Code"
          value={searchPatient.post_code}
          onChange={handleChange}
          fullWidth
          placeholder="Enter post code"
          style={{ marginBottom: '16px' }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSearch} color="primary">Search</Button>
        <Button onClick={onClose} color="secondary">Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default SearchDialog;
