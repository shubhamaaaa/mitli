import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios'

import { toast } from 'react-toastify'


const Orders = ({ token }) => {
  const [orders, setOrders] = useState([])
  const fetchAllOrders = async () => {
    if (!token) {
      return null
    }
    try {
      const response = await axios.post('http://localhost:3000/api/order/list', {}, { headers: { token } })
      if (response.data.success) {
        setOrders(response.data.orders.reverse())
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }

  }

  const statusHandler = async (event, orderId, referralCode) => {
    console.log(referralCode);
    try {
      const newstatus = event.target.value;

      const response = await axios.post('http://localhost:3000/api/order/status', { orderId, status: newstatus }, { headers: { token } })

      if (response.data.success) {

        const referralresponse = await axios.post('http://localhost:3000/api/order/referralUpated', { referralCode, status: newstatus }, { headers: { token } })
        if (referralresponse.data.success) {
          await fetchAllOrders();
        }
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchAllOrders()
  }, [token])
  return (
    <div>
      <h3>Order Page</h3>
      <div>
        {
          orders.map((order, index) => (
            <div className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3  md:my-4 text-xs sm:text-sm text-gray-700 ' key={index}>
              <img className='w-12' src='https://img.icons8.com/?size=100&id=8382&format=png&color=000000' alt="" />
              <div>
                <div>
                  {order.items.map((item, index) => {
                    if (index === order.items.length - 1) {
                      return <p className='py-0.5' key={index}>{item.name} x {item.quantity} <span> {item.size} </span></p>
                    } else {
                      return <p className='py-0.5' key={index}>{item.name} x {item.quantity} <span> {item.size} </span> ,</p>
                    }
                  })}
                </div>
                <p className='mt-3 mb-2 font-medium'>{order.address.firstName + " " + order.address.lastName}</p>
                <div>
                  <p>{order.address.street + ","}</p>
                  <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode}</p>
                </div>
                <p>{order.address.phone}</p>
              </div>
              <div>
                <p className='text-sm sm:text-[15px]'>Items : {order.items.length}</p>
                <p className='mt-3'>Method : {order.paymentMethod}</p>
                <p>Payment : {order.payment ? 'Done' : 'Pending'}</p>
                <p>Date : {new Date(order.date).toLocaleDateString()}</p>
              </div>
              <p className='text-sm sm:text-[15px]'>₹{order.amount}</p>
              <select
                onChange={(event) => statusHandler(event, order._id, order.referralCode)}
                value={order.status}
                className="p-2 font-semibold"
                disabled={order.status === "Delivered"}  // Disable when status is "Delivered"
              >
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>

            </div>
          ))


        }
      </div>

    </div>
  );
}

export default Orders;
