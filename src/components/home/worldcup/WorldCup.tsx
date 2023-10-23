'use client';
import { useQueryGetWorldCupAllList, worldCupAllList } from '@/services/WorldCupService';
import Image from 'next/image';
import React, { useEffect } from 'react';
import WorldCupList from './WorldCupList';
import { useQuery } from '@tanstack/react-query';

const WorldCup = () => {
    const wcList = useQueryGetWorldCupAllList(1, 1, 1);
    return <WorldCupList />;
};

export default WorldCup;
