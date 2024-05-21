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
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const AddEditDoctor = () => {
  const [showForm, setShowForm] = useState(false);
  const [newRow, setNewRow] = useState({
    id: '',
    name:'',
    age:'',
    specialization: '',
    sex: '',
    salary: '',
    email: '',
    password:'',
    phone: '',
    address: '',
    dep_id:''
  });

  const [rows, setRows] = useState([{}]);
  const [token, setToken] = useState(null);
  const [id, setId] = useState(null);
  const [error,setError] = useState(null)
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  useEffect(() => {
    const token = Cookies.get('token');
    const id = Cookies.get('id');
    setToken(token);
    setId(id);
    console.log('token in device',token)
    const fetchData = async () => {
      try {
        console.log(id)
        const result = await axios.get(`http://localhost:8000/home/admin/${id}/doctors`,{headers:{token:token}});
        const newRowData = result.data.map(doctor => ({
            id: doctor._id,
            name: doctor.Dname,
            age: doctor.Dage,
            specialization: doctor.Specialization,
            sex: doctor.Dsex,
            salary: doctor.DSalary,
            email: doctor.Demail,
            password: doctor.Dpassword,
            phone:doctor.Dphone,
            address: doctor.Daddress,
            dep_id: doctor.dep_id
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
    // const updatedRows = rows.map((row, index) => {
    //   if (index === rowIndex) {
    //     return { ...row, isEditMode: false };
    //   }
    //   return row;
    // });
    // setRows(updatedRows);
    // Save the changes made by the user
    const row = rows[rowIndex];
    try {
        
        const response = await axios.put(`http://localhost:8000/home/admin/${id}/doctors`, {
          id: row.id,
          name: row.name,
          age: row.age,
          Specialization: row.specialization,
          sex: row.sex,
          Salary: row.salary,
          email: row.email,
          
          phone:row.phone,
          address: row.address,
          dep_id: row.dep_id
          }, {
            headers: {
              token: token  // Include the token in the headers for authentication
            }
          });
          console.log("response",response)
          const updatedRows = rows.map((row, index) => {
            if (index === rowIndex) {
              return { ...row, isEditMode: false };
            }
            return row;
          });
          
          setRows(updatedRows);
      console.log('Update successful:', response.data);
    } catch (error) {
      setError(error.response.data.message)
      setSnackbarOpen(true);
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
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleAddRow = async() => {
    
    try {
      console.log(newRow)
      const response = await axios.post(`http://localhost:8000/home/admin/${id}/doctors`, {
        // id: newRow.id,
        name: newRow.name,
        age: newRow.age,
        Specialization: newRow.specialization,
        sex: newRow.sex,
        Salary: newRow.salary,
        email: newRow.email,
        password: newRow.password,
        phone:newRow.phone,
        address: newRow.address,
        dep_id: newRow.dep_id
    }, {
      headers: {
        token: token
      }
    });
    const { __v, ...otherData } = response.data;
    console.log('Add successful:', otherData);
    const newRowData = {
      id: otherData._id,
      name: otherData.Dname,
      age: otherData.Dage,
      specialization: otherData.Specialization,
      sex: otherData.Dsex,
      salary: otherData.DSalary,
      email: otherData.Demail,
      password: otherData.Dpassword,
      phone: otherData.Dphone,
      address: otherData.Daddress,
      dep_id: otherData.dep_id
    };

    setRows([...rows, newRowData]);
  //   setRows([...rows, { ...otherData, isEditMode: false }]);
  } catch (error) {
    console.error('Add failed:', error);
    setError(error.response.data.message)
      setSnackbarOpen(true);
  }
    setShowForm(false);
    setRows([...rows, { ...newRow, isEditMode: false }]);
    setNewRow({
      id: '',
      name:'',
      age:'',
      specialization: '',
      sex: '',
      salary: '',
      email: '',
      password:'',
      phone: '',
      address: '',
      dep_id:''
    });
  };

  const handleDeleteRow = async (rowIndex) => {
    const rowId = rows[rowIndex].id; // Assuming each row has a unique 'id' field
    console.log('row data', rowId)
    console.log('rowId type:', typeof rowId);
    

    // Delete request
    try {
        // console.log(rows[rowIndex])
        const response = await axios.delete(`http://localhost:8000/home/admin/${id}/doctors`, {
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
            <a className={styles.active}>Doctors</a>
          </li>
          <li>
            <a href='/addEditNurse'>Nurses</a>
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
              <th>Name</th>
              <th>Age</th>
              <th>Specialization</th>
              <th>Sex</th>
              <th>Salary</th>
              <th>Email</th>
              <th>Password</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Department ID</th>
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
      
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
  
    </div>
  );
};

export default AddEditDoctor;
