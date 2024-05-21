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
import Link from 'next/link';

const defaultTheme = createTheme();



export default function DoctorProfile({doctorData}){
const [appointments, setAppointment] = useState([{}]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
  const fetchData = async () => {
    try {
      const result = await axios.get('https://jsonplaceholder.typicode.com/users');
         
      const doc_data = result.data;
      setAppointment(doc_data.slice(0, 2));
      console.log(data);
      setLoading(false);
    } catch (error) {
      setError('Failed to fetch data');
      setLoading(false);
      console.log(error)
    }
  };

  fetchData();
}, []);
const handleCancelAppointment = async (appointmentId) => {
    try {
      await axios.post('https://your-api-endpoint/cancel', { id: appointmentId });
      setAppointment(appointments.filter(appointment => appointment.patientID !== appointmentId));
    } catch (error) {
      console.log('Failed to cancel appointment', error);
    }
  };

    return(
        <div>
        <nav className={styles.sideNav}>
            <ul>
                <li>
                    <Link href='/patientProfile'>Profile</Link>
                </li>
                <li>
                    <Link href="/Prescription">Prescription</Link>
                </li>
                <li>
                    <Link href="/Appointment" className={styles.active}>Appointment</Link>
                </li>
            </ul>
        </nav>
        
        {appointments.length > 0 ? (
            <div className={styles.cardContainer}>
                {appointments.map((appointment) => (
                    <div className={styles.card} key={appointment.patientID}>
                        <div className={styles.cardDetails}>
                            <div className={styles.timeDetails}>
                                <p className={styles.textTitle}>Start Time: <span className={styles.patientName}>{appointment.startTime}</span></p>
                                <p className={styles.textTitle}>End Time: <span className={styles.patientName}>{appointment.endTime}</span></p>
                            </div>
                            <div className={styles.patientInfo}>
                                <p className={styles.textBody}>Doctor Name: <span>{appointment.patientName}</span></p>
                                <p className={styles.textBody}>ID: <span>{appointment.patientID}</span></p>
                                <p className={styles.textBody}>Day: <span>{appointment.patientID}</span></p>
                            </div>
                        </div>
                        <a className={styles.cardButton} onClick={() => handleCancelAppointment(appointment.patientID)}>Cancel Appointment</a>
                    </div>
                ))}
            </div>
        ) : (
            <p className={styles.emptyAppointments}>No Appointments</p>
        )}
    </div> 

    );
}