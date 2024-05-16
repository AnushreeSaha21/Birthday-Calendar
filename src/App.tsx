import React from 'react';
import './App.css';
import Calendar from './Components/Calendar';
import Footer from './Components/Footer';
import Navbar from './Components/Navbar';


function App() {
  return (
    <>
    <Navbar/>
    
    <div className='App'>
        <Calendar/>  
    </div>
    <Footer/>
    </>
  );
}

export default App;
