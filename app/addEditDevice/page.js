'use client'
import styles from './page.module.css';
import React, { useState, useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';



const AddEditDevice = () => {
  const [token, setToken] = useState(null);
  const [id, setId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [newRow, setNewRow] = useState({
    id:'',
    Code: '',
    Manufacturer: '',
    PPM: '',
    dep_id:''
  });

  const [rows, setRows] = useState([]);

  useEffect(() => {
    const token = Cookies.get('token');
    const id = Cookies.get('id');
    setToken(token);
    setId(id);
    console.log('token in device',token)
    const fetchData = async () => {
      try {
        console.log(id)
        const result = await axios.get(`http://localhost:8000/home/admin/${id}/devices`,{headers:{token:token}});
        const newRowData = result.data.map(device => ({
            id: device._id,
            Code: device.Code,
            Manufacturer: device.Manufacturer,
            PPM: device.PPM,
            dep_id: device.dep_id,
            isEditMode: false
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
        const response = await axios.put(`http://localhost:8000/home/admin/${id}/devices`, {
            id: row.id,  // Ensure the ID is included in the request body
            // Code: row.Code,
            PPM: row.PPM,
            Manufacturer: row.Manufacturer,
            dep_id: row.dep_id
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

  const handleAddRow = async () => {
    
    try {
        console.log(newRow)
      const response = await axios.post(`http://localhost:8000/home/admin/${id}/devices`, {
        
        Code: newRow.Code,
        Manufacturer: newRow.Manufacturer,
        PPM: newRow.PPM,
        dep_id: newRow.dep_id
      }, {
        headers: {
          token: token
        }
      });
      const { __v, ...otherData } = response.data;
      console.log('Add successful:', otherData);
      const newRowData = {
        id:otherData._id,
        Code: otherData.Code,
        Manufacturer: otherData.Manufacturer,
        PPM: otherData.PPM,
        dep_id: otherData.dep_id
      };
  
      setRows([...rows, newRowData]);
    //   setRows([...rows, { ...otherData, isEditMode: false }]);
    } catch (error) {
      console.error('Add failed:', error);
    }
    setShowForm(false);
    setNewRow({
      Code: '',
      Manufacturer: '',
      PPM: '',
      dep_id:''
    });
  };

  const handleDeleteRow = async(rowIndex) => {
    
    const rowId = rows[rowIndex]._id; // Assuming each row has a unique 'id' field
    console.log('row data', rowId)
    console.log('rowId type:', typeof rowId);
    

    // Delete request
    try {
        // console.log(rows[rowIndex])
        const response = await axios.delete(`http://localhost:8000/home/admin/${id}/devices`, {
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
            <a href='/addEditDoctor' >Doctors</a>
          </li>
          <li>
            <a href='/addEditNurse'>Nurses</a>
          </li>
          <li>
            <a href='/addEditDevice' className={styles.active}>Devices</a>
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
              <th>Code</th>
              <th>PPM</th>
              <th>Manufacturer</th>
              <th>Department ID</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {Object.keys(row).filter(key => key !== 'isEditMode').map((key) => (
                  <td key={key}>
                    {row.isEditMode ? (
                      <input
                        type="text"
                        value={row[key]}
                        onChange={(e) => handleChange(e, rowIndex, key)}
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
                <td><input type="text" name="id" disabled/></td>
                <td><input type="text" name="Code" value={newRow.Code} onChange={(e) => setNewRow({ ...newRow, Code: e.target.value })} /></td>
                <td><input type="text" name="PPM" value={newRow.PPM} onChange={(e) => setNewRow({ ...newRow, PPM: e.target.value })} /></td>
                <td><input type="text" name="Manufacturer" value={newRow.Manufacturer} onChange={(e) => setNewRow({ ...newRow, Manufacturer: e.target.value })} /></td>
                <td><input type="text" name="dep_id" value={newRow.dep_id} onChange={(e) => setNewRow({ ...newRow, dep_id: e.target.value })} /></td>
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

export default AddEditDevice;