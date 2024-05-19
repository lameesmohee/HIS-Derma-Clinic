'use client'

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
import Link from 'next/link';
import PaidIcon from '@mui/icons-material/Paid';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';

import Autocomplete from '@mui/material/Autocomplete';


export default function AvailableDoctors(){
    const [doctors, setDoctors] = useState([
        {
            "_id": {
              "$oid": "649098ac2e11c27b416535a7"
            },
            "Dname": "Dr.Sofia",
            "Demail": "sofia@example.com",
            "Dpassword": "$2b$05$sDI7F6fr/TZfo9QZjDOnP.JU3.7Dc0FR9diQZXlku0H8/BBp3RzMe",
            "DSalary": 6000,
            "Dphone": "0123456780",
            "Dsex": "Female",
            "Daddress": "Alexandria, Egypt",
            "Dage": 30,
            "dep_id": "DEP001",
            "Specialization": "Ph.D. in Experimental Dermatology"
          },
          {
            "_id": {
              "$oid": "649098ac2e11c27b416535a8"
            },
            "Dname": "Dr.Jared Daniel",
            "Demail": "jared@example.com",
            "Dpassword": "$2b$05$LnrLwk.nD2KkuL8rUp9ac.hHRpHDC/cLbgFCzHdn.ujowXdAEFfIq",
            "DSalary": 7000,
            "Dphone": "0123456781",
            "Dsex": "Male",
            "Daddress": "Giza, Egypt",
            "Dage": 45,
            "dep_id": "DEP001",
            "Specialization": "Ph.D. in Dermatological Sciences "
          },
          {
            "_id": {
              "$oid": "649098ac2e11c27b416535a9"
            },
            "Dname": "Dr.Emma steeve",
            "Demail": "emma,@example.com",
            "Dpassword": "$2b$05$xRSllwMyoLznX767dAmaqeRK9hcumNH0uFmcJ2q/RClzEhy6Vy75e",
            "DSalary": 7000,
            "Dphone": "0123456782",
            "Dsex": "Female",
            "Daddress": "Aswan, Egypt",
            "Dage": 38,
            "dep_id": "DEP002",
            "Specialization": "Ph.D. in Dermatoepidemiology"
          },
          {
            "_id": {
              "$oid": "649098ac2e11c27b416535aa"
            },
            "Dname": "Dr.Lisa Martin",
            "Demail": "lisa@example.com",
            "Dpassword": "$2b$05$sNP7YtLrDZpIyHkAgXhOAu0k1zHu3bPwXkgoVoXcaoPcgxS1bMxm2",
            "DSalary": 5500,
            "Dphone": "0123456783",
            "Dsex": "female",
            "Daddress": "Luxor, Egypt",
            "Dage": 42,
            "dep_id": "DEP001",
            "Specialization": "Ph.D. in Experimental Dermatology"
          },
          {
            "_id": {
              "$oid": "649098ac2e11c27b416535ab"
            },
            "Dname": "Dr.Alexandra Reynolds",
            "Demail": "alexandra@gmail.com",
            "Dpassword": "$2b$10$bGHgjKa6mj7wrShAPbPloeJZdVyXC1tRFlXSHWjBk6m78T8QsUQWu",
            "DSalary": 5500,
            "Dphone": "01234567484",
            "Dsex": "Female",
            "Daddress": "Hurghada, Egypt",
            "Dage": 37,
            "dep_id": {
              "$oid": "648c7cb45ebc10c6f071242b"
            },
            "Specialization": "Ph.D. in Skin Pharmacology"
          }
      ]);
      const [appointments, setAppointment] = useState([
        {
            "_id": {
              "$oid": "6491893f61e14fbfc98a71d6"
            },
            "NumofReservations": 2,
            "doc_id": {
              "$oid": "649098ac2e11c27b416535a7"
            },
            "slots": [
              {
                "Day": "Sunday",
                "start": "09:00",
                "end": "10:00"
              },
              {
                "Day": "Sunday",
                "end": "12:00",
                "start": "11:00"
              }
            ]
          },
          {
            "_id": {
              "$oid": "6491893f61e14fbfc98a71d7"
            },
            "NumofReservations": 0,
            "doc_id": {
              "$oid": "649098ac2e11c27b416535a8"
            },
            "slots": [
              {
                "Day": "Thursday",
                "start": "09:00",
                "end": "10:00"
                
              },
              {
                "Day": "Thursday",
                "start": "1:00",
                "end": "1:30"
                
              },
              {
                "Day": "Wednesday",
                "start": "4:00",
                "end": "4:30"
                
              },
              {
                "Day": "Wednesday",
                "end": "10:30",
                "start": "10:00"
              }]}
      ]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
      const fetchData = async () => {
        try {
        //   const result = await axios.get('https://jsonplaceholder.typicode.com/users');  
        //   const doc_data = result.data;
        //   setAppointment(doc_data);
        //   console.log(data);
        //   setLoading(false);
        } catch (error) {
          setError('Failed to fetch data');
          setLoading(false);
          console.log(error)
        }
      };
    
      fetchData();
    }, []);
    
        return(
            <div className={styles.body}>
                <nav className={styles.sideNav}>
                    <ul>
                        <li>
                            <Link href="/doctorProfile">Profile</Link>
                        </li>
                        <li>
                            <Link href="/bookAppointment">Appointments</Link>
                        </li>
                        <li>
                            <Link href="/addPrescription">Add Prescription</Link>
                        </li>
                    </ul>
                </nav>
                <div className={styles.comboBox}>
                    <Autocomplete 
                        disablePortal
                        id="combo-box-demo"
                        options={doctors.map(doctor => doctor.Specialization)}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Choose Specilaization" />}
                    />
                    <Autocomplete 
                        disablePortal
                        id="combo-box-demo"
                        options={Array.from(new Set(appointments.flatMap(appointment => appointment.slots.map(slot => slot.Day))))}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Choose Day" />}
                    />
                </div>
                <div className={styles.parent}>
                    <div className={styles.doctorContainer}>
                        <div className={styles.doctorImage}>
                            <img src='alex.jpg'></img>
                        </div> {/*doctorimageEnd*/}
                        <div className={styles.doctorDetails}>
                            <h3>Dr. Alexandra Reynolds</h3>
                            <p>Ph.D. in Skin Pharmacology</p>
                            <p><PaidIcon className={styles.feeIcon} /> Fees: <span>350 EGP</span></p>
                            <p> <HourglassBottomIcon className={styles.feeIcon}/> Waiting Time: 30 minutes</p>
                        </div>{/*doctorDetailsEnd*/}
                        <div className={styles.doctorAppointments}>
                            <div className={styles.appointmentContainer}>
                                <div className={styles.day}>
                                    <p >Today</p>
                                </div>
                                <div className={styles.time}>
                                    <p>From: <span>9.00 pm</span></p>
                                    <p>To: <span>9.30 pm</span></p>
                                </div>
                                <div className={styles.bookBtn}>
                                    <a >Book</a>
                                </div>
                            </div>

                            <div className={styles.appointmentContainer}>
                                <div className={styles.day}>
                                    <p >Today</p>
                                </div>
                                <div className={styles.time}>
                                    <p>From: <span>9.00 pm</span></p>
                                    <p>To: <span>9.30 pm</span></p>
                                </div>
                                <div className={styles.bookBtn}>
                                    <a >Book</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    
        );
    }