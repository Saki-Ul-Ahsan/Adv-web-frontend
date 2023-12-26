import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useAuth } from './utils/authcontext';
import Title from './layout/title';
import Layout from './layout/layout';
import Swal from 'sweetalert2';
import styles from '../styles/style.module.css';

export default function LoginPage() {
  const router = useRouter();
  const { login, logout } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [timeoutId, setTimeoutId] = useState(null);

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Email and password are required');
    } else {
      const res = await doSignIn(email, password);
      console.log(res);
      if(res){
        startLogoutTimer();
      }
    }
  };

  async function doSignIn(email, password) {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/agent/login/`,
        { email, password },
      );

      // console.log(response.status)

      if (response.status === 201) {
        
        Swal.fire({
          title: "Login successful",
          icon : "success"
        });
        console.log('cookie: ' + document.cookie);
        login(email, document.cookie);
        router.push('/admindashboard/profile'); 
      }else {
        
        setError('Invalid user');
        return false;
      }

    } catch (error) {
      Swal.fire({
        title: "Invalid email or password",
        icon : "error"
      });
      console.error('Login failed:', error);
      handleReset();
      return false;
    }
  }

const startLogoutTimer = () => {
  if(timeoutId){
    clearTimeout(timeoutId)
  }
  const newTimeoutId = setTimeout(() => {
    logout();
    router.push('/login');
  }, 1200);
  setTimeoutId(newTimeoutId);
};

useEffect(() => {
  return()=>{
    if(timeoutId){
      clearTimeout(timeoutId);
    }
  }
})
const handleReset= () => {
  setEmail('');
  setPassword('');
}


  return (
    <>
      <Title page="Login"> </Title>
      <Layout>
      <h2 className="flex-auto text-center">Login</h2>
        <div className={styles['div']} >
          <div className="flex-auto ">
            <div>
              <form onSubmit={handleSubmit}>
                <div>
                  <label>Email</label><br></br>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    placeholder='Enter Email'
                    className={styles['input-fields']}
                    onChange={handleChangeEmail}
                  />
                </div>
                <div>
                  <label>Password</label><br></br>
                  <input
                    type="password"
                    name="password"
                    value={password}
                    placeholder='Enter Password'
                    className={styles['input-fields']}
                    onChange={handleChangePassword}
                  />
                </div> <br></br><br></br>
                {error && <p>{error}</p>}
                <button className={styles['login-button']} type="submit">
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
