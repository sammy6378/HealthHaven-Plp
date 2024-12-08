import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
// import { Outlet } from 'react-router-dom';
import { useEffect,useState } from 'react';
import { ReactNode } from 'react';
import React from 'react';
import Notify from '../../Dashboard/notify';

interface FormProps {

    children: ReactNode;
  
}

const images = [
  "https://i.pinimg.com/736x/93/fa/dc/93fadc87f05304556a67ef672df28d18.jpg",
  "https://i.pinimg.com/564x/31/da/c5/31dac504da495c6fb4953db46caab31f.jpg",
  "https://i.pinimg.com/564x/e5/89/26/e58926b69621bc50f37a8999231fff2a.jpg", 
];

const Form: React.FC<FormProps> = ({ children })  =>{

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Automatically switch images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);



  return (
    // right side of the form
    <div className="flex h-screen ">
        <div className="w-1/2 relative hidden md:flex flex-col justify-center items-center bg-gray-900 text-white p-8">
      <img
           src='https://i.pinimg.com/736x/93/fa/dc/93fadc87f05304556a67ef672df28d18.jpg'
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div className="relative z-10 text-center">
          <Notify />
          <h2 className="text-4xl font-bold mb-4">TeleMed</h2>
          <p className="mb-6">
            Welcome to TeleMed. 
            We provide the best telemedicine services with a wide range of Health services.
            TeleMed is your one-stop solution for all your health needs.
          </p>
          <div className="flex justify-center space-x-4 mb-6">
            <a href="https://facebook.com" className="text-blue-500"><FaFacebook size={30} /></a>
            <a href="https://instagram.com" className="text-pink-500"><FaInstagram size={30} /></a>
            <a href="https://youtube.com" className="text-red-600"><FaYoutube size={30} /></a>
            <a href="https://twitter.com" className="text-blue-400"><FaTwitter size={30} /></a>
          </div>
        </div>
      </div>

    {/* right side of the form */}

    {children}
    </div>
  )
}

export default Form
