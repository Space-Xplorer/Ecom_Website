import React from 'react';
import Layout from '../components/Layout/Layout';
import { FaEnvelope, FaPhoneAlt, FaRegLifeRing } from 'react-icons/fa';

const About = () => {
  return (
    <Layout title={'About Us'} >
      <div className="row aboutus min-h-full">
        <div className="col-md-6">
          <img
            src="/images/about-us-image.jpg"
            alt="About Us"
            className="about-image"
          />
        </div>
        <div className="col-md-4">
          <h1 className="bg-dark p-2 text-white text-center">Our Story</h1>
          <p className="text-justify mt-2">
            Discover the world of extraordinary shopping at our Ecommerce Store. Our journey began with a simple mission: to redefine the shopping experience and offer remarkable products that inspire and elevate.
          </p>
          <ul className="about-values">
            <li>
              <FaEnvelope className="icon" /> Email: help@ecommerceapp.com
            </li>
            <li>
              <FaPhoneAlt className="icon" /> Phone: 012-3456789
            </li>
            <li>
              <FaRegLifeRing className="icon" /> Support: 1800-0000-0000 (toll free)
            </li>
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default About;
