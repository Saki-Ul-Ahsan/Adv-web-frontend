import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router'; // Import the useRouter hook
import NavBar from '../../layout/navbar';
import dynamic from 'next/dynamic';
import styles from '../../../styles/style.module.css';
import Title from '@/pages/layout/title';
import Layout from '@/pages/layout/layout';



export default function AllAdmin() {
  const [jsonData, setJsonData] = useState(null);
  const router = useRouter(); // Use the useRouter hook

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const { id } = router.query; // Retrieve the 'id' from the query string
      if (id) {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/agent/getCustomerbyId/${id}`, {
          withCredentials: true,
        });
        const jsonData = response.data;
        console.log(jsonData);
        setJsonData(jsonData);
      }
    } catch (error) {
      console.error(error);
    }
  }

  

  const printArray = (jsonData) => {
    return (
      Array.isArray(jsonData) &&
      jsonData.map((item, index) => {
        return (
          <div key={index}>
            <Link href={`agentprofile/${item.id}`}>
              <h3 className='text-ellipsis text-cyan-700'>{item.name}</h3>
            </Link>
          </div>
        );
      })
    );
  };
  const printObject = (data) => {
    return (
      <div>
        <h3>{data.name}</h3>
        <table className={styles['table']}> 
          <tbody>
            <tr>
              <td>ID</td>
              <td>: {data.id}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>: {data.email}</td>
            </tr>
            <tr>
              <td>File</td>
              <td>: {data.file}</td>
            </tr>
            <tr>
              <td>Hashed Password</td>
              <td>: {data.password}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };
  
  

  return (
    <>
      <Title page="ALL Admin" />
      <Layout>
        <NavBar />
        Agent Profile
        {jsonData && printObject(jsonData)}
      </Layout>
    </>
  );
}
