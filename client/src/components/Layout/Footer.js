import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className=' py-4'>
      <div className='container mx-auto'>
        <h4 className='text-center text-orange-700 text-sm'>&copy; 2023 <span className=' font-bold'>achievers</span> with ❤️</h4>
        <p className='text-center text-orange-700 mt-3'>
          <Link to='/about' className='hover:underline'>About</Link>
          {' | '}
          <Link to='/contact' className='hover:underline'>Contact</Link>
          {' | '}
          <Link to='/policy' className='hover:underline'>Privacy Policy</Link>
        </p>
      </div>
    </div>
  );
}

export default Footer;
