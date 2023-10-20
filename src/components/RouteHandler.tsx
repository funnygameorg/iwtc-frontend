'use client';
import React, { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { getAccessToken } from '@/utils/TokenManager';
const RouteHandler = () => {
    const router = useRouter();
    const pathname = usePathname();

    // useEffect(() => {
    //   if(!getAccessToken()){
    //     router.push('/');
    //   }
    //   // if(getAccessToken())
    //   // 쿠키 체크!
    //   // 있으면
    //   // 없으면 login 페이지 redirect
    // }, [pathname, router])

    return null;
};

export default RouteHandler;
