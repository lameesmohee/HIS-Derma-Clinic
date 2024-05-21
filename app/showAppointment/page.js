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
import Cookies from 'js-cookie';

const defaultTheme = createTheme();


export default function DoctorAppointment({doctorData}){

const [appointments, setAppointment] = useState([{}]);
const [token, setToken] = useState(null);
const [id, setId] = useState(null);



useEffect(() => {
    const token = Cookies.get('token');
    const id = Cookies.get('id');
    setToken(token);
    setId(id);
  const fetchData = async () => {
    try {
      const result = await axios.get(`http://localhost:8000/home/doctor/${id}/appointment`, {headers:{token:token}});
       console.log(result.data)  
      const appointment_data = result.data.map(doctor => ({
        patientName: doctor.patient_instance.Pname,
        patientID: doctor.patient_instance._id,
        startTime: doctor.Time.start,
        endTime: doctor.Time.end,
        patientAge:doctor.patient_instance.Page,
        Day: doctor.Time.Day,
        patientNumber:doctor.patient_instance.Pphone
      }));
      setAppointment(appointment_data);
      console.log(appointment_data)
      
    } catch (error) {
      
      console.log(error)
    }
  };

  fetchData();
}, []);
const handleCancelAppointment = async (patientID) => {
    try {
      await axios.delete(`http://localhost:8000/home/doctor/${id}/appointment`, {
        headers: {
          token: token
        },
        data: {
          pat_id: patientID,
        }
      });
      setAppointment(appointments.filter(appointment => appointment.patientID !== patientID));
    } catch (error) {
      console.log('Failed to cancel appointment', error);
    }
  };

    return(
        <div>
        <nav className={styles.sideNav}>
        <ul>
          <li>
            <a href='/doctorProfile'>Profile</a>
          </li>
          <li>
            <a href="/showMedicalRecords">Medical Records</a>
          </li>
          <li>
            <a href='/addPrescription' >Add Prescription</a>
          </li>
          <li>
            <a href="/showAppointment" className={styles.active}>Appointments</a>
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
                                <p className={styles.textTitle}>Day: <span>{appointment.Day}</span></p>
                                <p className={styles.textBody}>Patient Name: <span>{appointment.patientName}</span></p>
                                <p className={styles.textBody}>ID: <span>{appointment.patientID}</span></p>
                                <p className={styles.textBody}>Age: <span>{appointment.patientAge}</span></p>
                                <p className={styles.textBody}>Number: <span>{appointment.patientNumber}</span></p>
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