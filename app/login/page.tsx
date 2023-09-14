"use client"
import React, { FormEvent } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { signIn,useSession } from "next-auth/react"
import { useRouter } from 'next/navigation'


function Login() {
  const session = useSession();
  const router = useRouter();

  function handleGoogleSignIn() {
    signIn('google', { callbackUrl: 'http://localhost:3000/app/today' })
  }

  function handleFacebookSignIn() {
    signIn('facebook', { callbackUrl: 'http://localhost:3000/app/today' })
  }

  async function handleSubmit(e: FormEvent) {

    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const email = formData.get('email');
    const password = formData.get('password');

    e.preventDefault();
    try {
      const res = await signIn("credentials", {
        email : email,
        password : password,
        redirect: false,
      })
      if(!res?.error){
        console.log('sucess')
        router.replace('/app/today')
      }
    } catch (error) {
      console.log(error)
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
        <div className='flex flex-col gap-3.5 font-bold border-b-[1px] pb-[30px]'>
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
        </div>

        <div className='flex flex-col mt-[-5px] gap-3'>
          <label htmlFor="login" className='border-[1px] flex flex-col text-[0.85rem] font-semibold rounded-lg p-2' > Email
            <input id='login' type="text" placeholder='Enter your email...' className='text-[1rem]  font-normal' name='email' />
          </label>
          <label htmlFor="password" className='border-[1px] flex flex-col text-[0.85rem] font-semibold rounded-lg p-2'>Password
            <input id='password' type="password" placeholder='Enter your password...' className='text-[1rem] font-normal' name='password' />
          </label>
          <button type='submit' className='bg-blue-600 text-white font-bold text-[18px] py-3 rounded-lg'>
            Log in
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
