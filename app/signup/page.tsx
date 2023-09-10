"use client"

import React, {FormEvent} from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { signIn } from "next-auth/react"

async function handleRegisterSubmit(e: FormEvent) {
  e.preventDefault();
  const formData = new FormData(e.currentTarget as HTMLFormElement);

  const name = formData.get('name');
  const email = formData.get('email');
  const password = formData.get('password');

  const userData = {
    name:name,
    email: email,
    password: password,
  }

  try {
    const res = await fetch('http://localhost:3000/api/auth/register', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });


    if (res.ok) {
      const responseText = await res.json();
      if (responseText.error) {
        console.log(responseText);
        return;
      } else {
        console.log('Sucess', responseText);
        try {
          const res = await signIn("credentials", {
            email : email,
            password : password,
            callbackUrl: 'http://localhost:3000/dashboard'
          })
          console.log(res);
        } catch (error) {
          console.log(error)
        }
      }
    }
  } catch (error) {
    console.error("Error sending form data:", error);
  }
}




function SignUp() {

    function handleGoogleSignIn() {
      signIn('google', { callbackUrl: 'http://localhost:3000/dashboard' })
    }

    function handleFacebookSignIn() {
      signIn('facebook', { callbackUrl: 'http://localhost:3000/dashboard' })
    }

  return (
    <main className=' mx-auto formContainer min-h-screen'>
      <form className='flex flex-col gap-5  w-full' onSubmit={handleRegisterSubmit} >
        <Image
          src={'/logo.png'}
          alt='logo'
          width={150}
          height={0}
        />
        <h1 className='font-extrabold text-[30px] ml-2'>Sign Up</h1>
        <div className='flex flex-col gap-3 font-bold border-b-[1px] pb-[13px]'>
          <button className='border-[1px] rounded-lg py-3 text-center text-[1.1rem] flex justify-center items-center gap-1.5' type='button' onClick={handleFacebookSignIn}>
            <Image src={'/facebook.svg'} alt='facebook' width={30} height={30} />
            <p>Continue with Facebook</p>
          </button>
          <button className='border-[1px] rounded-lg py-3 text-center text-[1.1rem] flex justify-center items-center gap-1.5' type='button' onClick={handleGoogleSignIn}>
            <Image src={'/google.svg'} alt='google' width={30} height={30} />
            <p>Continue with Google</p>
          </button>
        </div>

        <div className='flex flex-col mt-[-8px] gap-3'>
        <label htmlFor="name" className='border-[1px] flex flex-col text-[0.85rem] font-semibold rounded-lg p-2' > Name
            <input id='name' type="text" placeholder='Enter your Name..' className='text-[1rem]  font-normal'  name='name'/>
          </label>
          <label htmlFor="email" className='border-[1px] flex flex-col text-[0.85rem] font-semibold rounded-lg p-2' > Email
            <input id='email' type="email" placeholder='Enter your email...' className='text-[1rem]  font-normal'  name='email'/>
          </label>
          <label htmlFor="password1" className='border-[1px] flex flex-col text-[0.85rem] font-semibold rounded-lg p-2'>Password
            <input id='password1' type="password" placeholder='Enter your password...' className='text-[1rem] font-normal' />
          </label>
          <label htmlFor="password2" className='border-[1px] flex flex-col text-[0.85rem] font-semibold rounded-lg p-2'>Password
            <input id='password2' type="password" placeholder=' Re enter Enter your password...' className='text-[1rem] font-normal' name='password' />
          </label>
          <button type='submit' className='bg-blue-600 text-white font-bold text-[18px] py-3 rounded-lg'>
            Sign up with Email
          </button>
        </div>
        <div>
          <p className='text-center mt-5 border-t-2 pt-5 text-sm'>Already Registered?
            <Link className='ml-3 underline  text-blue-700' href={'/login'}>Go to Login</Link>
          </p>
        </div>
      </form>
      <img className='illustration' src='/productive.svg' />
    </main>
  )
}

export default SignUp
