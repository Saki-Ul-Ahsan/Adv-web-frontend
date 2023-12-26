import { useState } from 'react';
import Layout from "./layout/layout";
import axios from 'axios';
import Swal from 'sweetalert2';
import styles from '../styles/style.module.css';



export default function RegisterPage () {


  const [name, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [id, setId] = useState('');
  const[error, setError] = useState(null);

  const handleChangeId = (e) => {
    setId(e.target.value);
  }
  const handleChangeFullName = (e) => {
setFullName(e.target.value)
  }

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleChangePhone = (e) => {
    setPhone(e.target.value);
  };
  const idNum = parseInt(id);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  
  
  const isFormIncomplete = !(
    id &&
    name &&
    email &&
    password &&
    phone &&
    confirmPassword 
  );





  const handleSubmit = async (e) => {
    e.preventDefault();
    let formError = {};
    if(isFormIncomplete){
      formError.allFields='All fields are necessary';
        console.log('All fields are required')
    } else if (password !== confirmPassword  ) {
      formError.passwordMatch='Passwords do not match'
    } else if (password.length < 8 || password.length > 16) {
       formError.passwordLength='Password length should be between 8 and 16 characters';
      }else if (!/^[A-Za-z]+$/.test(name.trim())) {    
        formError.nameFormat = 'Name can only contain letters';
        console.log('Name field should contain only letters');
      }else if (!/^\d{11}$/.test(phone.trim())) {
        formError.phoneFormat = 'Phone number should be 11 digits and only contain digits';
        console.log('Phone number should contain exactly 11 digits');
      }else if (!validateEmail(email)){
        console.log('Invalid Email');
        formError.emailFormat = 'Invalid Email';
      }
    if (Object.keys(formError).length > 0) {
      setError(formError);
    } else {
      try {
        await postData();
        setError({ userCreated: 'User created successfully' });
        handleReset();
      } catch (e) {
        console.error('Error:', e.message);
        setError({ serverError: e.message });
      }
    }
    
  
  };

  async function postData() {
   try {

    const formData = {
      "id":idNum,
      "name":name,
      "password":password,
      "email" :email
    };
    console.log(formData);
     const response = await axios.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/agent/create`, formData, {
      headers: {
        'Content-Type': 'application/json'
    }
     });
     

     if (response.status === 500) {
      console.log('Internal server error. Email is already taken.');
      Swal.fire({
        title: "Internal server error",
        text: `Email is already taken`,
        icon: "error"
      
      });
      
    }else if (response.status === 201){
      console.log('Inside 201 block');
      Swal.fire({
        title: "User Added!",
        text: `New user named ${name} added`,
        icon: "success"
      });
      handleReset();
    }
  
    
     const data = response.data;
     console.log(data);
     } catch (error) {
      if (error.response) {
        console.error('Server Error:', error.response.data);
        console.error('Status Code:', error.response.status);
        console.error('Headers:', error.response.headers);
      } else if (error.request) {
        console.error('Request Error:', error.request);
      } else {
        console.error('Error:', error.message);
      }
      throw error
    }
  }
  const handleReset= () => {
    setFullName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setPhone('');
    setError('');
    setId('')
  }


return (
  <>
    {/* <Title page="Registration"> </Title> */}
    <Layout>
      <h1>Registration Form</h1>
      <div className={styles['div']}>
        <form onSubmit={handleSubmit}>
          <label>ID</label><br></br>
          <input type='number' 
          className={styles['input-fields']} 
          name="id" value={id} 
          onChange={handleChangeId} /><br></br>
          {(isFormIncomplete && !id) && (
            <span className={styles['error']} >ID is necessary</span>
          )}<br></br>
<br></br>
          <label>Full Name</label><br></br>
          <input type="text" 
          className={styles['input-fields']} 
          name="name" value={name} 
          onChange={handleChangeFullName} /><br></br>
          {(isFormIncomplete && !name) && (
            <span className={styles['error']} >Name is necessary</span>
          )}<br></br>
          {error && error.nameFormat && (
            <span className={styles['error']} >"{error.nameFormat}"</span>
          )}<br></br>

          <label>Email</label><br></br>
          <input type="text" 
          className={styles['input-fields']} 
          name="email" value={email} 
          onChange={handleChangeEmail} /><br></br>
          {(isFormIncomplete && !email) && (
            <span className={styles['error']} >Email is necessary</span>
          )}<br></br>
          {error && error.emailFormat && (
            <span className={styles['error']} >{error.emailFormat}</span>
          )}<br></br>

          <label>Password</label><br></br>
          <input type="password" 
          className={styles['input-fields']} 
          name="password" value={password} 
          onChange={handleChangePassword} /><br></br>
          {(isFormIncomplete && !password) && (
            <span className={styles['error']} >Password is necessary</span>
          )}<br></br>
          {error && error.passwordLength && (
            <span className={styles['error']} >{error.passwordLength}</span>
          )}<br></br>

          <label>Confirm Password</label><br></br>
          <input type="password" 
          className={styles['input-fields']} 
          name="confirmPassword" 
          value={confirmPassword} 
          onChange={handleChangeConfirmPassword} /><br></br>
          {(isFormIncomplete && !confirmPassword) && (
            <span className={styles['error']} >Confirm your password</span>
          )}<br></br>
          {error && error.passwordMatch && (
            <span className={styles['error']} >{error.passwordMatch}</span>
          )}<br></br>
        
          <label>Phone</label><br></br>
          <input type="text" 
          className={styles['input-fields']}
          name="phone" 
          value={phone} 
          onChange={handleChangePhone} /><br></br>
          {(isFormIncomplete && !phone) && (
            <span className={styles['error']} >Phone is necessary</span>
          )}<br></br>
          {error && error.phoneFormat && (
            <span className={styles['error']} >{error.phoneFormat}</span>
          )}<br></br>

          <br></br>
          {error && error.userCreated && <p className={styles['error']}>{error.userCreated}</p>}
          {error && Object.keys(error).length > 0 && (
            <p className={styles['error']}>Please fill all fields correctly</p>
          )}
          <button className={styles['button']} type="submit" >Register</button><br></br><br></br>
          <button className={styles['reset-button']} type='reset' onClick={handleReset} >Reset</button>
        </form>
      </div>
    </Layout>
  </>
);

}