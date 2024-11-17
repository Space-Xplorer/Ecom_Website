import React from "react";
import Layout from "./../components/Layout/Layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";
import { FaEnvelope, FaPhoneAlt, FaRegLifeRing } from 'react-icons/fa';
const Contact = () => {
  return (
    <Layout title={"Contact us"}>
      <div className="flex flex-col md:flex-row items-center justify-center md:justify-between contactus">
        <div className="md:w-1/2 mb-4 md:mb-0">
          <img
            src="/images/contact_us-1.jpg"
            alt="contactus"
            className="w-full rounded-md"
          />
        </div>
        <div className="md:w-1/2 md:ml-4">
          <h1 className="text-4xlbg-dark p-2 font-bold text-center mb-4 md:mb-6">
            CONTACT US
          </h1>
          <p className="text-justify mb-4">
            Have a question or need information about our products? Feel free to
            contact us anytime. We're available 24/7 to assist you.
          </p>
          <ul className="list-disc pl-6 mt-4">
            <li className="flex items-center mb-2">
              <FaEnvelope className="mr-2" /> Email: artisansoftelangana@gmail.com
            </li>
            <li className="flex items-center mb-2">
              <FaPhoneAlt className="mr-2" /> Phone: 9347805418
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

export default Contact;
