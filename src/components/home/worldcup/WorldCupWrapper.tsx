'use client';
import { worldCupAllList } from '@/services/WorldCupService';
import React, { useEffect, useState } from 'react';
import WorldCupList from './WorldCupList';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import InfiniteScroll from 'react-infinite-scroller';
import SearchBar from '@/components/search';
import RankSelect from '@/components/button/RankSelect';
import Order from '@/components/dropdown/Order';
import { mappingMediaFile, mappingMediaFile2 } from '@/utils/common';

const WorldCupWrapper = () => {
    const [keyword, setKeyword] = useState<undefined | string>(undefined);
    const [order, setOrder] = useState<string>('id');
    const [rank, setRank] = useState<string>('ALL');

    const { data, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery(
        ['wclist', order, keyword, rank],
        async ({ pageParam = 0 }) => {
            const response: any = await worldCupAllList(pageParam, 20, order, keyword, rank);
            if (response) {
                const newlist = await mappingMediaFile2(response.list);
                response.list = newlist;
                return response;
            }
        },
        {
            getNextPageParam: (lastPage, allPages) => {
                const currentPageNumber = lastPage.pageable.pageNumber;

                const totalPages = lastPage.totalCount;
                // 만약 현재 페이지 번호가 전체 페이지 수를 초과하면 더 이상 페이지를 불러오지 않습니다.

                if (
                    currentPageNumber === lastPage.totalPage - 1 ||
                    lastPage.list.length < 1 ||
                    lastPage.list.length < lastPage.pageable.pageSize
                ) {
                    return undefined; // undefined를 반환하면 더 이상 데이터를 불러오지 않음을 나타냅니다.
                }
                return currentPageNumber + 1;
            },
            staleTime: 3000,
            // enabled: false
            // cacheTime: 60 * 1000
        }
    );
    return (
        <>
            <div className="flex w-full h-32 items-center">
                <SearchBar setKeyword={setKeyword} />
                <RankSelect setRank={setRank} />
                <Order setOrder={setOrder} />
            </div>
            <>
                {/* {!isFetchingNextPage &&  */}
                <InfiniteScroll loadMore={() => fetchNextPage()} hasMore={hasNextPage}>
                    <div className="flex flex-wrap justify-center mt-10overflow-auto">
                        {data?.pages.map((page: any) => {
                            return page.list.map((items: any, idx: number) => {
                                return <WorldCupList wcList={items} key={idx} />;
                            });
                        })}
                    </div>
                </InfiniteScroll>
                {/* } */}
            </>
        </>
    );
};

export default WorldCupWrapper;
