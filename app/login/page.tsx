"use client"
import React, { FormEvent, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { signIn, useSession } from "next-auth/react"
import { useRouter } from 'next/navigation'
import PulseLoader from 'react-spinners/PulseLoader'

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false)

  const router = useRouter();

  function handleGoogleSignIn() {
    signIn('google', { callbackUrl: '/app/today' }, { prompt: "login" })
  }

  function handleFacebookSignIn() {
    signIn('facebook', { callbackUrl: '/app/today' },{ prompt: "login" })
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true)
    setError('')
    try {
      const res = await signIn("credentials", {
        email: email,
        password: password,
        redirect: false,
      })

      if (!res?.error) {
        router.push('/app/today');
      } else {
        setError('The username or password you entered is incorrect!');
      }

    } catch (error) {
      setError('Something went Wrong please check console log')
      console.log( 'error is ',error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className=' mx-auto formContainer min-h-screen'>
      <form className='flex flex-col gap-8  w-full' onSubmit={handleSubmit}>
        <Image
          src={'/logo.png'}
          alt='logo'
          width={150}
          height={0}
        />
        <h1 className='font-extrabold text-[30px] ml-2'>Log in</h1>
        <div className='relative flex flex-col gap-3.5 font-bold border-b-[1px] pb-[30px]'>
          <button type='button' className='border-[1px] rounded-lg py-3 text-center text-[1.1rem] flex justify-center items-center gap-1.5'
            onClick={handleFacebookSignIn}
          >
            <Image src={'/facebook.svg'} alt='facebook' width={30} height={30} />
            <p>Continue with Facebook</p>
          </button>
          <button type='button' className='border-[1px] rounded-lg py-3 text-center text-[1.1rem] flex justify-center items-center gap-1.5'
            onClick={handleGoogleSignIn}
          >
            <Image src={'/google.svg'} alt='google' width={30} height={30} />
            <p>Continue with Google</p>
          </button>
          <p className='text-red-600 text-sm absolute top-full pt-1'>{error}</p>
        </div>

        <div className='flex flex-col mt-[-5px] gap-3'>
          <label htmlFor="login" className='border-[1px] flex flex-col text-[0.85rem] font-semibold rounded-lg p-2' > Email
            <input id='login' required type="email" placeholder='Enter your email...'
              className='text-[1rem]  font-normal' name='email' value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label htmlFor="password" className='border-[1px] flex flex-col text-[0.85rem] font-semibold rounded-lg p-2'>Password
            <input id='password' required type="password" placeholder='Enter your password...'
              className='text-[1rem] font-normal' name='password' value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <button disabled={(email && password) ? false : true} type='submit'
            className={` text-white font-bold ${(email && password) ? 'bg-blue-600 cursor-pointer' : 'cursor-not-allowed bg-blue-400'} text-[18px] py-3 rounded-lg`}>
            {loading ? (<PulseLoader color="#ffffff" size={10}/>) : (`Log in`)}
          </button>
        </div>
        <div>
          <p className='text-center mt-5 border-t-2 pt-5 text-sm'>Don't Have an Account?
            <Link className='ml-4 underline  text-blue-700' href={'/signup'}>Sign Up</Link>
          </p>
        </div>
      </form>
      <img className='illustration' src='/productive.svg' />
    </main>
  )
}

export default Login