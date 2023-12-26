import Link from "next/link";
import dynamic from "next/dynamic";
import Image from "next/image";
import Layout from "./layout/layout";
import Title from "./layout/title";

export default function Home( ) {
  return (
    <>
    
     <Title page="Homepage"> </Title>  

    
<Layout>
<h1> Homepage</h1>
<div className="bg-neutral text-white p-10">
 Welcome to the Homepage
 </div>
    </Layout>
    </>
  )
}