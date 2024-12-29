"use client";
import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AssignmentIcon from '@mui/icons-material/Assignment';
import axios from 'axios';
import Cookies from 'js-cookie';
import styles from './page.module.css';

const defaultTheme = createTheme();

export default function AddPrescription() {
  const [token, setToken] = useState(null);
  const [id, setId] = useState(null);

  // State for additional fields
  const [frequency, setFrequency] = useState('');
  const [quantity, setQuantity] = useState('');
  const [route, setRoute] = useState('');
  const [duration, setDuration] = useState('');
  const [pharmacyName, setPharmacyName] = useState(''); // State for pharmacy name

  useEffect(() => {
    const token = Cookies.get('token');
    const id = Cookies.get('id');
    setToken(token);
    setId(id);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    try {
      const response = await axios.post(
        `http://localhost:8000/home/doctor/${id}/prescription`,
        {
          Nameofmedicine: data.get('medicineName'),
          Dosage: data.get('dosage'),
          contraindictions: data.get('contraindications'),
          Disease: data.get('disease'),
          Frequency: frequency,
          Quantity: quantity,
          Route: route,
          Duration: duration,
          PharmacyName: pharmacyName, // Include pharmacy name in the data sent
          doc_id: id,
          pat_id: data.get('pat_id'),
        },
        {
          headers: {
            token: token,
          },
        }
      );
      console.log('Response: ', response);
    } catch (error) {
      console.error('Add failed:', error);
    }
  };

  return (
    <div>
      <nav className={styles.sideNav}>
        <ul>
          <li>
            <a href="/doctorProfile">Profile</a>
          </li>
          <li>
            <a href="/showMedicalRecords">Medical Records</a>
          </li>
          <li>
            <a href="/addPrescription" className={styles.active}>
              Add Prescription
            </a>
          </li>
          <li>
            <a href="/showAppointment">Appointments</a>
          </li>
        </ul>
      </nav>

      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="lg">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ bgcolor: 'green', marginBottom: 2 }}>
              <AssignmentIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Patient Prescription
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="id"
                    label="Patient ID"
                    name="pat_id"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="disease"
                    label="Disease Description"
                    name="disease"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    name="medicineName"
                    label="Medicine Name"
                    id="medicineName"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="dosage"
                    label="Dosage"
                    name="dosage"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    name="contraindications"
                    label="Contraindications"
                    id="contraindications"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth required>
                    <InputLabel id="frequency-label">Frequency</InputLabel>
                    <Select
                      labelId="frequency-label"
                      id="frequency"
                      value={frequency}
                      onChange={(e) => setFrequency(e.target.value)}
                    >
                      <MenuItem value="Once daily">Once daily</MenuItem>
                      <MenuItem value="Twice daily">Twice daily</MenuItem>
                      <MenuItem value="Three times daily">Three times daily</MenuItem>
                      <MenuItem value="Four times daily">Four times daily</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    name="quantity"
                    label="Quantity"
                    id="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth required>
                    <InputLabel id="route-label">Route</InputLabel>
                    <Select
                      labelId="route-label"
                      id="route"
                      value={route}
                      onChange={(e) => setRoute(e.target.value)}
                    >
                      <MenuItem value="Oral">Oral</MenuItem>
                      <MenuItem value="Intravenous">Intravenous</MenuItem>
                      <MenuItem value="Topical">Topical</MenuItem>
                      <MenuItem value="Intramuscular">Intramuscular</MenuItem>
                      <MenuItem value="Subcutaneous">Subcutaneous</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    name="duration"
                    label="Duration"
                    id="duration"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    name="pharmacyName" // New input field for pharmacy name
                    label="Pharmacy Name"
                    id="pharmacyName"
                    value={pharmacyName}
                    onChange={(e) => setPharmacyName(e.target.value)}
                  />
                </Grid>
              </Grid>
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Submit
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}
