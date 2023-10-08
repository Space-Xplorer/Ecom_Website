import React from 'react';
import Footer from './Footer';
import { Helmet } from 'react-helmet';
import { Toaster } from 'react-hot-toast';
import AdminHeader from './AdminHeader';

function AdminLayout({ children, title, description, keywords, author }) {
  return (
    <div className="">
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <AdminHeader />
      <main>{children}</main>
      <Toaster />
    </div>
  );
}

AdminLayout.defaultProps = {
  title: 'Ecommerce App - Shop Now',
  description: 'MERN stack project',
  keywords: 'MERN, React, Node, MongoDB',
  author: 'Pranav',
};

export default AdminLayout;
