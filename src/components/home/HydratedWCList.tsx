import { dehydrate, Hydrate } from '@tanstack/react-query'
import getQueryClient from '@/app/getQueryClient'
import { worldCupAllList } from '@/services/WorldCupService'
import WorldCup from './worldcup/WorldCupWrapper'
import RankSelect from '../button/RankSelect'
import SearchBar from '../search'
import Order from '../dropdown/Order'

export default async function HydratedWCList() {
  const queryClient = getQueryClient()
  await queryClient.prefetchInfiniteQuery(['wclist', undefined, 'ALL'], async () => await worldCupAllList(0 ,20, 'id', undefined, 'ALL'))
  // queryClient.setQueryData(queryKey, (data) => ({
  //   ...data,
  //   pageParams: [],
  // }));
  const dehydratedState = JSON.parse(JSON.stringify(dehydrate(queryClient)))
  console.log("dehydratedState",dehydratedState.queries[0].state.data.pages);
  
  dehydratedState.queries[0].state.data.pageParams[0]= 0;
  return (
    <Hydrate state={dehydratedState}>
      <WorldCup />
    </Hydrate>
  )
}