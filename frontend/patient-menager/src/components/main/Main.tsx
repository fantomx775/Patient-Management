import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Patient } from '../../types';
import EditPopup from '../popups/edit/EditPopup';
import AddPopup from '../popups/add/AddPopup';
import DeleteDialog from '../popups/delete/DeleteDialog';
import React, { useEffect, useState } from 'react';
import SearchDialog from '../popups/search/SearchDialog';

const Main = () => {
  const _patients: Patient[] = [
    {
      id: 1,
      first_name: 'John',
      last_name: 'Doe',
      pesel: '12345678901',
      street: 'Main Street',
      city: 'London',
      post_code: '00-000',
      created_at: '2024-04-01', // example string date
      updated_at: '2024-04-01', // example string date
    },];
  const [openEditPopup, setOpenEditPopup] = useState(false);
  const [openAddPopup, setOpenAddPopup] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openSearchDialog, setOpenSearchDialog] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [patients, setPatients] = useState<Patient[]>([]);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5000/patients');
      if (response.ok) {
        const data = await response.json();
        let patients_list = [];
        console.log('Data:', data);
        for (let i = 0; i < data.length; i++) {
          const patient = data[i];
          console.log('Patient:', patient.first_name);
          patients_list.push({
            id: patient.id,
            first_name: patient.first_name,
            last_name: patient.last_name,
            pesel: patient.pesel,
            street: patient.street,
            city: patient.city,
            post_code: patient.post_code,
            created_at: patient.created_at,
            updated_at: patient.updated_at
          });
        }

        setPatients(data);
      } else {
        console.error('Error fetching data');
      }
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  const handleEdit = (patient: Patient) => {
    setSelectedPatient(patient);
    setOpenEditPopup(true);
  };

  const handleDelete = (patient: Patient) => {
    setSelectedPatient(patient);
    setOpenDeleteDialog(true);
  };

  const handleAdd = () => {
    setOpenAddPopup(true);
  };

  const handleSearch = () => {
    setOpenSearchDialog(true);
  }

  const handleSaveAdd = (newPatient: Patient) => {
    console.log('New Patient:', newPatient);
    const updatedPatients = [newPatient, ...patients];
    setPatients(updatedPatients);
  }

  const handleCloseAddPopup = () => {
    setOpenAddPopup(false);
  };

  const handleCloseEditPopup = () => {
    setOpenEditPopup(false);
  };

  const handleCloseSearchDialog = () => {
    setOpenSearchDialog(false);
  }

  const handleSearching = (patients: Patient[]) => {
    setPatients(patients);
  }

  const handleCloseDeleteDialog = (deleted: boolean) => {
    if (deleted) {
      const index = patients.findIndex(patient => patient.id === selectedPatient?.id);
      if (index !== -1) {
        const updatedPatients = [...patients];
        updatedPatients.splice(index, 1);
        setPatients(updatedPatients);
      } else {
        console.error('Deleted patient not found in the patients array.');
      }
    }
    setOpenDeleteDialog(false);
  }

  const handleSaveEdit = (editedPatient: Patient) => {
    console.log('Edited Patient:', editedPatient);

    const index = patients.findIndex(patient => patient.id === editedPatient.id);

    if (index !== -1) {
      const updatedPatients = [...patients];
      updatedPatients[index] = editedPatient;
      setPatients(updatedPatients);
    } else {
      console.error('Edited patient not found in the patients array.');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ maxWidth: '1200px' }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>ID</StyledTableCell>
                <StyledTableCell align="center">First Name</StyledTableCell>
                <StyledTableCell align="center">Last Name</StyledTableCell>
                <StyledTableCell align="center">PESEL</StyledTableCell>
                <StyledTableCell align="center">Street</StyledTableCell>
                <StyledTableCell align="center">City</StyledTableCell>
                <StyledTableCell align="center">Post Code</StyledTableCell>
                <StyledTableCell align="center">Created At</StyledTableCell>
                <StyledTableCell align="center">Updated At</StyledTableCell>
                <StyledTableCell align="center">Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {patients.map((patient) => (
                <StyledTableRow key={patient.id}>
                  <StyledTableCell component="th" scope="row">
                    {patient.id}
                  </StyledTableCell>
                  <StyledTableCell align="center">{patient.first_name}</StyledTableCell>
                  <StyledTableCell align="center">{patient.last_name}</StyledTableCell>
                  <StyledTableCell align="center">{patient.pesel}</StyledTableCell>
                  <StyledTableCell align="center">{patient.street}</StyledTableCell>
                  <StyledTableCell align="center">{patient.city}</StyledTableCell>
                  <StyledTableCell align="center">{patient.post_code}</StyledTableCell>
                  <StyledTableCell align="center">{patient.created_at}</StyledTableCell>
                  <StyledTableCell align="center">{patient.updated_at}</StyledTableCell>
                  <StyledTableCell align="center" style={{ width: '150px' }}>
                    <button style={{ marginRight: '5px', padding: '5px 10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }} onClick={() => handleEdit(patient)}>Edit</button>
                    <button style={{ padding: '5px 10px', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }} onClick={() => handleDelete(patient)}>Delete</button>
                  </StyledTableCell>

                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {openEditPopup && <EditPopup
          open={openEditPopup}
          onClose={handleCloseEditPopup}
          patient={selectedPatient}
          onSave={handleSaveEdit}
        />}
      </div>
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
      <button style={{ marginRight: '5px', padding: '5px 10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }} onClick={() => handleAdd()}>Add</button>
      <button style={{ marginRight: '5px', padding: '5px 10px', backgroundColor: '#fd7e14', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }} onClick={() => handleSearch()}>Search</button>
      <button style={{ padding: '5px 10px', backgroundColor: '#fd79a2', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }} onClick={() => fetchData()}>Get All</button>
    </div>
      {openAddPopup && <AddPopup
        open={openAddPopup}
        onClose={handleCloseAddPopup}
        onSave={handleSaveAdd} />}
      {openDeleteDialog && <DeleteDialog
        onClose={handleCloseDeleteDialog}
        patient={selectedPatient}
        onDelete={handleDelete}
      />}
      {openSearchDialog && <SearchDialog
        open={openSearchDialog}
        onSearch={handleSearching}
        onClose={handleCloseSearchDialog}
      />}
    </div>
  );
}

export default Main