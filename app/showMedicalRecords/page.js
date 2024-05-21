'use client'
import styles from './page.module.css';
import React, { useState, useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import Cookies from 'js-cookie';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import IconButton from '@mui/material/IconButton';

const MedicalRecord = () => {
  const [token, setToken] = useState(null);
  const [id, setId] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('Cash');
  const [patientDetails, setPatientDetails] = useState({});
  const [patId, setPatId] = useState('');
  
  useEffect(() => {
    const token = Cookies.get('token');
    const id = Cookies.get('id');
    setToken(token);
    setId(id);
  }, []);

  const fetchBillings = async () => {
    console.log(patId)
    try {
      const records = await axios.post(`http://localhost:8000/home/doctor/${id}/medicalrecord`, {
        pat_id: patId,
      }, { headers: { token: token } });
      console.log(records.data)

      const patientRecord  = {
        Pname: records.data.patient_instance.Pname,
        Page: records.data.patient_instance.Page,
        Pphone: records.data.patient_instance.Pphone,
        Psex: records.data.patient_instance.Psex,
        date: records.data.date,
        notes: records.data._doc.notes,
        prescriptions: records.data._doc.prescriptions,
        diagnosis: records.data._doc.diagnosis
      };

      console.log('Fetched patient details:', patientRecord);
      setPatientDetails(patientRecord);
    } catch (error) {
      console.error('Error fetching patient details:', error);
      // Handle any errors, such as displaying an error message to the user
    }
  };

  const handlePaymentMethod = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handlePatientIdChange = (event) => {
    setPatId(event.target.value);
  };
  
  return (
    <div className={styles.body}>
      <nav className={styles.sideNav}>
        <ul>
          <li>
            <a href='/doctorProfile'>Profile</a>
          </li>
          <li>
            <a href="/showMedicalRecords"className={styles.active}>Medical Records</a>
          </li>
          <li>
            <a href='/addPrescription'>Add Prescription</a>
          </li>
          <li>
            <a href="/showAppointment">Appointments</a>
          </li>
          
        </ul>
      </nav>
      <div className={styles.wholeContainer}>
        <div className={styles.comboBox}>
          <Grid item xs={12}>
            <TextField
              name="pat_id"
              required
              fullWidth
              id="pat_id"
              label="Patient ID"
              autoFocus
              onChange={handlePatientIdChange}
              style={{ width: '300px'}}
            />
          </Grid>
          <IconButton onClick={fetchBillings} className={styles.trash}>
            <PersonSearchIcon style={{ color: 'blue' }}/>
          </IconButton>
        </div>
        <div className={styles.patientDataContainer}>
          <div className={styles.name}>
            <p>Name: <span>{patientDetails.Pname}</span></p>
          </div>
          <div className={styles.patientData}>
            <p>Age: <span>{patientDetails.Page || ''}</span></p>
            <p>Sex: <span>{patientDetails.Psex || ''}</span></p>
            <p>Phone: <span>{patientDetails.Pphone || ''}</span></p>
          </div>
          <div className={styles.appointmentAndService}>
            <div className={styles.appointmentContainer}>
              <h3>Diagnoses</h3>
              <div className={styles.appointmentDetails}>
                <p>Date: <span>{patientDetails.date}</span></p>
                {patientDetails.diagnosis && patientDetails.diagnosis.length > 0 ? (
                  patientDetails.diagnosis.map((diag, index) => (
                    <p key={index} className={styles.labels}>
                      <span>{diag}</span>
                    </p>
                  ))
                ) : (
                  <p className={styles.labels}>No diagnoses available</p>
                )}
              </div>
            </div>
            <div className={styles.appointmentContainer}>
              <h3>Prescriptions</h3>
              <div className={styles.appointmentDetails}>
                {patientDetails.prescriptions && patientDetails.prescriptions.length > 0 ? (
                  patientDetails.prescriptions.map((prescription, index) => (
                    <div key={index}>
                      <p className={styles.labels}>Medication: <span>{prescription.medication}</span></p>
                      <p className={styles.labels}>Dosage: <span>{prescription.dosage}</span></p>
                      
                    </div>
                  ))
                ) : (
                  <p className={styles.labels}>No prescriptions available</p>
                )}
              </div>
            </div>
            <div className={styles.appointmentContainer}>
              <h3>Notes</h3>
              <div className={styles.appointmentDetails}>
                <p className={styles.labels}><span>{patientDetails.notes || 'N/A'}</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalRecord;
