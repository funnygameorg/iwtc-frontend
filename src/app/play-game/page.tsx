import React from 'react'
import Image from 'next/image'

const page = () => {
  return (

    <div className="grid h-screen place-items-center box-border">
      <div className="grid h-screen place-items-center box-border grid-cols-3 gap-4"  style={{width: '1600px', height:'1000px'}}>
                    <div className="flex-left">
                        <Image
                            className="h-full"
                            src={''}
                            width={'50'}
                            height={'10'}
                            alt={''}
                        />
                    </div>
                    <div className='flex items-center justify-center h-full w-11'>
                      <span>VS</span>
                    </div>
                    <div className="flex-right ">
                        <Image
                            className="h-full"
                            src={''}
                            width={'50'}
                            height={'10'}
                            alt={''}
                        />
                    </div>
      </div>
     </div>
    // <div className='grid place-items-center box-border h-32 w-32 p-4 border-4'>
    //   GamePage
    // </div>
  )
}

export default page