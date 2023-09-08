import React from 'react'
import Layout from './../components/Layout/Layout';
import { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
function Categories() {

    const [categories,setCategories]=useState([]);

    const getAllCategories= async ()=>{
        try{
            const {data}=await axios.get(`/api/v1/category/categories`)
            setCategories(data.categories);
        }catch(error){
            console.log(error)
        }
    }

    useEffect(()=>{
        getAllCategories();
    },[])
  return (
    <Layout title={'All-Categories'}>
        <h1>Categories</h1>
        <div className='container'>
            <div className='row'>
                {categories.map(c=>(
                     <div className='col-md-6 mt-5 mb-3 gx-3 gy-3' key={c._id} >
                        <Link className='btn btn-primary' to={`/category/${c.slug}`}>{c.name}</Link>
                        
                    </div>
                ))}
               
            </div>
        </div>
    </Layout>
  )
}

export default Categories