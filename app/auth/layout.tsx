import React from 'react'

const layout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className='h-full flex items-center justify-center bg-gradient-to-r from-red-400 via-red-500 to-indigo-600 '>
        {children}
    </div>
  )
}

export default layout