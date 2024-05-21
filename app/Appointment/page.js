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
import Cookies from 'js-cookie';

const defaultTheme = createTheme();



export default function DoctorProfile({doctorData}){
const [appointments, setAppointment] = useState([{}]);
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
          const result = await axios.get(`http://localhost:8000/home/patient/${id}/appointment`, { headers: { token: token }});
          console.log(result.data);
          const appointment_data = result.data.map(appointment => ({
            doc_name: appointment.Dname,
            fees: appointment.appointment_instance.fees,
            day: appointment.appointment_instance.Time.Day,
            start: appointment.appointment_instance.Time.start,
            end: appointment.appointment_instance.Time.end,
            doc_id: appointment.appointment_instance.doc_id
          }));
          setAppointment(appointment_data);
          setLoading(false);
        } catch (error) {
          setError(error);
          setLoading(false);
          console.log(error);
        }
      };
  
      fetchData();
    }, []);
const handleCancelAppointment = async (docId) => {
    try {
        // console.log(rows[rowIndex])
        const response = await axios.delete(`http://localhost:8000/home/patient/${id}/appointment`, {
            headers: {
              token: token
            },
            data: {
              doc_id: docId
            }
          });
      console.log('Delete successful:', response.data);

      
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

    return(
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
            <a href="/Prescription">Prescription</a>
          </li>
          <li>
            <a href="/Appointment"  className={styles.active}>Appointment</a>
          </li>
          <li>
            <a href="/patientBillings" >Payments</a>
          </li>
        </ul>
      </nav>
        
        {appointments.length > 0 ? (
            <div className={styles.cardContainer}>
                {appointments.map((appointment) => (
                    <div className={styles.card} key={appointment.doc_id}>
                        <div className={styles.cardDetails}>
                            <div className={styles.timeDetails}>
                                <p className={styles.textTitle}>Start Time: <span className={styles.patientName}>{appointment.start}</span></p>
                                <p className={styles.textTitle}>End Time: <span className={styles.patientName}>{appointment.end}</span></p>
                            </div>
                            <div className={styles.patientInfo}>
                                <p className={styles.textBody}>Doctor Name: <span>{appointment.doc_name}</span></p>
                                <p className={styles.textBody}>Day: <span>{appointment.day}</span></p>
                                <p className={styles.textBody}>Fees: <span>{appointment.fees}</span></p>
                            </div>
                        </div>
                        <a className={styles.cardButton} onClick={() => handleCancelAppointment(appointment.doc_id)}>Cancel Appointment</a>
                    </div>
                ))}
            </div>
        ) : (
            <p className={styles.emptyAppointments}>No Appointments</p>
        )}
    </div> 

    );
}