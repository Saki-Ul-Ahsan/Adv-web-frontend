import Link from "next/link";
import dynamic from 'next/dynamic'
import NavBar from "../layout/navbar";

import Layout from "../layout/layout";
import Title from "../layout/title";

export default function Profile( ) {
   
  return (
    <>

    <Title page="Profile"> </Title>
  <Layout>
  

<Link  className="link link-primary" href="/admindashboard/allagent">ALL Agent</Link>
<br/>
 <br/>
<Link  className="link link-primary" href="/admindashboard/tourpackages">ALL Tour Packages</Link>
<br/>
 <br/>

</Layout>
  
    </>
  )
}