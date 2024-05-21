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

const AdminBillings = () => {
  const [token, setToken] = useState(null);
  const [id, setId] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('Cash');
  const [appointmentDetails, setAppointmentDetails] = useState({});
  const [patId, setPatId] = useState('');
  let billingData  = {
    doc_name: '',
    pat_id: '',
    fees: '',
    date: '',
    day: '',
    start_time: '',
    end_time: '',
    total: '',
    service_name: '',
    service_fees: ''
}
  let billingServices


  useEffect(() => {
    const token = Cookies.get('token');
    const id = Cookies.get('id');
    setToken(token);
    setId(id);
  }, []);

  const fetchBillings = async () => {
    console.log(patId)
    try {
      const billing = await axios.post(`http://localhost:8000/home/admin/${id}/billings`, {
        pat_id: patId,
      }, { headers: { token: token } });
      // console.log(billing)
      if(billing.data.doctor_name){
        if(billing.data.services){
            billingData  = {
              doc_name: billing.data.doctor_name,
              pat_id: billing.data.pat_id,
              fees:billing.data.appointment_fees ,
              date:billing.data.Date,
              day: billing.data.Time.Day ,
              start_time: billing.data.Time.start,
              end_time: billing.data.Time.end,
              total: billing.data.total_amount,
              service_name: billing.data.services[0].Service,
              service_fees: billing.data.services[0].fees}
        }else{
         billingData  = {
        doc_name: billing.data.doctor_name,
        pat_id: billing.data.pat_id,
        fees:billing.data.appointment_fees ,
        date:billing.data.Date,
        day: billing.data.Time.Day ,
        start_time: billing.data.Time.start,
        end_time: billing.data.Time.end,
        total: billing.data.total_amount
        
      };}}else{
        // console.log(billing.data.services);
        billingData  = {
          
          pat_id: billing.data.pat_id,
          
          date:billing.data.Date,
          
          total: billing.data.total_amount,
          
          service_name: billing.data.services[0].Service,
          service_fees: billing.data.services[0].fees}

        
      }
      console.log('Payment successful:', billingData);
      setAppointmentDetails(billingData);

      
      // Add any additional logic here, such as showing a success message or redirecting the user
    } catch (error) {
      console.error('Error making payment:', error);
      // Handle any errors, such as displaying an error message to the user
    }
  };


  const handlePaymentMethod = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handlePatientIdChange = (event) => {
    setPatId(event.target.value);
  };
  
  const handlePayment = async () => {
    try {
      const response = await axios.put(`http://localhost:8000/home/admin/${id}/billings`, {
        pat_id: patId,
        payment_method: paymentMethod,
      }, { headers: { token: token } });

      console.log('Payment successful:', response.data);
      // Add any additional logic here, such as showing a success message or redirecting the user
    } catch (error) {
      console.error('Error making payment:', error);
      // Handle any errors, such as displaying an error message to the user
    }
  };

  return (
    <div className={styles.body}>
      <nav className={styles.sideNav}>
        <ul>
          <li>
            <a href='/addEditPatient'>Profile</a>
          </li>
          <li>
            <a href='/addEditPatient'>Patients</a>
          </li>
          <li>
            <a href='/addEditDoctor'>Doctors</a>
          </li>
          <li>
            <a href='/addEditNurse'>Nurses</a>
          </li>
          <li>
            <a href='/addEditDevice'>Devices</a>
          </li>
          <li>
            <a href='/adminBillings' className={styles.active}>Patients' Payments</a>
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
                />
              </Grid>
              <IconButton onClick={fetchBillings} className={styles.trash}>
            <PersonSearchIcon style={{ color: 'blue' }}/>
          </IconButton>
        </div>
        <div className={styles.appointmentAndService}>
          <div className={styles.appointmentContainer}>
            <h3>Appointments</h3>
            <div className={styles.appointmentDetails}>
              <p className={styles.labels}>Doctor Name:<span> {appointmentDetails.doc_name|| 'N/A'}</span></p>
              <p className={styles.labels}>Day:<span> {appointmentDetails.day || 'N/A'}</span></p>
              <p className={styles.labels}>Start Time:<span> {appointmentDetails.start_time || 'N/A'}</span></p>
              <p className={styles.labels}>End Time:<span> {appointmentDetails.end_time || 'N/A'}</span></p>
            </div>
            <div className={styles.appointmentFeesContainer}>
              <p className={styles.appointmentFees}>Price: <span> {appointmentDetails.fees || '0'} EGP</span></p>
            </div>
          </div>
          <div className={styles.appointmentContainer}>
            <h3>Services</h3>
            <div className={styles.appointmentDetails}>
              <p className={styles.serviceLabel}>Service:<span> {appointmentDetails.service_name || 'N/A'}</span></p>
            </div>
            <div className={styles.serviceFeesContainer}>
              <p className={styles.appointmentFees}>Price: <span> {appointmentDetails.service_fees || '0'} EGP</span></p>
            </div>
          </div>
        </div>
        <div className={styles.totalPrice}>
          <p className={styles.labels}>Total:<span> {appointmentDetails.total || '0'} EGP</span></p>
        </div>
        <div className={styles.paymentMethod}>
          <FormControl>
            <FormLabel id="demo-controlled-radio-buttons-group" className={styles.labels}>Payment Method</FormLabel>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={paymentMethod}
              onChange={handlePaymentMethod}
            >
              <FormControlLabel value="Cash" control={<Radio />} label="Cash" />
              <FormControlLabel value="Credit Card" control={<Radio />} label="Credit" />
            </RadioGroup>
            <Button
              onClick={handlePayment}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Paid
            </Button>
          </FormControl>
        </div>
      </div>
    </div>
  );
};

export default AdminBillings;
