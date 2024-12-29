'use client'
import { useState, useEffect } from 'react';
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { green } from '@mui/material/colors';
import styles from './page.module.css';
import axios from 'axios';
import Cookies from 'js-cookie';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function AddPrescription() {
  const [token, setToken] = useState(null);
  const [id, setId] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const token = Cookies.get('token');
    const id = Cookies.get('id');
    setToken(token);
    setId(id);

    const fetchData = async () => {
      try {
        console.log('here')
        const response = await axios.get(`http://localhost:8000/home/patient/${id}/prescription`, {
          headers: {
            token: token
          }
        });
        console.log(response.data);

        const prescription = {
          medicineName: response.data.prescripition_instance.Nameofmedicine,
          dosage: response.data.prescripition_instance.Dosage,
          Dname: response.data.Dname,
          contraindications: response.data.prescripition_instance.contraindictions,
          disease: response.data.prescripition_instance.Disease,
          duration: response.data.prescripition_instance.Duration,
          frequency: response.data.prescripition_instance.Frequency,
          pharmacy: response.data.prescripition_instance.PharmacyName,
          route: response.data.prescripition_instance.Route,
          quantity: response.data.prescripition_instance.Quantity
        };
        setData(prescription);
      } catch (error) {
        console.error('Add failed:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <nav className={styles.sideNav}>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/patientProfile" >Profile</a>
          </li>
          <li>
            <a href="/Prescription" className={styles.active}>Prescription</a>
          </li>
          <li>
            <a href="/Appointment">Appointment</a>
          </li>
          <li>
            <a href="/patientBillings" >Payments</a>
          </li>
        </ul>
      </nav>
      {data ? (
        <ThemeProvider theme={defaultTheme}>
          <Container component="main" maxWidth="lg"> {/* Set the maxWidth to 'lg' */}
            <CssBaseline />
            <Box
              sx={{
                marginTop: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ bgcolor: green[500], marginBottom: 2 }}>
                <AssignmentIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Your Prescription
              </Typography>
              <Box component="form" noValidate sx={{ mt: 3 }}>
                <Grid container spacing={3}> {/* Adjust spacing between the fields */}
                  {/* Each field will take up half the width on medium screens and above, full width on small screens */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      value={data.disease}
                      id="disease"
                      label="Disease Description"
                      name="disease"
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      value={data.medicineName}
                      id="medicineName"
                      label="Medicine Name"
                      name="medicineName"
                      autoFocus
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      value={data.dosage}
                      id="dosage"
                      label="Dosage"
                      name="dosage"
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      value={data.Dname}
                      id="Dname"
                      label="Doctor's Name"
                      name="Dname"
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      value={data.contraindications}
                      id="contraindications"
                      label="Contraindications"
                      name="contraindications"
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      value={data.duration}
                      id="duration"
                      label="Duration"
                      name="duration"
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      value={data.frequency}
                      id="frequency"
                      label="Frequency"
                      name="frequency"
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      value={data.pharmacy}
                      id="pharmacy"
                      label="Pharmacy"
                      name="pharmacy"
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      value={data.route}
                      id="route"
                      label="Route"
                      name="route"
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      value={data.quantity}
                      id="quantity"
                      label="Quantity"
                      name="quantity"
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      ) : (
        <p className={styles.emptyAppointments}>No Prescriptions</p>
      )}
    </div>
  );
}
