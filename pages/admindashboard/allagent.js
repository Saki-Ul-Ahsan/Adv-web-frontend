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
    const [searchTerm, setSearchTerm] = useState('')
    
    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        try {
             const response = await axios.get(process.env.NEXT_PUBLIC_API_ENDPOINT + `/agent/agentIndex`,
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
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredData = jsonData ? jsonData.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
        ): []; 

    const printArray = (jsonData) => {
        return (
            jsonData.map((item, index) => {
                return (

                    <div key={index}>
                        <Link href={"agentprofile/"+ item.id}>
                        <h3 className='text-ellipsis text-cyan-700'>
                                {item.name}
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
    <div><input
    type='text'
    placeholder='Search agents'
    value={searchTerm}
    onChange={handleSearch}
    
    /></div>
    <div>
   <h2>All Agent Data listed below</h2>
   {jsonData !== null ? (
                        printArray(filteredData)
                    ) : (
                        <p>Loading...</p>
                    )}
            </div>
</Layout>
        </>
    );
}