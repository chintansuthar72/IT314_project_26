import './App.css';
// import React, {useState} from 'react';
import Navbar from './components/Navbar';
import About from './components/About';

function App() {
  return (
    <>
      {/* <div className='container my-2 mx-3'> */}
      {/* <button class="btn btn-primary" type="button">Button</button> */}
      {/* </div> */}
      <Navbar />
      <div className='container my-2 mx-3'>
        <About/>
      </div>
    </>
  );
}

export default App;