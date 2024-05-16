import React from 'react';
import Time from './Time'; 

const Navbar = () => {
  const copyToClipboard = () => {
    const link = 'https://github.com/AnushreeSaha21/Birthday-Calendar.git';
    navigator.clipboard.writeText(link).then(() => {
      alert('Link copied to clipboard!');
    }).catch((error) => {
      console.error('Error copying to clipboard:', error);
    });
  };
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1>Birthday Calendar 🎂</h1>
      </div>
      <div className="navbar-middle">
        <Time />
      </div>
      <div className="navbar-right">
        <button onClick={copyToClipboard}>Source Code</button>
      </div>
    </nav>
  );
};

export default Navbar;
