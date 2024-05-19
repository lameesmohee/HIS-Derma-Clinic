'use client'
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import Cookies from "js-cookie";
import { setAuthData } from './authData';
import { redirect } from 'next/navigation'
import { useRouter } from 'next/navigation';
import { useHistory } from 'react-router-dom';
// import Router from 'next/router';

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

// export let token = {}
// export let id = 0;
export default function SignIn() {
  const router = useRouter();

  const handleSubmit = async (event) => {
    
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // console.log(event.currentTarget)
    
    const postData = {
      email: data.get('email'),
      password: data.get('password'),
      person_type:'admin'
    };
    console.log(postData);

    try {
      const response = await axios.post('http://localhost:8000/home/signin',postData);
      console.log('Response:', response.data);
      console.log('Token: ', response.data.token);
      const token = response.data.token;
      const id = response.data._id;
      Cookies.set('token', token);
      Cookies.set('id', id);
      // setAuthData(token, id)
      // router.push({ pathname:"/addEditDevice", query:{token, id}});
      router.push("/addEditDevice");
     
    } catch (error) {
      console.error('Error:', error); 
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs" >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 20,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="./signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        
      </Container>
    </ThemeProvider>
  );
}