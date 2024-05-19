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

  useEffect(() => {
    const token = Cookies.get('token');
    const id = Cookies.get('id');
    setToken(token);
    setId(id);

    const fetchPatientIds = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/home/admin/${id}/patients`, { headers: { token: token } });
        const rowData = response.data.map(patient => ({ id:patient._id}))
        setRows(rowData);
      } catch (error) {
        console.error('Error fetching patient IDs:', error);
      }
    };

    fetchPatientIds();
  }, []);

  useEffect(() => {
    if (selectedPatientId) {
      const fetchAppointmentDetails = async () => {
        try {
          const response = await axios.get(`http://localhost:8000/home/admin/${id}/appointments/${selectedPatientId}`, { headers: { token: token } });
          setAppointmentDetails(response.data);
        } catch (error) {
          console.error('Error fetching appointment details:', error);
        }
      };

      const fetchServiceDetails = async () => {
        try {
          const response = await axios.get(`http://localhost:8000/home/admin/${id}/services/${selectedPatientId}`, { headers: { token: token } });
          setServiceDetails(response.data);
        } catch (error) {
          console.error('Error fetching service details:', error);
        }
      };

      fetchAppointmentDetails();
      fetchServiceDetails();
    }
  }, [selectedPatientId, id, token]);

  const handlePaymentMethod = (event) => {
    setPaymentMethod(event.target.value);
  };


  const handlePatientIdChange = (event, value) => {
    setSelectedPatientId(value);
  };
  const handlePayment = async () => {
    try {
      const response = await axios.post(`http://localhost:8000/home/admin/${id}/payments`, {
        patientId: selectedPatientId,
        appointmentDetails: appointmentDetails,
        serviceDetails: serviceDetails,
        paymentMethod: paymentMethod,
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
            <a>Profile</a>
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
            <a href='/adminBillings' className={styles.active}>Payments</a>
          </li>
        </ul>
      </nav>
      <div className={styles.wholeContainer}>
        <div className={styles.comboBox}>
          <Autocomplete
            onChange={handlePatientIdChange}
            disablePortal
            id="combo-box-demo"
            options={rows.map(row => row.id)}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Enter Patient ID" />}
          />
        </div>
        <div className={styles.appointmentAndService}>
          <div className={styles.appointmentContainer}>
            <h3>Appointments</h3>
            <div className={styles.appointmentDetails}>
              <p className={styles.labels}>Doctor Name:<span> {appointmentDetails.doctorName || 'N/A'}</span></p>
              <p className={styles.labels}>Day:<span> {appointmentDetails.day || 'N/A'}</span></p>
              <p className={styles.labels}>Start Time:<span> {appointmentDetails.startTime || 'N/A'}</span></p>
              <p className={styles.labels}>End Time:<span> {appointmentDetails.endTime || 'N/A'}</span></p>
            </div>
            <div className={styles.appointmentFeesContainer}>
              <p className={styles.appointmentFees}>Price: <span> {appointmentDetails.price || '0'} EGP</span></p>
            </div>
          </div>
          <div className={styles.appointmentContainer}>
            <h3>Services</h3>
            <div className={styles.appointmentDetails}>
              <p className={styles.serviceLabel}>Service:<span> {serviceDetails.serviceName || 'N/A'}</span></p>
            </div>
            <div className={styles.serviceFeesContainer}>
              <p className={styles.appointmentFees}>Price: <span> {serviceDetails.price || '0'} EGP</span></p>
            </div>
          </div>
        </div>
        <div className={styles.totalPrice}>
          <p className={styles.labels}>Total:<span> {appointmentDetails.price + serviceDetails.price || '0'} EGP</span></p>
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
              <FormControlLabel value="cash" control={<Radio />} label="Cash" />
              <FormControlLabel value="credit" control={<Radio />} label="Credit" />
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
