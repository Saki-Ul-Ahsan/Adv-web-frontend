import Link from "next/link";
import styles from '../../styles/headerStyle.module.css';
import React from "react";
const goToHomePage = () => {
  window.location.href = '/'; 
};
const goToLoginform = () => {
  window.location.href = 'loginform';
}
const goToRegistrationPage = () => {
  window.location.href = 'registrationform';
}
const goToAboutUs = () => {
  window.location.href = 'aboutus';
}

const image = '/home4.png';

const backgroundStyle = {
  backgroundImage: `url(${image})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: -1,
  filter: 'blur(5px)',
};

const mainStyle = {
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  position: 'relative', 
};
export default function Header() {
  return (
    <header className={styles.header}>
      <div className={`${styles.navbar} container mx-auto py-4`}>
        <div className={styles.logo}>Tourism Management System </div>

        <nav className={`${styles.navBox} hidden lg:flex`}>
          <div className={styles.linkBox}>
            <button onClick={goToHomePage} className={styles.navButton}>
              Home
            </button>
            <button onClick={goToAboutUs} className={styles.navButton}>
              About
            </button>
          </div>
        
          <div className={styles.linkBox}>
          <button onClick={goToLoginform} className={styles.navButton}>
              Sign In
            </button>
            <button onClick={goToRegistrationPage} className={styles.navButton}>
              Sign Up
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}













// import Link from "next/link"

// export default function Header(){

// return (
//     <>
 


// <div className="bg-neutral navbar text-neutral-content">
//   <div className="navbar-start">
  
//     <Link href="/" className=" normal-case text-xl ">3NP</Link> 
//   </div>
//   <div className="navbar-center hidden lg:flex">
//     <ul className="menu menu-horizontal px-1">
//       <li> <Link href="/"> Home </Link></li>
//       <li> <Link href="aboutus"> About </Link></li>
//     </ul>
//   </div>
//   <div className="navbar-end">
//   <ul className="menu menu-horizontal px-1">
//       <li> <Link className="" href="loginform" > Sign In </Link> </li>
//       <li> <Link className="" href="registrationform" > Sign Up </Link></li>
//     </ul>
 
//   </div>
// </div>


//        </>
// )

// }