"use client"

import React, { FormEvent, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { signIn } from "next-auth/react"
import PulseLoader from 'react-spinners/PulseLoader'


function SignUp() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('')
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false)

  function handleGoogleSignIn() {
    signIn('google', { callbackUrl: 'http://localhost:3000/app/today' })
  }

  function handleFacebookSignIn() {
    signIn('facebook', { callbackUrl: 'http://localhost:3000/app/today' })
  }


  async function handleRegisterSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true)

    try {
      if (!(password1 == password2)) {
        setError("Passwords do not match")
        return
      }

      const userData = {
        name: name,
        email: email,
        password: password1,
      }

      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (res.ok) {
        const responseText = await res.json();
        if (responseText.error) {
          setError(responseText.error)
          return;
        } else {
          const res = await signIn("credentials", {
            email: email,
            password: password1,
            callbackUrl: 'http://localhost:3000/app/today'
          })
        }
      }
    } catch (error) {
      console.error("Error sending form data:", error);
      setError(`Something went wrong please check the console ${error}`)
    } finally {
      setLoading(false);
    }
  }


  return (
    <main className=' mx-auto formContainer min-h-screen mb-4'>
      <form className='flex flex-col gap-5  w-full' onSubmit={handleRegisterSubmit} >
        <Image
          src={'/logo.png'}
          alt='logo'
          width={150}
          height={0}
        />
        <h1 className='font-extrabold text-[30px] ml-2'>Sign Up</h1>
        <div className='relative flex flex-col gap-3 font-bold border-b-[1px] pb-[18px]'>
          <button className='border-[1px] rounded-lg py-3 text-center text-[1.1rem] flex justify-center items-center gap-1.5' type='button' onClick={handleFacebookSignIn}>
            <Image src={'/facebook.svg'} alt='facebook' width={30} height={30} />
            <p>Continue with Facebook</p>
          </button>
          <button className='border-[1px] rounded-lg py-3 text-center text-[1.1rem] flex justify-center items-center gap-1.5' type='button' onClick={handleGoogleSignIn}>
            <Image src={'/google.svg'} alt='google' width={30} height={30} />
            <p>Continue with Google</p>
          </button>
        </div>

        <div className='flex flex-col relative gap-3'>
          <p className='text-red-600 bottom-full  text-sm absolute'>{error}</p>
          <label htmlFor="name" className='border-[1px] mt-1 flex flex-col text-[0.85rem] font-semibold rounded-lg p-2' > Name
            <input id='name' type="text" placeholder='Enter your Name..' className='text-[1rem] font-normal'
              required value={name} onChange={(e) => setName(e.target.value)} name='name' />
          </label>
          <label htmlFor="email" className='border-[1px] flex flex-col text-[0.85rem] font-semibold rounded-lg p-2' > Email
            <input id='email' type="email" placeholder='Enter your email...' className='text-[1rem]  font-normal' required
              value={email} onChange={(e) => setEmail(e.target.value)} name='email' />
          </label>
          <label htmlFor="password1" className='border-[1px] flex flex-col text-[0.85rem] font-semibold rounded-lg p-2'>Password
            <input id='password1' type="password" placeholder='Enter your password...'
              className='text-[1rem] font-normal' required value={password1} onChange={(e) => setPassword1(e.target.value)} />
          </label>
          <label htmlFor="password2" className='border-[1px] flex flex-col text-[0.85rem] font-semibold rounded-lg p-2'>Repeat Password
            <input id='password2' type="password" placeholder=' Re enter Enter your password...' className='text-[1rem] font-normal'
              required name='password' value={password2} onChange={(e) => setPassword2(e.target.value)} />
          </label>
          <button type='submit' className='bg-blue-600 text-white font-bold text-[18px] py-3 rounded-lg'>
            {loading ? (<PulseLoader color="#ffffff" size={10} />) : (`Sign up with Email`)}
          </button>
        </div>
        <div>
          <p className='text-center pt-3 border-t-2  text-sm'>Already Registered?
            <Link className='ml-3 underline  text-blue-700' href={'/login'}>Go to Login</Link>
          </p>
        </div>
      </form>
      <img className='illustration' src='/productive.svg' />
    </main>
  )
}

export default SignUp
