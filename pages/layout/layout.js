import Footer from './footer';
import Header from './header';

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

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <div style={mainStyle}>
        <div style={backgroundStyle}></div>
        {children}
      </div>
      <Footer />
    </>
  );
}
