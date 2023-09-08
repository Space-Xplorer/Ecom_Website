import React from 'react'
import { useSearch } from '../context/Search'
import Layout from './../components/Layout/Layout'
import { useNavigate } from 'react-router-dom'
function SearchPage() {
    const [values,setValues]=useSearch()
    const navigate=useNavigate();
  return (
    <Layout title={'Search results'} >
        <div className='container'>
            <div className='text-center'>
                <h1>Search Results</h1>
                
                <h6>{values?.results.length<1 ? 'No Products Found': `Found ${values?.results.products.length}` }</h6>
                <div className='d-flex flex-wrap'>
              {values?.results?.products.map((Obj)=>(
                    
                    <div className="card m-2" style={{width: '18rem'}} >
                    <img src={`/api/v1/product/get-photo/${Obj._id}`} className="card-img-top  h-50" alt={Obj.name} />
                    <div className="card-body">
                        <h5 className="card-title">{Obj.name}</h5>
                        <p className="card-text">{Obj.description.substring(0,30) }</p>
                        <p className="card-text">{Obj.price} </p>
                        <button  className="btn btn-primary ms-1" onClick={() => navigate(`/product/${Obj.slug}`)}>More Details</button>
                        <button  className="btn btn-secondary ms-1">Add to Cart</button>
                    </div>
                </div>
                
                ))}

            </div>
            </div>
        </div>
    </Layout>
  )
}

export default SearchPage