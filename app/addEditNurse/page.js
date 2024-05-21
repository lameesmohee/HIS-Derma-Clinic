'use client'
import styles from './page.module.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Cookies from 'js-cookie';

const AddEditNurse = () => {
  const [showForm, setShowForm] = useState(false);
  const [newRow, setNewRow] = useState({
    id: '',
    doctor_id:'',
    name: '',
    age:'',
    email: '',
    salary: '',
    phone: '',
    sex: '',
    address: ''
  });

  const [rows, setRows] = useState([{}]);
  const [token, setToken] = useState(null);
  const [id, setId] = useState(null);

  useEffect(() => {
    const token = Cookies.get('token');
    const id = Cookies.get('id');
    setToken(token);
    setId(id);
    console.log('token in device',token)
    const fetchData = async () => {
      try {
        console.log(id)
        const result = await axios.get(`http://localhost:8000/home/admin/${id}/nurses`,{headers:{token:token}});
        const newRowData = result.data.map(nurse => ({
            id: nurse._id,
            doctor_id:nurse.doctor_id,
            name: nurse.Nname,
            age:nurse.Nage,
            email:nurse.Nemail,
            salary:nurse.NSalary,
            phone: nurse.Nphone,
            sex: nurse.Nsex,
            address: nurse.Naddress
          }));
          
          setRows(newRowData);
        // setRows(newRowData.map(row => ({ ...row, isEditMode: false })));
        console.log('Device', result.data)

      } catch (error) {
        console.log(error)
      }
    };
  
    fetchData();
  }, []);

  const handleEdit = (rowIndex) => {
    const updatedRows = rows.map((row, index) => {
      if (index === rowIndex) {
        return { ...row, isEditMode: true };
      }
      return row;
    });
    setRows(updatedRows);
  };

  const handleSave = async (rowIndex) => {
    const row = rows[rowIndex];
    try {
        console.log(row)
        const response = await axios.put(`http://localhost:8000/home/admin/${id}/nurses`, {
          
          id: row.id,
          doctor_id: row.doctor_id,
          name: row.name,
          age: row.age,
          email: row.email,
          Salary: row.salary,
          phone:row.phone,
          sex: row.sex,
          address: row.address,
          
          }, {
            headers: {
              token: token  // Include the token in the headers for authentication
            }
          });
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

  const handleNewRowChange = (e) => {
    const { name, value } = e.target;
    setNewRow(prev => ({ ...prev, [name]: value }));
  };

  const handleAddRow = async() => {
    
    try {
      console.log(newRow)
      const response = await axios.post(`http://localhost:8000/home/admin/${id}/nurses`, {
          doctor_id: newRow.doctor_id,
          name: newRow.name,
          age:newRow.age,
          email: newRow.email,
          Salary: newRow.salary,
          phone:newRow.phone,
          sex: newRow.sex,
          address: newRow.address,
    }, {
      headers: {
        token: token
      }
    });
    const { __v, ...otherData } = response.data;
    console.log('Add successful:', otherData);
    const newRowData = {
      id: otherData._id,
      doctor_id:otherData.doctor_id,
      name: otherData.Nname,
      age: otherData.Nage,
      email: otherData.Nemail,
      salary: otherData.NSalary,
      phone: otherData.Nphone,
      sex: otherData.Nsex,
      address: otherData.Naddress,
    };

    setRows([...rows, newRowData]);
  //   setRows([...rows, { ...otherData, isEditMode: false }]);
  } catch (error) {
    console.error('Add failed:', error);
  }
    setShowForm(false);
    setRows([...rows, { ...newRow, isEditMode: false }]);
    setNewRow({
      id: '',
      doctor_id:'',
      name: '',
      age:'',
      email: '',
      salary: '',
      phone: '',
      sex: '',
      address: ''
    });
  };

  const handleDeleteRow = async (rowIndex) => {
    const rowId = rows[rowIndex].id; // Assuming each row has a unique 'id' field
    console.log('row data', rowId)
    console.log('rowId type:', typeof rowId);
    

    // Delete request
    try {
        // console.log(rows[rowIndex])
        const response = await axios.delete(`http://localhost:8000/home/admin/${id}/nurses`, {
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
        console.log(rows[rowIndex])
      console.error('Delete failed:', error);
    }
  };

  return (
    <div>
      <nav className={styles.sideNav}>
        <ul>
          <li>
            <a href='/adminProfile'>Profile</a>
          </li>
          <li>
            <a href='/addEditPatient'>Patients</a>
          </li>
          <li>
            <a href='/addEditDoctor'>Doctors</a>
          </li>
          <li>
            <a href='/addEditNurse'  className={styles.active}>Nurses</a>
          </li>
          <li>
            <a href='/addEditDevice'>Devices</a>
          </li>
          <li>
              <a href='/adminBillings'>Patients' Payments</a>
          </li>
          
        </ul>
      </nav>
      <div>
        <table className={styles.styledTable}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Doctor ID</th>
              <th>Name</th>
              <th>Age</th>
              <th>Email</th>
              <th>Salary</th>
              <th>Phone</th>
              <th>Sex</th>
              <th>Address</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {Object.keys(newRow).map((key) => (
                  <td key={key}>
                    {row.isEditMode ? (
                      <input
                        type="text"
                        value={row[key]}
                        onChange={(e) => handleChange(e, rowIndex, key)}
                        disabled={key === 'id'}
                      />
                    ) : (
                      row[key]
                    )}
                  </td>
                ))}
                <td>
                  {row.isEditMode ? (
                    <IconButton onClick={() => handleSave(rowIndex)}><DoneIcon style={{ color: 'green' }}/></IconButton>
                  ) : (
                    <IconButton  onClick={() => handleEdit(rowIndex)}><EditIcon style={{ color: 'black' }} /></IconButton>
                  )}
                  <IconButton onClick={() => handleDeleteRow(rowIndex)} className={styles.trash}>
                    <DeleteIcon style={{ color: 'red' }}/>
                  </IconButton>
                </td>
              </tr>
            ))}
            {showForm && (
              <tr>
                {Object.keys(newRow).map((key) => (
                  <td key={key}>
                    <input
                      type="text"
                      name={key}
                      value={newRow[key]}
                      onChange={handleNewRowChange}
                      disabled={key === 'id'}
                    />
                  </td>
                ))}
              </tr>
            )}
          </tbody>
        </table>
        <div className={styles.submitbuttons}>
          {!showForm && <button onClick={() => setShowForm(true)}>Add</button>}
          {showForm && <button onClick={handleAddRow}>Submit</button>}
        </div>
      </div>
    </div>
  );
};

export default AddEditNurse;
