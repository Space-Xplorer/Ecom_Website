import React from 'react'
import AdminMenu from '../../components/Layout/AdminMenu'
import Layout from './../../components/Layout/Layout';
import { useState,useEffect} from 'react';
import  toast  from 'react-hot-toast';
import  axios  from 'axios';
import { Link } from 'react-router-dom';
function Products() {
    const [product,setProduct]=useState([]);

    //get-all products
    const getAllProducts=async (e)=>{
        try{
            const {data}=await axios.get('/api/v1/product/products')
            setProduct(data.products);
            if(data.message){

            }
        }
        catch(error){
            console.log(error);
            toast.error('Something went wrong')
        }
    }


    //life-cycle method
    useEffect(()=>{
        getAllProducts();
    },[])
  return (
    <Layout>
    <div className='container-fluid m-3 p-3'>
        <div className='row'>
            <div className='col-md-3'>
                <AdminMenu/>
            </div>
            <div className='col-md-9'>
                <h1 className='text-center'>All Products List</h1>
                <div className='d-flex flex-wrap'>
                {product?.map((Obj)=>(
                    <Link key={Obj._id } to={`/dashboard/admin/product/${Obj.slug}`} className='product-link'>
                    <div className="card m-2" style={{width: '10rem'}} >
                    <img src={`/api/v1/product/get-photo/${Obj._id}`} className="card-img-top h-75 w-75 " alt={Obj.name} />
                    <div className="card-body">
                        <h5 className="card-title">{Obj.name}</h5>
                        <p className="card-text">{Obj.description}</p>
                    </div>
                </div>
                </Link>
                ))}
                </div>    
                    
            </div>

        </div>
    </div>
    </Layout>
  )
}

export default Products