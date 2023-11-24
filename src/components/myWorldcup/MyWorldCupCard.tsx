import exp from "constants";

const MyWorldCupCard = ({ myWorldCup }) => {

    const playMyWorldCup = (worldCupId) => {

    }

    const updateMyWorldCup = (worldCupId) => {

    }

    const removeMyWorldCup = (worldCupId) => {

    }


    return (
        <div className="w-full p-4 shadow-md">
            <div className="flex justify-between items-center m-5">
                <div>
                    <h3 className="text-2xl font-semibold">
                        {myWorldCup.title}
                    </h3>
                    <p className="break-all truncate max-w-[700px] text-gray-600">
                        {/* {myWorldCup.description} */}
                        ABCDABCDABCDABCDABCD ABCDABCDABCDABCDABCDAB CDABCDABCDABCDABCD ABCDABCDABCDABCDABCD
                    </p>
                </div>
                <div>
                    <button
                        className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        onClick={() => playMyWorldCup(myWorldCup.id)}
                    >
                        플레이
                    </button>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-3"
                        onClick={() => updateMyWorldCup(myWorldCup.id)}
                    >
                        수정
                    </button>
                    <button
                        className="bg-orange-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-3"
                        onClick={() => removeMyWorldCup(myWorldCup.id)}
                    >
                        삭제
                    </button>
                </div>
            </div>
        </div>
    );
}
export default MyWorldCupCard;