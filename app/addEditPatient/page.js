'use client'
import styles from './page.module.css';
import React, { useState, useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Cookies from 'js-cookie';

const AddEditPatient = () => {
  const [rows, setRows] = useState([{}]);
  const [token, setToken] = useState(null);
  const [id, setId] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = Cookies.get('token');
    const id = Cookies.get('id');
    setToken(token);
    setId(id);
    console.log('token in device', token)
    const fetchData = async () => {
      try {
        console.log(id)
        const result = await axios.get(`http://localhost:8000/home/admin/${id}/patients`, { headers: { token: token } });
        const newRowData = result.data.map(patient => ({
          id: patient._id,
          name: patient.Pname,
          age: patient.Page,
          sex: patient.Psex,
          email: patient.Pemail,
          password: patient.Ppassword,
          phone: patient.Pphone,
          address: patient.Paddress,
        }));

        setRows(newRowData);
        console.log('Device', result.data)
      } catch (error) {
        setError(error);
        console.log(error)
      }
    };

    fetchData();
  }, []);

  const handleDeleteRow = async (rowIndex) => {
    const rowId = rows[rowIndex].id; // Assuming each row has a unique 'id' field
    console.log('row data', rowId)
    console.log('rowId type:', typeof rowId);

    // Delete request
    try {
      const response = await axios.delete(`http://localhost:8000/home/admin/${id}/patients`, {
        headers: {
          token: token
        },
        data: {
          id: rowId
        }
      });
      console.log('Delete successful:', response.data);

      // Remove the row from the state
      setRows(rows.filter((_, index) => index !== rowIndex));
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  return (
    <div>
      <nav className={styles.sideNav}>
        <ul>
          <li>
            <a>Profile</a>
          </li>
          <li>
            <a className={styles.active}>Patients</a>
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
              <a href='/adminBillings'>Payments</a>
          </li>
        </ul>
      </nav>
      <div>
        <table className={styles.styledTable}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Age</th>
              <th>Sex</th>
              <th>Email</th>
              <th>Password</th>
              <th>Phone</th>
              <th>Address</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {Object.keys(row).map((key) => (
                  <td key={key}>{row[key]}</td>
                ))}
                <td>
                  <IconButton onClick={() => handleDeleteRow(rowIndex)} className={styles.trash}>
                    <DeleteIcon style={{ color: 'red' }} />
                  </IconButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddEditPatient;
