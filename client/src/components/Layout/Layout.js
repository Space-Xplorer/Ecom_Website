import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Helmet } from 'react-helmet';
import { Toaster } from 'react-hot-toast';

function Layout({ children, title, description, keywords, author }) {
  return (
    <div className="">
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Header />
      <main style={{ minHeight: '90vh' }}>{children}</main>
      <Toaster />
      <Footer />
    </div>
  );
}

Layout.defaultProps = {
  title: 'Ecommerce App - Shop Now',
  description: 'MERN stack project',
  keywords: 'MERN, React, Node, MongoDB',
  author: 'Pranav',
};

export default Layout;
