import React from 'react';
import Image from 'next/image';

const page = () => {
    return (
        <div className="grid h-screen place-items-center box-border">
            <div className="flex p-4 text-white shadow" style={{ width: '1600px', height: '1000px' }}>
                <div className="flex items-start">
                    <Image
                        className="h-full w-full"
                        src={'/images/default.png'}
                        width={'750'}
                        height={'500'}
                        alt={''}
                    />
                </div>
                <div className="flex items-center justify-center ">
                    <span>VS</span>
                </div>
                <div className="flex items-end">
                    <Image
                        className="h-full w-full"
                        src={'/images/default.png'}
                        width={'750'}
                        height={'500'}
                        alt={''}
                    />
                </div>
            </div>
        </div>
        // <div className='grid place-items-center box-border h-32 w-32 p-4 border-4'>
        //   GamePage
        // </div>
    );
};

export default page;
// public/images/default.png
