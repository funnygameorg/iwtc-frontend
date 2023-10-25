import { dehydrate, Hydrate } from '@tanstack/react-query'
import getQueryClient from '@/app/getQueryClient'
import { worldCupAllList } from '@/services/WorldCupService'
import WorldCup from './worldcup/WorldCup'

export default async function HydratedWCList() {
  const queryClient = getQueryClient()
  await queryClient.prefetchInfiniteQuery(['wclist'], async () => await worldCupAllList(0 ,20, 'id'))
  // queryClient.setQueryData(queryKey, (data) => ({
  //   ...data,
  //   pageParams: [],
  // }));
  const dehydratedState = JSON.parse(JSON.stringify(dehydrate(queryClient)))
  dehydratedState.queries[0].state.data.pageParams[0]= 0;
  return (
    <Hydrate state={dehydratedState}>
      <WorldCup />
    </Hydrate>
  )
}