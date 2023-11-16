import WorldCupContentsManageList from './WorldCupContentsManageList';





/*
    게임 컨텐츠 리스트 래핑 요소입니다.
*/
const WorldCupContentsManageListWrapper = () => {
    return (
        <div>
            <div className="flex justify-between items-center">
                <h1 className="text-lg font-semibold" style={{ marginLeft: '2%' }}>
                    ❤️ 이상형 리스트 ❤️
                </h1>
                <div className="ml-auto" style={{ marginRight: '2%' }}>


                    <div>
                        <span className="h-4 w-4 bg-green-500 rounded-full inline-block mr-2">
                        </span>
                        <span>
                            추가 이상형 : 1
                        </span>
                    </div>

                    <div>
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            이상형 업데이트 적용
                        </button>
                    </div>

                </div>
            </div>
            <div className='h-screen overflow-y-auto'>
                < WorldCupContentsManageList />
            </div>
        </div >
    )
};

export default WorldCupContentsManageListWrapper;