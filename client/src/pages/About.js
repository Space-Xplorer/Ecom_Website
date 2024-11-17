import React from 'react';
import Layout from '../components/Layout/Layout';
import { FaEnvelope, FaPhoneAlt, FaRegLifeRing } from 'react-icons/fa';

const About = () => {
  return (
    <Layout title={'About Us'}>
      <div className="container mx-auto flex justify-center items-center">
        <div className="lg:w-1/2">
          <img
            src="/images/about_us-1.jpg"
            alt="About Us"
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>
        <div className="lg:w-1/2 p-8">
          <h1 className="text-4xl font-bold text-center mb-6">Our Story</h1>
          <p className="text-justify">
          Welcome to Artisans of Telangana, where artistry meets online shopping! We take immense pride in curating a marketplace that celebrates the rich tapestry of local craftsmanship and creativity. Our platform is dedicated to empowering and showcasing the talents of local artisans, providing them with a global stage to display their unique creations.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
