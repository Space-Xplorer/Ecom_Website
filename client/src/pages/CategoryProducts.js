import React from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import Layout from './../components/Layout/Layout';
import { useState, useEffect } from 'react';
import axios  from 'axios';
function CategoryProducts() {

    const params=useParams();
    const navigate=useNavigate();
    const [products,setProducts]=useState([]);
   
    const [category,setCategory]=useState([]);
    const getProductsByCat=async ()=>{
      try{
          const {data}=await axios.get(`/api/v1/product/product-category/${params.slug}`)
          setProducts(data?.products);
          setCategory(data?.category);
          
      }catch(error){
        console.log(error)
      }
    }

    useEffect(()=>{
      if(params?.slug)
            getProductsByCat();
    },[params.slug])
   
  
  return (
    <Layout>
        <div className='container'>
            <h4 className='text-center'>Category Name :{category.name}</h4>
            <h6 className='text-center'>{products.length} results found</h6>
            {/* <div className='row'>
            <div className='d-flex flex-wrap'>
              {products?.map((Obj)=>(
                    
                    <div className="card m-2" style={{width: '18rem'}} >
                    <img src={`/api/v1/product/get-photo/${Obj._id}`} className="card-img-top  h-50" alt={Obj.name} />
                    <div className="card-body">
                        <h5 className="card-title">{Obj.name}</h5>
                        <p className="card-text">{Obj.description.substring(0,30) }</p>
                        <p className="card-text">$ {Obj.price}  </p>
                        <button  className="btn btn-primary ms-1" onClick={() => navigate(`/product/${Obj.slug}`) }  >More Details</button>
                        <button  className="btn btn-secondary ms-1">Add to Cart</button>
                    </div>
                </div>
                
                ))}

            </div>
            <div>
              <div className='m-2 p-3'>
                  {products && products.length<total && (
                    <button className='btn btn-warning' 
                    onClick={(e)=> {
                      e.preventDefault();
                      setPage(page+1);
                    } } 
                    >
                      {loading ? "Loading..." : "Loadmore"}
                    </button>
                  )}
              </div>
            </div> 
            </div> */}
        </div>
    </Layout>
  )
}

export default CategoryProducts