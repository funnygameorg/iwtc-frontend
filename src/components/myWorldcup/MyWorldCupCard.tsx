import { deleteMyWorldCup } from '@/services/ManageWorldCupService';
import { getAccessToken } from '@/utils/TokenManager';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import exp from 'constants';
import Link from 'next/link';

const MyWorldCupCard = ({ myWorldCup, refetch }: any) => {
    const queryClient = useQueryClient();

    const { mutate, isLoading, error, isSuccess } = useMutation(deleteMyWorldCup, {
        onSuccess: async (data) => {
            if (refetch) {
                refetch();
            }
        },
        onError: (error) => {
            console.log('에러', error);
        },
    });

    const playMyWorldCup = (worldCupId: any) => {};

    const updateMyWorldCup = (worldCupId: any) => {};

    const removeMyWorldCup = (worldCupId: any) => {
        const accessToken = getAccessToken();
        const pramas = {
            worldCupId: worldCupId,
            token: accessToken,
        };
        mutate(pramas);
    };
    console.log('myWorldCup', myWorldCup);
    return (
        <div className="w-full p-4 shadow-md">
            <div className="flex justify-between items-center m-5">
                <div>
                    <h3 className="text-2xl font-semibold">{myWorldCup.title}</h3>
                    <p className="break-all truncate max-w-[700px] text-gray-600">
                        {/* {myWorldCup.description} */}
                        {myWorldCup.description}
                    </p>
                </div>
                <div>
                    <Link href={`/play-game/${myWorldCup.worldCupId}`}>
                        <button
                            className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            // onClick={() => playMyWorldCup(myWorldCup.worldCupId)}
                        >
                            플레이
                        </button>
                    </Link>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-3"
                        onClick={() => updateMyWorldCup(myWorldCup.worldCupId)}
                    >
                        <Link href={`/manage/${myWorldCup.worldCupId}`}>수정</Link>
                    </button>
                    <button
                        className="bg-orange-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-3"
                        onClick={() => removeMyWorldCup(myWorldCup.worldCupId)}
                    >
                        삭제
                    </button>
                </div>
            </div>
        </div>
    );
};
export default MyWorldCupCard;
