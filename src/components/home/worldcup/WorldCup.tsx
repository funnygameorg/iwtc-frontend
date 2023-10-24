'use client';
import { useQueryGetWorldCupAllList, worldCupAllList } from '@/services/WorldCupService';
import Image from 'next/image';
import React, { useEffect } from 'react';
import WorldCupList from './WorldCupList';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import InfiniteScroll from 'react-infinite-scroller';

const WorldCup = () => {
  const {data, fetchNextPage, isFetchingNextPage} = useInfiniteQuery(
    ['query'], 
    async ({pageParam = 0}) => await worldCupAllList(pageParam ,20, 'id'), 
    {
      getNextPageParam: (lastPage, allPages) => {
        console.log("lastPage ====>", lastPage);

        const currentPageNumber = lastPage.data.data.pageable.pageNumber;
        
        const totalPages = lastPage.data.data.totalPages;
        console.log("currentPageNumber", currentPageNumber);
        console.log("totalPages",totalPages );
        // 만약 현재 페이지 번호가 전체 페이지 수를 초과하면 더 이상 페이지를 불러오지 않습니다.
        if (currentPageNumber >= totalPages - 1) {
          return undefined; // undefined를 반환하면 더 이상 데이터를 불러오지 않음을 나타냅니다.
        }
  
        // 다음 페이지 번호를 반환합니다.
        console.log("currentPageNumber + 1;", currentPageNumber + 1)
        return currentPageNumber + 1;
      },
    }
  )

    return (
      <>
      <div className='overflow-auto flex'>
      {/* TODO: grid 적용 */}
        {data?.pages[0]?.data?.data &&
          <InfiniteScroll loadMore={() => fetchNextPage()} >
        {
          data?.pages[0]?.data?.data?.content?.map((items:any) => (
              <WorldCupList 
                wcList={items} 
                key={items.id} 
              />
          ))
          } 
      </InfiniteScroll>
          
        }
        </div>
      </>
    )
};

export default WorldCup;
