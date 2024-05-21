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
      console.log(newRow);
      const response = await axios.post(`http://localhost:8000/home/admin/${id}/doctors`, {
        medicineName: data.get('medicineName'),
        dosage: data.get('dosage'),
        sideEffects: data.get('sideEffects'),
        contraindications: data.get('contraindications'),
        disease: data.get('disease'),
        email: data.get('email')
      }, {
        headers: {
          token: token
        }
      });

    } catch (error) {
      console.error('Add failed:', error);
    }
  };

  return (
    <div>
      <nav className={styles.sideNav}>
        <ul>
          <li>
            <a href='/patientProfile'>Profile</a>
          </li>
          <li>
            <a className={styles.active}>Prescription</a>
          </li>
          <li>
            <a href="/Appointment">Appointment</a>
          </li>
        </ul>
      </nav>

      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
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
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="disease"
                    label="Disease Description"
                    name="disease"
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="medicineName"
                    label="Medicine Name"
                    name="medicineName"
                    autoFocus
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="dosage"
                    label="Dosage"
                    name="dosage"
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="sideEffects"
                    label="Side Effects"
                    name="sideEffects"
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="contradictions"
                    label="Contradictions"
                    name="contradictions"
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Submit
              </Button>
              <Grid container justifyContent="flex-end">
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}
