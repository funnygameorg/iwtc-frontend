
import { dehydrate, Hydrate } from '@tanstack/react-query';
import getQueryClient from '@/app/getQueryClient';
import { worldCupAllList } from '@/services/WorldCupService';
import WorldCup from './worldcup/WorldCupWrapper';
import RankSelect from '../button/RankSelect';
import SearchBar from '../search';
import Order from '../dropdown/Order';
import { getAccessToken } from '@/utils/TokenManager';
import { userMeSummary } from '@/services/MemberService';
import { getUserInfo } from '@/stores/LocalStore';

export default async function HydratedWCList({ memberId }) {

    const queryClient = getQueryClient();
    await queryClient.prefetchInfiniteQuery(
        ['wclist', 'id', undefined, 'ALL'],
        async () => await worldCupAllList(0, 20, 'id', undefined, memberId, 'ALL')
    );
    // queryClient.setQueryData(queryKey, (data) => ({
    //   ...data,
    //   pageParams: [],
    // }));
    const dehydratedState = JSON.parse(JSON.stringify(dehydrate(queryClient)));
    // console.log("dehydratedState",dehydratedState.queries[0].state.data.pages);
    // TODO : 아래 코드에서 터져요
    // dehydratedState.queries[0].state.data.pageParams[0] = 0;
    return (
        <Hydrate state={dehydratedState}>
            <WorldCup />
        </Hydrate>
    );
}
