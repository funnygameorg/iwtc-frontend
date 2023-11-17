import { useContext, useState } from 'react';
import WorldCupContentsManageList from './WorldCupContentsManageList';
import { WorldCupManageContext } from '@/hooks/WorldCupManageContext';





/*
    게임 컨텐츠 리스트 래핑 요소입니다.
*/
const WorldCupContentsManageListWrapper = () => {


    const { isCreateWorldCup } = useContext(WorldCupManageContext);

    const isNotCreateWorldCupLogo = () => {
        return (
            <div className="w-full h-full mb-4 p-4 border rounded shadow bg-gray-100">
                😭 왼쪽에서 월드컵 게임을 먼저 추가해주세요 😭
            </div >
        );
    }

    return (

        <div>
            <div className="flex justify-between items-center">

                <h1 className="text-lg font-semibold" style={{ marginLeft: '2%' }}>
                    ❤️ 이상형 리스트 ❤️
                </h1>
                <div className="ml-auto" style={{ marginRight: '2%' }}>

                    {
                        isCreateWorldCup === false ?
                            <>
                                <div>
                                    <button
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    >
                                        이상형 업데이트 적용
                                    </button>
                                </div>
                            </>
                            :
                            <div>

                            </div>
                    }


                </div>
            </div>
            <div className='p-8'>
                {
                    isCreateWorldCup === false ?
                        <div className='h-screen overflow-y-auto '>
                            < WorldCupContentsManageList />
                        </div>
                        :
                        <div>
                            {isNotCreateWorldCupLogo()}
                        </div>
                }
            </div>
        </div >
    )
};

export default WorldCupContentsManageListWrapper;