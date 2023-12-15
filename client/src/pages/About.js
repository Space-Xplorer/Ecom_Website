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
          Welcome to ArtisanVista, where artistry meets online shopping! We take immense pride in curating a marketplace that celebrates the rich tapestry of local craftsmanship and creativity. Our platform is dedicated to empowering and showcasing the talents of local artisans, providing them with a global stage to display their unique creations.
          </p>
          <ul className="list-disc pl-6 mt-4">
            <li className="flex items-center mb-2">
              <FaEnvelope className="mr-2" /> Email: ArtisanVista_support@gmail.com
            </li>
            <li className="flex items-center mb-2">
              <FaPhoneAlt className="mr-2" /> Phone: 012-3456789
            </li>
            <li className="flex items-center">
              <FaRegLifeRing className="mr-2" /> Support: 1800-0000-0000 (toll-free)
            </li>
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default About;
