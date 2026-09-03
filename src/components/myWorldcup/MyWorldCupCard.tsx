import { deleteMyWorldCup, ManagedWorldCupSummary } from '@/services/ManageWorldCupService';
import { getAccessToken } from '@/utils/TokenManager';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';

interface MyWorldCupCardProps {
    myWorldCup: ManagedWorldCupSummary;
    refetch: () => void;
}

const MyWorldCupCard = ({ myWorldCup, refetch }: MyWorldCupCardProps) => {
    const { mutate } = useMutation(deleteMyWorldCup, {
        onSuccess: () => {
            if (refetch) {
                refetch();
            }
        },
    });

    const removeMyWorldCup = (worldCupId: number) => {
        const accessToken = getAccessToken();
        const pramas = {
            worldCupId: worldCupId,
            token: accessToken,
        };
        mutate(pramas);
    };

    return (
        <div className="w-full p-4 shadow-md">
            <div className="flex justify-between items-center m-5">
                <div>
                    <h3 className="text-2xl font-semibold">{myWorldCup.title}</h3>
                    <p className="break-all truncate max-w-[700px] text-gray-600">
                        {myWorldCup.description}
                    </p>
                </div>
                <div>
                    <Link href={`/play-game/${myWorldCup.worldCupId}`}>
                        <button
                            className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            플레이
                        </button>
                    </Link>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-3">
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
