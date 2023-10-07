import Image from 'next/image'
import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';

function loading() {
  return (
    <div className='h-screen flex justify-center items-center '>
      <div className='flex -mt-5  items-center gap-5'>
        <Image src={'/logoLoader.png'} width={75} height={75} alt='' />
        <CircularProgress size={25} />
      </div>
    </div>
  )
}

export default loading
