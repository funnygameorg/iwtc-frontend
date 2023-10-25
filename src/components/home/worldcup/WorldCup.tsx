'use client';
import { worldCupAllList } from '@/services/WorldCupService';
import React, { useEffect } from 'react';
import WorldCupList from './WorldCupList';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import InfiniteScroll from 'react-infinite-scroller';

const WorldCup = () => {
    const { data, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery(
        ['wclist'],
        async ({ pageParam }) => {
          return await worldCupAllList(pageParam, 20, 'id')}
          ,
        {
            getNextPageParam: (lastPage, allPages) => {
                const currentPageNumber = lastPage.pageable.pageNumber;

                const totalPages = lastPage.totalCount;
                // 만약 현재 페이지 번호가 전체 페이지 수를 초과하면 더 이상 페이지를 불러오지 않습니다.
                if (currentPageNumber >= totalPages - 1 || lastPage.list.length < 1) {
                    return undefined; // undefined를 반환하면 더 이상 데이터를 불러오지 않음을 나타냅니다.
                }
                return currentPageNumber + 1;
            },
            staleTime: 3000,
            // cacheTime: 60 * 1000
        }
    );
    return (
        <>
        {/* {!isFetchingNextPage &&  */}
            <InfiniteScroll loadMore={() => fetchNextPage()} hasMore={hasNextPage}>
                <div className="flex flex-wrap justify-center mt-10overflow-auto">
                    {data?.pages.map((page: any) => {
                        return page.list.map((items: any) => {
                            return <WorldCupList wcList={items} key={items.id} />;
                        });
                    })}
                </div>
            </InfiniteScroll>
        {/* } */}
        </>
    );
};

export default WorldCup;
