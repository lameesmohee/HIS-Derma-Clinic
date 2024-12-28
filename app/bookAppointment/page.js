'use client'

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import styles from './page.module.css';
import React, { useState, useEffect } from 'react';

import Link from 'next/link';
import PaidIcon from '@mui/icons-material/Paid';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import Cookies from 'js-cookie';
import axios from 'axios';
import Autocomplete from '@mui/material/Autocomplete';

export default function AvailableDoctors() {
  const [token, setToken] = useState(null);
  const [id, setId] = useState(null);
  const [doctors, setDoctors] = useState([{}]);
  const [appointments, setAppointment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const specializations = [
    "Dermatology Department",
    "Cosmetic Dermatology Department",
    "Pediatric Dermatology Department",
    "Phototherapy"
  ];

  const days = [
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday"
  ];

  useEffect(() => {
    const token = Cookies.get('token');
    const id = Cookies.get('id');
    setToken(token);
    setId(id);

    const fetchData = async () => {
      try {
        const result = await axios.get(`http://localhost:8000/home/patient/${id}/available_appointments`, { headers: { token: token }})
        console.log(result.data);
        const appointment_data = result.data.map(appointment => ({
          doc_name: appointment.doctorName,
          doc_specialization: appointment.DoctorSpecialization,
          fees: appointment.Fees.fees,
          times: appointment.availableSlots,
          doc_id: appointment.docid
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
  const bookAppointment = async(doctorId,fees,times) =>{
    try {
         console.log("timeeeeeee",times)
         const{_id,Status,...other} = times
      const response = await axios.post(`http://localhost:8000/home/patient/${id}/appointment`, {
        
        doc_id: doctorId,
        Time: {...other},
        fees: fees
        
    }, {
      headers: {
        token: token
      }
    }); console.log('Response: ', response);
    
  } catch (error) {
    console.error('Add failed:', error);
  }
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading appointments.</p>;
  }

  return (
    <div className={styles.body}>
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
            <a href="/Appointment">Appointment</a>
          </li>
          <li>
            <a href="/patientBillings" >Payments</a>
          </li>
        </ul>
      </nav>
      <div className={styles.comboBox}>
        <Autocomplete 
          disablePortal
          id="combo-box-demo"
          options={specializations}
          
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Choose Specialization" />}
        />
        <Autocomplete 
          disablePortal
          id="combo-box-demo"
          options={days}
          
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Choose Day" />}
        />
        
      </div>
      <div className={styles.parent}>
        {appointments.map((appointment, index) => (
          <div className={styles.doctorContainer} key={index}>
            <div className={styles.doctorImage}>
              <img src='alex.jpg' alt={`Dr. ${appointment.doc_name}`} />
            </div>
            <div className={styles.doctorDetails}>
              <h3>{appointment.doc_name}</h3>
              <p>{appointment.doc_specialization}</p>
              <p><PaidIcon className={styles.feeIcon} /> Fees: <span>{appointment.fees} EGP</span></p>
            </div>
            <div className={styles.doctorAppointments}>
              {appointment.times.map((slot, slotIndex) => (
                <div className={styles.appointmentContainer} key={slotIndex}>
                  <div className={styles.day}>
                    <p>{slot.Day}</p>
                  </div>
                  <div className={styles.time}>
                    <p>From: <span>{slot.start}</span></p>
                    <p>To: <span>{slot.end}</span></p>
                  </div>
                  <div className={styles.bookBtn}>
                    <a onClick={()=>bookAppointment(appointment.doc_id, appointment.fees, slot)}>Book</a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
