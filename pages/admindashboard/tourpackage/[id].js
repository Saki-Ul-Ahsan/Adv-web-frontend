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
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/agent/tour-packagesbyid/${id}`, {
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
        <p className={styles['text-styles']} >Tour id: {data.tour_id}</p>
        <p className={styles['text-styles']}>Agent id: {data.id}</p>
        <p className={styles['text-styles']}>From: {data.from}</p>
        <p className={styles['text-styles']}>Destination: {data.destination}</p>
        <p className={styles['text-styles']}>Price: {data.price}</p>
        <p className={styles['text-styles']}>Transport: {data.transport}</p>
        <p className={styles['text-styles']}>Weather Info: {data.weather_info}</p>
        <p className={styles['text-styles']}>Availability: {data.availability}</p>
      </div>
    );
  };
  

  return (
    <>
      <Title page="ALL Admin" />
      <Layout>
        <NavBar />
        All Agent Data listed below
        {jsonData && printObject(jsonData)}
      </Layout>
    </>
  );
}
