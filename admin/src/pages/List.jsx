import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { toast } from 'react-toastify';

const List = ({token}) => {
  const [list,setList]=useState([])
  const fetchlist=async()=>{
    try {
      const response=await axios.get('https://mitli.in/api/product/list')
      if (response.data.success) {
        setList(response.data.products)
      }else{
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }

  }

  const removeProduct=async(id)=>{
   try {
    const response=await axios.post( 'https://mitli.in/api/product/remove',{id},{headers:{token}})
    if (response.data.success) {
      toast.success(response.data.message)
      await fetchlist()
    }else{
      toast.error(response.data.message)
    }
   } catch (error) {
    console.log(error)
    toast.error(error.message)
   }
  }

  useEffect(()=>{
   fetchlist()
  },[])
  return (
    <>
    <p className='mb-2'>All Product List</p>
    <div className='flex flex-col gap-2'>
      {/*List table title */}
      <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center px-2 py-1 border bg-gray-100 text-sm'>
        <b>Image</b>
        <b>Name</b>
        <b>Category</b>
        <b>Price</b>
        <b className='text-center'>Action</b>
      </div>
      {/*------product list------- */}

      {
        list.map((item,index)=>(
          <div className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 px-2 py-1 border text-sm' key={index}>
         <img className='w-12' src={item.image[0]} alt="" />
         <p>{item.name}</p>
         <p>{item.category}</p>
         <p>{item.discountedprice}</p>
          <p onClick={()=>removeProduct(item._id)} className='text-right md:text-center cursor-pointer text-lg'>X</p>
          </div>

        ))
      }
    </div>
      
    </>
  );
}

export default List;
