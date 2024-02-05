import { dehydrate, Hydrate } from '@tanstack/react-query';
import getQueryClient from '@/app/getQueryClient';
import { worldCupAllList } from '@/services/WorldCupService';
import WorldCup from './worldcup/WorldCupWrapper';
import { mappingMediaFile2 } from '@/utils/common';

// export default async function HydratedWCList() {
//     const queryClient = getQueryClient();
//     await queryClient.prefetchInfiniteQuery(
//         ['wclist', 'id', undefined, 'ALL'],
//         async () => await worldCupAllList(0, 20, 'id', undefined, 'ALL')
//         // {
//         //     staleTime: 5 * 60 * 1000, // 데이터가 오래된 것으로 간주되기 전까지의 시간 (예: 5분)
//         //     cacheTime: 24 * 60 * 60 * 1000, // 캐시에서 데이터가 유지되는 시간 (예: 24시간)
//         //     // 여기에 추가적인 옵션을 넣을 수 있습니다.
//         // }
//     );
//     // queryClient.setQueryData(queryKey, (data) => ({
//     //   ...data,
//     //   pageParams: [],
//     // }));
//     const dehydratedState = JSON.parse(JSON.stringify(dehydrate(queryClient)));
//     const newlist = await mappingMediaFile2(dehydratedState.queries[0]?.state.data.pages[0].list);
//     if (dehydratedState.queries[0]) {
//         dehydratedState.queries[0].state.data.pages[0].list = newlist;
//         dehydratedState.queries[0].state.data.pageParams[0] = 0;
//     }
//     // dehydratedState.queries[0].state.data.pages[0].list = newlist;
//     // dehydratedState.queries[0].state.data.pageParams[0] = 0;
//     return (
//         <Hydrate state={dehydratedState}>
//             <WorldCup />
//         </Hydrate>
//     );
// }

export default async function HydratedWCList() {
    const queryClient = getQueryClient();

    // worldCupAllList 데이터를 프리페치하고, 그 결과에 대해 mappingMediaFile2 API를 호출
    await queryClient.prefetchInfiniteQuery(
        ['wclist', 'id', undefined, 'ALL'],
        async ({ pageParam = 0 }) => {
            // worldCupAllList API 호출
            const data = await worldCupAllList(pageParam, 20, 'id', undefined, 'ALL');
            // mappingMediaFile2 API 호출을 통한 데이터 변환
            const transformedData = await mappingMediaFile2(data.list);
            return {
                ...data,
                list: transformedData,
            };
        }
        // 필요한 경우 여기에 staleTime, cacheTime 등의 옵션을 추가
    );

    const dehydratedState = dehydrate(queryClient);

    return (
        <Hydrate state={dehydratedState}>
            <WorldCup />
        </Hydrate>
    );
}
