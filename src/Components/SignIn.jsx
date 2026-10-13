import { signInWithPopup, signOut } from 'firebase/auth'
import React from 'react'
import { auth, provider } from '../config/firebaseAuth'
import { useDispatch, useSelector } from 'react-redux';
import { addUserData, removeUserData } from '../utilis/authSlice';
import { useNavigate } from 'react-router-dom';
import { toggleLogin } from '../utilis/toogleSlice';

function SignIn() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.authSlice.userData)


  async function handleAuth(){
      let data = await signInWithPopup(auth,provider);
      const userData = {
        name : data.user.displayName,
        photo : data.user.photoURL
      }
      dispatch(addUserData(userData));
      dispatch(toggleLogin());
      navigate("/cart")
    }

    async function handleLogout(){
        await signOut(auth)
        dispatch(removeUserData());
        dispatch(toggleLogin());
    }

  return (
    <>
    {!userData ? (
      <> 
      <button onClick={handleAuth} className=' cursor-pointer my-5 w-[60%] text-2xl p-5 bg-[#fc8019] text-white'>Google Login</button>
      </>
    ) : (
      <>
        <h1>{userData.name}</h1>
        <img className='w-20 h-20 rounded-full' src={userData.photo} alt={userData.name} />
        <button onClick={handleLogout} className=' cursor-pointer my-5 w-[60%] text-2xl p-5 bg-[#fc8019] text-white'>Logout</button>
      </>
    )}
    </>
  )
}

export default SignIn