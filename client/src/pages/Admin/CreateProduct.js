import React,{useState,useEffect} from 'react'
import Layout from './../../components/Layout/Layout';
import AdminMenu from './../../components/Layout/AdminMenu';
import  axios  from 'axios';
import  toast  from 'react-hot-toast';
import {Select} from 'antd'
import { useNavigate } from 'react-router-dom';
const {Option}=Select
function CreateProduct() {
  const Navigate=useNavigate();
  const [categories,setCategories]=useState([])
  const [category,setCategory]=useState("")
  const [photo,setPhoto]=useState("")
  const [name,setName]=useState("")
  const [description,setDescription]=useState("")
  const [price,setPrice]=useState("")
  const [quantity,setQuantity]=useState("")
  const [shipping,setShipping]=useState("")
  

   //get all category
   const getAllCategory=async()=>{
    try{
     
      const {data}= await axios.get(`/api/v1/category/categories`)

      if(data?.success){
        setCategories(data?.categories);
      } 
    }catch(error){
      console.log(error)
      toast.error('Something Went wrong in getting category')
    }
}

useEffect(()=>{
  getAllCategory();
},[])


//create product function
const handleCreate= async (e)=>{
e.preventDefault();

try{
  const productData= new FormData();
  productData.append("name",name)
  productData.append("description",description)
  productData.append("price",price)
  productData.append("quantity",quantity)
  productData.append("photo",photo)
  productData.append("category",category)
  productData.append("shipping",shipping)
  const {data} =axios.post('/api/v1/product/create-product',productData)

  if(data?.sucess){
    toast.error(data?.message)
  }else{
    toast.success(data?.message);
    Navigate('/dashboard/admin/products')
    
  }
}
catch(error){
  console.log(error);
  toast.error('something went wrong')
}
}
  return (
    <Layout title={'Dashboard-create-product'}>
      <div className='container-fluid m-3 p-3'>
        <div className='row'>
            <div className='col-md-3'>
              <AdminMenu/>
            </div>
            <div className='col-md-9'>
            <h1>create Product</h1>
            <div className='m-1 w-75'>
              <Select bordered={false} 
              placeholder="Select a Category" 
              size='large' 
              showSearch 
              className='form-select mb-3' onChange={(value)=>{setCategory(value)}} >
                {categories?.map((Obj)=>{
                  return <Option key={Obj._id} value={Obj._id} >{Obj.name}</Option>
                })}
              </Select>
              {/* Photo */}
             <div className='mb-3'>
                <label  className='btn btn-outline-secondary col-md-12'>
                  {photo ? photo.name: "Upload Photo"}  
                <input type='file' name='photo' accept='image/*' onChange={(e)=>{
                  setPhoto(e.target.files[0])
                  }} hidden />
                </label> 
             </div>
            <div className='mb-3'>
                  {photo && (
                    <div className='text-center'>
                      <img src={URL.createObjectURL(photo)} alt='product-photo' height={'200px'} 
                      className='img img-responsive'></img>
                    </div>
                  )}
            </div>
            {/* Name */}
            <div className='mb-3'>
              <input type='text' 
              value={name} 
              placeholder='Enter a Name'
              className='form-control'
              onChange={(e)=> setName(e.target.value)} ></input>
            </div>
            {/* description */}
            <div className='mb-3'>
             
              <textarea type='text' 
              value={description} 
              placeholder='Enter a Description'
              className='form-control'
              onChange={(e)=> setDescription(e.target.value)} />
              
            </div>
            {/* Quantity */}
            <div className='mb-3'>
              <input type='number' 
              value={quantity} 
              placeholder='Enter Quantity'
              className='form-control'
              onChange={(e)=> setQuantity(e.target.value)} />
            </div>
            {/* Price */}
            <div className='mb-3'>
              <input type='number' 
              value={price} 
              placeholder='Enter a Price'
              className='form-control'
              onChange={(e)=> setPrice(e.target.value)} />
            </div>
            {/* Shipping */}
            <div className='mb-3'>
            <Select bordered={false} 
              placeholder="Select shipping" 
              size='large' 
              showSearch 
              className='form-select mb-3'
              onChange={(value)=>{setShipping(value)}} >
                <Option value="0">No</Option>
                <Option value="1">Yes</Option>
              </Select>
            </div>
            <div className='mb-3'>
                    <button className='btn btn-primary' onClick={handleCreate}>CREATE PRODUCT</button>
            </div>
            </div>
            </div>
          </div>
      </div> 
    </Layout>
  )
}

export default CreateProduct