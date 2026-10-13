import React, { useContext } from 'react'
import { cartContext } from '../context/contextApi';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, deleteCart } from '../utilis/cartSlice';
import toast from 'react-hot-toast';
import veg from "../assets/veg.jpeg"
import nonVeg from "../assets/nonVeg.jpeg"

function Cart() {
    const navigate = useNavigate()
    const cartData = useSelector((state) => state.cartSlice.cartItems);
    const dispatch = useDispatch()
    let totalPrice = 0;
    for(let i = 0; i<cartData.length; i++){
        totalPrice += Number(cartData[i].price.replace("₹", ""));
    }
    
    function handleRemoveFromCart(i){
        let newArr = [...cartData];
        newArr.splice(i,1);
        dispatch(deleteCart(newArr))
        toast.success("Food removed");
    }

    const userData = useSelector((state) => state.authSlice.userData)
    
    function handleClearCart(){
        dispatch(clearCart());
        toast.success("cart is cleared");
    } 

    function handlePlaceOrder(){
        if(!userData){
        toast.error("please login");
        navigate("/signin")
        return
        }
        toast.success("order placed");
    }

    if(cartData.length === 0){
        return <div className='w-full'>
        <div className='w-[50%] mx-auto mt-20 text-center'>
        <h1 className='text-2xl font-bold'>No orders yet</h1>
        <Link to="/" className= "bg-green-500 text-white p-2 px-4 rounded-lg inline-block mt-6">Order From Here</Link>  
        </div>
        </div>
    }

  return (
    <div className='w-full'>
    <div className='w-[800px] mx-auto pt-8'>
    {/* restaurant details */}
     <div className="mb-6 flex items-center gap-4">
      <img
        className="w-20 h-20 object-cover rounded-full shadow-md"
        src={cartData[0].restaurantImage}
        alt={cartData[0].restaurantName}
      />
      <div>
        <h2 className="text-2xl font-bold">
          {cartData[0].restaurantName}
        </h2>
        <p className='text-gray-500 text-sm'>Items in your cart</p>
      </div>
    </div>
    <hr className='border-gray-300 mb-4' />

    {/* cart Items */}
    <div>
    {
        cartData.map((data,i)=>(
            <div key={i}>
                <div className='flex justify-between py-5'>
                <div className='w-[65%]'>
                    <img className='w-5 h-5 mb-2' src={data.type === "veg" ? veg : nonVeg} alt="" />
                    <h3 className='font-bold text-lg'>{data.name}</h3>
                    <p className='font-semibold mt-1'>{data.price}</p>
                    <p className='text-gray-500 text-sm mt-2'>{data.description}</p>
                </div>
                 
                 <div className='relative w-[130px] h-[110px] bg-gray-200 rounded-xl overflow-hidden shadow-sm shrink-0'>
                <img className='w-full h-full object-cover rounded-xl' src={data.image} alt="" />
                <button onClick={()=> handleRemoveFromCart(i)} className='absolute bottom-2 left-1/2 -translate-x-1/2 bg-white text-red-600 font-bold border border-gray-200 px-4 py-1 text-sm rounded-lg shadow-md hover:bg-gray-100 cursor-pointer'>Remove</button>
                </div>
            </div>
            {i !== cartData.length - 1 && <hr className='border-gray-200' />}
          </div>
        ))
    }
    </div>

    <hr className='my-4 border-gray-300' />
    <h1 className='text-xl font-bold'>Total: ₹{totalPrice}</h1>
    
    <div className='flex justify-between pb-10'>
     <button onClick={handleClearCart} className='p-3 px-6 bg-red-500 text-white font-semibold rounded-lg my-7 cursor-pointer'>Clear Cart</button>
     <button onClick={handlePlaceOrder} className='p-3 px-6 bg-green-600 text-white font-semibold rounded-lg my-7 cursor-pointer'>Place Order</button>  
    </div>
    </div>
    </div>
  )
}

export default Cart;