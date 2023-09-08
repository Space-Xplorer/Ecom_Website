import React,{useEffect,useState} from 'react'
import Layout from './../../components/Layout/Layout';
import AdminMenu from './../../components/Layout/AdminMenu';
import toast from "react-hot-toast";
import axios  from 'axios';
import CategoryForm from '../../components/Form/CategoryForm';
import { Button, Modal } from 'antd';

function CreateCategory() {

  const [categories,setCategories]=useState([])
  const [name,setName]=useState("");
  const [visible,isVisible]=useState(false);
  const [selected,setSelected]=useState(null)
  const [updateName,setUpdateName]=useState('')

//update-categort
const handleUpdate= async (e)=>{
  e.preventDefault()
  try{
    const {data}=await axios.put(`/api/v1/category/update-category/${selected.slug}`,{name:updateName});
    if(data.success){
      toast.success(data.message);
      setSelected(null);
      setUpdateName('')
      isVisible(false)
      getAllCategory()
    }
    else{
      toast.error(data.message)
    }
  }
  catch(error){
    console.log(error);
    toast.error('Something went Wrong')
  }
}

//delete-category
const handleDelete= async (pslug)=>{

  try{
    const {data}=await axios.delete(`/api/v1/category/delete-category/${pslug}`,);
    if(data.success){
      toast.success(data.message);
      getAllCategory()
    }
    else{
      toast.error(data.message)
    }
  }
  catch(error){
    console.log(error);
    toast.error('Something went Wrong')
  }
}
  //form-submit
  const handleSubmit= async(e)=>{
    e.preventDefault();
    try{
      const dataObj =await axios.post('/api/v1/category/create-category',{name});
      if(dataObj?.success){
          toast.success(`${dataObj.category.name} is created`)
          getAllCategory();
        }
      else
          toast.error(dataObj.message);
    }
    catch(error)
    {
      console.log(error)
      toast.error("Something went wrong in input form")
    }
  }

  //get all cat
  const getAllCategory=async()=>{
      try{
       
        const {data}= await axios.get(`${process.env.REACT_APP_API}/api/v1/category/categories`)

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
  return (
    <Layout title={'Dashboard-create-category'}>
      <div className='container-fluid m-3 p-3'>
        <div className='row'>
            <div className='col-md-3'>
              <AdminMenu/>
            </div>
            <div className='col-md-9'>
            <h1>Manage Category</h1>
            <div className='p-3 w-50'>
            <CategoryForm handleSubmit={handleSubmit} value={name} setValue= {setName} />
            </div>
            <div className='w-75'>
            <table className="table">
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>
  {categories?.map((Obj)=> (
  <>
    <tr key={Obj._id}>
      <td>{Obj.name}</td>
      <td>
          <button className='btn btn-primary ms-2' onClick={()=>{
            isVisible(true);
            setUpdateName(Obj.name)
            setSelected(Obj)
            }
          }>Edit</button>
          <button className='btn btn-danger ms-2' onClick={()=>handleDelete(Obj.slug)} >Delete</button>
      </td>
    </tr>
  </>
  ) )}
  </tbody>
            </table>

            </div>
            <Modal onCancel={()=> isVisible(false)} footer={null} open={visible}>
              <CategoryForm value={updateName} setValue={setUpdateName} handleSubmit={handleUpdate} />
            </Modal>
            </div>
        </div>
      </div>
    </Layout>
  )
}

export default CreateCategory