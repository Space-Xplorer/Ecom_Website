import React from 'react'
import Layout from '../components/Layout/Layout'
import { useState,useEffect } from 'react'
import  axios  from 'axios';
import { toast } from 'react-hot-toast';
import {Checkbox, Radio} from 'antd' 
import { Prices } from './../components/Price';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/Cart';
import "../styles/HomeStyles.css"
function Home() {

  const navigate=useNavigate();
  const [products,setProducts]=useState([])
  const [cart,setCart]=useCart()
  const [categories,setCategories]=useState([])
  
  const [checked,setChecked]=useState([])
  const [radio,setRadio]=useState([])
  const [total,setTotal]=useState(0);
  const [page,setPage]=useState(1);
  const [loading,setLoading] = useState(0)

  //get-Total
  const getTotal= async ()=>{
    try{
      const {data}=await axios.get('/api/v1/product/product-count')
      setTotal(data?.count);
    }catch(error){
      console.log(error);
    }
  }


//get-products

const getAllProducts= async ()=>{

  try{
  setLoading(true);
  const {data}=await axios.get(`/api/v1/product/product-list/${page}`)
  setLoading(false)
  if(data?.message){
    setProducts(data.products)
    toast.success(data.message)
  }
  
}
catch(error)
{
  setLoading(false);
  console.log(error);
  
}
}

  
useEffect(()=>{
  if(page==1) return;
  LoadMore();
},[page])

//load more 
const LoadMore= async ()=>{
   try{
    setLoading(true);
    const {data}=await axios.get(`/api/v1/product/product-list/${page}`)
    setLoading(false) 
    setProducts([...products, ...data?.products ]);
   }catch(error){
    console.log(error)
    setLoading(false)
   }
}


//filter 
const handlefilter= async (value,id)=>{

  let all=[...checked]
  if(value){
    all.push(id)
  }
  else{
    all=all.filter(c => c!=id)
  }
  setChecked(all);
}

 //get all cat
 const getAllCategory=async()=>{
  try{
   
    const {data}= await axios.get(`http://localhost:3000/api/v1/category/categories`)
    if(data?.success){
      setCategories(data?.categories);
      console.log()
    }
  }catch(error){
    console.log(error)
  }
}

useEffect(()=>{
  getAllCategory();
  getTotal();
},[])

useEffect(()=>{
 if(!checked.length || !radio.length) getAllProducts();
 
},[checked.length,radio.length])


//get filtered products
const filterProduct = async ()=>{
    try{
        const {data}= await  axios.post(`/api/v1/product/filter-product`,{checked,radio})
        setProducts(data?.products)
    }catch(error){
      console.log(error);
    }
}

useEffect(()=>{
   if(checked.length || radio.length) filterProduct();
},[checked,radio])


  return (
    <Layout title={'All Products - best-offers'}>
        <div className='row' >
           <div className='side col-md-2' >
            <h4  className=' text-center'> Filter By Category  </h4>
            <div className='filter d-flex flex-column '>
            {categories?.map((Obj)=>(
              <Checkbox key={Obj._id} onChange={(e) =>{  handlefilter(e.target.checked,Obj._id)}}  >
                {Obj.name}
              </Checkbox>
            ))}
            </div>
            {/* Price filter */}
            <h4  className='text-center mt-4'> Filter By Prices </h4>
            <div className='radio d-flex flex-column '>
                  <Radio.Group onChange={e => setRadio(e.target.value)}>
                    {Prices?.map((p)=>(
                      <div key={p._id}>
                      <Radio value={p.array}>
                        {p.name}
                      </Radio>
                      </div>
                    ))}
                  </Radio.Group> 
            </div>
            <div className='d-flex flex-column '>
                  <button className='reset btn btn-danger' onClick={()=> window.location.reload( )} >RESET FILTERS</button>
            </div>
           </div>
           <div className='col-md-10' >
            {/* {JSON.stringify(radio,null,4)} */}
            <h1 className='text-center'> ALL Products </h1>
            <div className='d-flex flex-wrap'>
              {products?.map((Obj,i)=>(
                    
                    <div className="home-card m-2 " style={{width: '18rem'}} key={i}>
                    <img src={`/api/v1/product/get-photo/${Obj._id}`} className="card-img-top  h-50" alt={Obj.name} />
                    <div className="card-body">
                        <h5 className="card-title">{Obj.name}</h5>
                        <p className="card-text">{Obj.description.substring(0,30) }</p>
                        <p className="card-text">$ {Obj.price}  </p>
                        <button  className="btn btn-primary ms-1" onClick={() => navigate(`/product/${Obj.slug}`) }  >More Details</button>
                        <button  className="btn btn-secondary ms-1" onClick={()=>{

                          setCart([...cart,Obj])
                          localStorage.setItem('cart',JSON.stringify([...cart,Obj]))
                          toast.success('Item Added To cart')
                        }}   >Add to Cart</button>
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
           </div>
        </div>
    </Layout>
  )
}

export default Home