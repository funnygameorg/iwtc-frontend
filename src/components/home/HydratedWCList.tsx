import { dehydrate, Hydrate } from '@tanstack/react-query';
import getQueryClient from '@/app/getQueryClient';
import { worldCupAllList } from '@/services/WorldCupService';
import WorldCup from './worldcup/WorldCupWrapper';
import RankSelect from '../button/RankSelect';
import SearchBar from '../search';
import Order from '../dropdown/Order';
import { mappingMediaFile2 } from '@/utils/common';
import { getAccessToken } from '@/utils/TokenManager';
import { userMeSummary } from '@/services/MemberService';
import { getUserInfo } from '@/stores/LocalStore';

export default async function HydratedWCList() {
    const queryClient = getQueryClient();
    await queryClient.prefetchInfiniteQuery(
        ['wclist', 'id', undefined, 'ALL'],
        async () => await worldCupAllList(0, 20, 'id', undefined, 'ALL')
        // {
        //     staleTime: 5 * 60 * 1000, // 데이터가 오래된 것으로 간주되기 전까지의 시간 (예: 5분)
        //     cacheTime: 24 * 60 * 60 * 1000, // 캐시에서 데이터가 유지되는 시간 (예: 24시간)
        //     // 여기에 추가적인 옵션을 넣을 수 있습니다.
        // }
    );
    // queryClient.setQueryData(queryKey, (data) => ({
    //   ...data,
    //   pageParams: [],
    // }));
    const dehydratedState = JSON.parse(JSON.stringify(dehydrate(queryClient)));
    const newlist = await mappingMediaFile2(dehydratedState.queries[0]?.state.data.pages[0].list);
    if (dehydratedState.queries[0]) {
        dehydratedState.queries[0].state.data.pages[0].list = newlist;
        dehydratedState.queries[0].state.data.pageParams[0] = 0;
    }
    // dehydratedState.queries[0].state.data.pages[0].list = newlist;
    // dehydratedState.queries[0].state.data.pageParams[0] = 0;
    return (
        <Hydrate state={dehydratedState}>
            <WorldCup />
        </Hydrate>
    );
}
