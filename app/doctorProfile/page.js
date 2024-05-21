'use client'

// import * as React from 'react';

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import styles from './page.module.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const defaultTheme = createTheme();

export default function DoctorProfile({doctorData}){
const [data, setData] = useState({});
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const [token, setToken] = useState(null);
const [id, setId] = useState(null);

useEffect(() => {
  const token = Cookies.get('token');
  const id = Cookies.get('id');
  setToken(token);
  setId(id);

  const fetchData = async () => {
    try {
      const result = await axios.get(`http://localhost:8000/home/doctor/${id}`, {headers:{token:token}});
      const doctor = result.data;
        const newData = {
          name: doctor.Dname,
          email: doctor.Demail,
          specialization: doctor.Specialization,
          phone: doctor.Dphone,
          salary: doctor.DSalary,
          address: doctor.Daddress,
        };
        setData(newData);
      
      setLoading(false);
    } catch (error) {
      setError('Failed to fetch data');
      setLoading(false);
      console.log(error)
    }
  };

  fetchData();
}, []);

    return(
    <div>
      <nav className={styles.sideNav}>
        <ul>
          <li>
            <a href='/doctorProfile' className={styles.active}>Profile</a>
          </li>
          <li>
            <a href="/showMedicalRecords">Medical Records</a>
          </li>
          <li>
            <a href='/addPrescription'>Add Prescription</a>
          </li>
          <li>
            <a href="/showAppointment">Appointments</a>
          </li>
          
        </ul>
      </nav>
      <div>
        <div className={styles.imageDev}>
          <img src='/doctor.jpg'></img>
        </div>
        <div className={styles.doctorDataContainer}>
        <ThemeProvider theme={defaultTheme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 5,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              
              <Box component="form" noValidate sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                    <TextField
                      id="standard-read-only-input"
                      label="Name"
                      
                      value={data.name || ''}
                      InputProps={{
                        readOnly: true,
                      }}
                      variant="standard"
                    />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                    <TextField
                      id="standard-read-only-input"
                      label="Email"
                      value={data.email || ''}
                      
                      InputProps={{
                        readOnly: true,
                      }}
                      variant="standard"
                    />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                    <TextField
                      id="standard-read-only-input"
                      label="Specialization"
                      
                      InputProps={{
                        readOnly: true,
                      }}
                      variant="standard"
                      value={data.specialization || ''}
                    />
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                    <TextField
                      id="standard-read-only-input"
                      label="Mobile Number"
                      value={data.phone || ''}
                      
                      InputProps={{
                        readOnly: true,
                      }}
                      variant="standard"
                    />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                    <TextField
                      id="standard-read-only-input"
                      label="Salary"
                      value={data.salary || ''}
                      
                      InputProps={{
                        readOnly: true,
                      }}
                      variant="standard"
                    />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                    <TextField
                      id="standard-read-only-input"
                      label="Address"
                      
                      value={data.address || ''}
                      InputProps={{
                        readOnly: true,
                      }}
                      variant="standard"
                    />
                    </Grid>

                </Grid>
                
                <Grid container justifyContent="flex-end">
                  
                </Grid>
              </Box>
            </Box>
            
          </Container>
    </ThemeProvider>

        </div>
      </div>
    </div>
    );
}