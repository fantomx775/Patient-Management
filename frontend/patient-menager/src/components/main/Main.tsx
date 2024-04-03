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
import React, { useState } from 'react';

const Main = () => {
  const _patients: Patient[] = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      pesel: '12345678901',
      street: 'Main Street',
      city: 'London',
      postCode: '00-000',
      createdAt: '2024-04-01', // example string date
      updatedAt: '2024-04-01', // example string date
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Smith',
      pesel: '23456789012',
      street: 'Oak Avenue',
      city: 'New York',
      postCode: '12345',
      createdAt: '2024-04-02', // example string date
      updatedAt: '2024-04-02', // example string date
    },
    {
      id: 3,
      firstName: 'Michael',
      lastName: 'Johnson',
      pesel: '34567890123',
      street: 'Elm Street',
      city: 'Los Angeles',
      postCode: '54321',
      createdAt: '2024-04-03', // example string date
      updatedAt: '2024-04-03', // example string date
    },
    {
      id: 4,
      firstName: 'Emily',
      lastName: 'Brown',
      pesel: '45678901234',
      street: 'Cedar Road',
      city: 'Paris',
      postCode: '75001',
      createdAt: '2024-04-04', // example string date
      updatedAt: '2024-04-04', // example string date
    },
    {
      id: 5,
      firstName: 'David',
      lastName: 'Wilson',
      pesel: '56789012345',
      street: 'Pine Street',
      city: 'Tokyo',
      postCode: '100-0001',
      createdAt: '2024-04-05', // example string date
      updatedAt: '2024-04-05', // example string date
    }
  ];
  const [openEditPopup, setOpenEditPopup] = useState(false);
  const [openAddPopup, setOpenAddPopup] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [patients, setPatients] = useState<Patient[]>(_patients);


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

  const handleAdd = () => {
    setOpenAddPopup(true);
  };

  const handleSaveAdd = (newPatient: Patient) => {
    console.log('New Patient:', newPatient);
    const updatedPatients = [newPatient, ...patients];
    setPatients(updatedPatients);
  }

  const handleCloseAddPopup = () => {
    setOpenAddPopup(false);
  };

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
  

  const handleCloseEditPopup = () => {
    setOpenEditPopup(false);
  };



  return (
    <div>
      <div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>ID</StyledTableCell>
                <StyledTableCell align="right">First Name</StyledTableCell>
                <StyledTableCell align="right">Last Name</StyledTableCell>
                <StyledTableCell align="right">PESEL</StyledTableCell>
                <StyledTableCell align="right">Street</StyledTableCell>
                <StyledTableCell align="right">City</StyledTableCell>
                <StyledTableCell align="right">Post Code</StyledTableCell>
                <StyledTableCell align="right">createdAt</StyledTableCell>
                <StyledTableCell align="right">updatedAt</StyledTableCell>
                <StyledTableCell align="right">Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {patients.map((patient) => (
                <StyledTableRow key={patient.id}>
                  <StyledTableCell component="th" scope="row">
                    {patient.id}
                  </StyledTableCell>
                  <StyledTableCell align="right">{patient.firstName}</StyledTableCell>
                  <StyledTableCell align="right">{patient.lastName}</StyledTableCell>
                  <StyledTableCell align="right">{patient.pesel}</StyledTableCell>
                  <StyledTableCell align="right">{patient.street}</StyledTableCell>
                  <StyledTableCell align="right">{patient.city}</StyledTableCell>
                  <StyledTableCell align="right">{patient.postCode}</StyledTableCell>
                  <StyledTableCell align="right">{patient.createdAt}</StyledTableCell>
                  <StyledTableCell align="right">{patient.updatedAt}</StyledTableCell>
                  <StyledTableCell align="right">
                    <button onClick={() => handleEdit(patient)}>edit</button>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <button>delete</button>
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
      <div>
        <button onClick={() => handleAdd()}>Add</button>
      </div>
      {openAddPopup && <AddPopup
        open={openAddPopup}
        onClose={handleCloseAddPopup}
        onSave={handleSaveAdd}/>}
    </div>
  );
}

export default Main