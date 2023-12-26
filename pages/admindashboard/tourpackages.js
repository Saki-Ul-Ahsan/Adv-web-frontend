import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import NavBar from "../layout/navbar";
import dynamic from 'next/dynamic'
const Layout = dynamic(() => import('../layout/layout'), {
  ssr: false,
})
const Title = dynamic(() => import('../layout/title'), {
  ssr: false,
})

export default function AllAdmin() {
    const [jsonData, setJsonData] = useState(null);
    
    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        try {
             const response = await axios.get(process.env.NEXT_PUBLIC_API_ENDPOINT + `/agent/getpackages`,
             { 
             withCredentials: true
                   }
             );
            const jsonData = response.data;
            console.log(jsonData)
            setJsonData(jsonData);
        } catch (error) {
            console.error(error);
        }
    }

    const printArray = (jsonData) => {
        return (
            jsonData.map((item, index) => {
                return (

                    <div key={index}>
                        <Link href={"tourpackage/"+ item.id}>
                        <h3 className='text-ellipsis text-cyan-700'>
                                {item.destination}
                                </h3>
                                </Link>
                    </div>
                );

            })
        );
    }

    return (

        <>
 <Title page="ALL Admin"> </Title>
  <Layout>
    <NavBar/>
   Tour packages are listed below
            {jsonData != null &&
         
                  printArray(jsonData)
          
            }
</Layout>
        </>
    );
}