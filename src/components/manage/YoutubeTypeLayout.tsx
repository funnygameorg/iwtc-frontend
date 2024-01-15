import React from 'react';
import YoutubePlayer from '../youtubePlayer/YoutubePlayer';

interface IProps {
    mediaPath: string;
    videoStartTime: string;
    videoPlayDuration: string;
    handleCreateWorldCupContents: (e: any) => void;
}

const YoutubeTypeLayout = ({ mediaPath, videoStartTime, videoPlayDuration, handleCreateWorldCupContents }: IProps) => {
    return (
        <div className="mb-2">
            <strong className="ml-1">동영상 링크</strong>
            <div>
                <div className="flex">
                    <input
                        id="videoLinkInput"
                        type="text"
                        className=" w-full h-10 p-1 border rounded-xl"
                        name="mediaPath"
                        value={mediaPath}
                        placeholder="유튜브 동영상 링크"
                        onChange={handleCreateWorldCupContents}
                    />
                </div>
            </div>
            <div className="flex">
                <div className="mr-2">
                    <div className="ml-1">영상 시작 시간</div>
                    <input
                        type="text"
                        className="p-1 border rounded-xl"
                        name="videoStartTime"
                        value={videoStartTime}
                        onChange={handleCreateWorldCupContents}
                        placeholder="형식 : 00000"
                    />
                </div>
                <div>
                    <div className="ml-1">반복 시간</div>
                    <input
                        type="text"
                        className="p-1 border rounded-xl"
                        name="videoPlayDuration"
                        value={videoPlayDuration}
                        onChange={handleCreateWorldCupContents}
                        placeholder="3~5초 사이"
                    />
                </div>
            </div>
            {mediaPath && (
                <div className="m-5">
                    <YoutubePlayer url={mediaPath} componentType={'uploadForm'} />
                </div>
            )}
        </div>
    );
};

export default YoutubeTypeLayout;
