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

const AdminBillings = () => {
  const [token, setToken] = useState(null);
  const [id, setId] = useState(null);
  const [rows, setRows] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('Cash');
  const [selectedPatientId, setSelectedPatientId] = useState('');
  const [appointmentDetails, setAppointmentDetails] = useState({});
  const [serviceDetails, setServiceDetails] = useState({});
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

  useEffect(() => {
    const token = Cookies.get('token');
    const id = Cookies.get('id');
    setToken(token);
    setId(id);
    const fetchBillings = async () => {
      try {
        console.log(token)
        const billing = await axios.get(`http://localhost:8000/home/patient/${id}/billing`, { headers: { token: token } });
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
    
      fetchBillings();
  }, [ id, token]);

 
  
  return (
    <div className={styles.body}>
        <nav className={styles.sideNav}>
        <ul>
        <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/patientProfile">Profile</a>
          </li>
          <li>
            <a href="/Prescription">Prescription</a>
          </li>
          <li>
            <a href="/Appointment">Appointment</a>
          </li>
          <li>
            <a href="/patientBillings" className={styles.active}>Payments</a>
          </li>
        </ul>
      </nav>
      <div className={styles.wholeContainer}>
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
        </div>
      </div>
  );
};

export default AdminBillings;
