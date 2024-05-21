'use client'

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import styles from './page.module.css';

const defaultTheme = createTheme();

export default function DoctorProfile({ doctorData }) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);
  const [id, setId] = useState(null);
  const [profilePicture, setProfilePicture] = useState('/Admin.jpg');
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const token = Cookies.get('token');
    const id = Cookies.get('id');
    setToken(token);
    setId(id);

    const fetchData = async () => {
      try {
        const result = await axios.get(`http://localhost:8000/home/admin/${id}`, { headers: { token: token } });
        const newRowData = {
          id: result.data._id,
          name: result.data.Aname,
          email: result.data.Aemail,
          sex: result.data.Asex,
          phone: result.data.Aphone,
          salary: result.data.ASalary,
          address: result.data.Aaddress,
          age: result.data.Aage
        }
        setData(newRowData);  // Assuming you're fetching a single doctor for the profile
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch data');
        setLoading(false);
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleImageClick = () => {
    document.getElementById('fileInput').click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setProfilePicture(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <nav className={styles.sideNav}>
        <ul>
          <li>
            <a href='/adminProfile' className={styles.active}>Profile</a>
          </li>
          <li>
            <a href='/addEditPatient'>Patients</a>
          </li>
          <li>
            <a href='/addEditDoctor' >Doctors</a>
          </li>
          <li>
            <a href='/addEditNurse'>Nurses</a>
          </li>
          <li>
            <a href='/addEditDevice'>Devices</a>
          </li>
          <li>
              <a href='/adminBillings'>Patients' Payments</a>
          </li>
          
        </ul>
      </nav>
      <div>
      <div className={styles.imageDev}>
          <img src='/admin.jpg'></img>
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
                          label="Admin ID"
                          value={data.id || ''}
                          InputProps={{
                            readOnly: true,
                          }}
                          variant="standard"
                        />
                      </Grid>
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
                        label="Sex"
                        value={data.sex || ''}
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
