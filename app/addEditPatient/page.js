'use client';
import styles from './page.module.css';
import React, { useState, useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import IconButton from '@mui/material/IconButton';
import Cookies from 'js-cookie';

const AddEditPatient = () => {
  const [rows, setRows] = useState([]);
  const [token, setToken] = useState(null);
  const [id, setId] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = Cookies.get('token');
    const id = Cookies.get('id');
    setToken(token);
    setId(id);
    const fetchData = async () => {
      try {
        const result = await axios.get(`http://localhost:8000/home/admin/${id}/patients`, {
          headers: { token: token },
        });
        const newRowData = result.data.map(patient => ({
          id: patient._id,
          Fname: patient.firstName,
          Lname: patient.lastName,
          sex: patient.gender,
          dateofbirth: patient.dateOfBirth.split('T')[0],
          email: patient.email,
          phone: patient.phone,
          street: patient.address.street,
          city: patient.address.city,
          state: patient.address.state,
          isEditMode: false, // Add this property to track edit mode
        }));

        setRows(newRowData);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, []);

  const handleEdit = rowIndex => {
    const updatedRows = rows.map((row, index) => {
      if (index === rowIndex) {
        return { ...row, isEditMode: true };
      }
      return row;
    });
    setRows(updatedRows);
  };

  const handleSave = async rowIndex => {
    const row = rows[rowIndex];
    console.log(row)
    try {
      const response = await axios.put(
        `http://localhost:8000/home/admin/${id}/patients`,
        {
          id: row.id,
          firstName: row.Fname,
          lastName: row.Lname,
          dateofbirth: row.dateofbirth,
          gender: row.sex,
          email: row.email,
          phone: row.phone,
          address:{
            street: row.street,
            city: row.city,
            state:row.state
          }
        },
        {
          headers: {
            token: token,
          },
        }
      );

      const updatedRows = rows.map((row, index) => {
        if (index === rowIndex) {
          return { ...row, isEditMode: false };
        }
        return row;
      });

      setRows(updatedRows);
      console.log('Update successful:', response.data);
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  const handleChange = (e, rowIndex, field) => {
    const { value } = e.target;
    const updatedRows = rows.map((row, index) => {
      if (index === rowIndex) {
        return { ...row, [field]: value };
      }
      return row;
    });
    setRows(updatedRows);
  };

  const handleDeleteRow = async rowIndex => {
    const rowId = rows[rowIndex].id;
    try {
      const response = await axios.delete(`http://localhost:8000/home/admin/${id}/patients`, {
        headers: { token: token },
        data: { id: rowId },
      });
      setRows(rows.filter((_, index) => index !== rowIndex));
      console.log('Delete successful:', response.data);
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
              <th>First Name</th>
              <th>Last Name</th>
              <th>Gender</th>
              <th>Date Of Birth</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Street</th>
              <th>City</th>
              <th>State</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                <td>{row.id}</td> {/* Render the ID column */}
                {Object.keys(row).map(key => {
                  if (key === 'id' || key === 'isEditMode') return null;
                  return (
                    <td key={key}>
                      {row.isEditMode ? (
                        <input
                          type='text'
                          value={row[key]}
                          onChange={e => handleChange(e, rowIndex, key)}
                        />
                      ) : (
                        row[key]
                      )}
                    </td>
                  );
                })}
                <td>
                  {row.isEditMode ? (
                    <IconButton onClick={() => handleSave(rowIndex)}>
                      <DoneIcon style={{ color: 'green' }} />
                    </IconButton>
                  ) : (
                    <IconButton onClick={() => handleEdit(rowIndex)}>
                      <EditIcon style={{ color: 'blue' }} />
                    </IconButton>
                  )}
                  <IconButton onClick={() => handleDeleteRow(rowIndex)}>
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
