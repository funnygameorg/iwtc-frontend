import React from 'react';

interface IProps {
    isImageLoaded: any;
    setIsImageLoaded: any;
    setWorldCupContents: any;
    fowardVideoRef: any;
    fowardImgRef: any;
    mp4Type: string;
    imgType: string;
}

const ImageTypeLayout = ({
    isImageLoaded,
    setIsImageLoaded,
    setWorldCupContents,
    fowardVideoRef,
    fowardImgRef,
    mp4Type,
    imgType,
}: IProps) => {
    const readImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsImageLoaded(true);

        if (!e.target.files?.length) return;

        const imageFile = e.target.files[0];
        const reader = new FileReader();

        reader.addEventListener('load', (e: ProgressEvent<FileReader>) => {
            if (!e || !e.target) return;
            // if (typeof e.target.result !== 'string' || !imgRef.current) return;
            let type = e.target.result as string;
            // TODO: YOUTUBE 라이브러리와 변환 라이브러리 같이 적용 X 문제로 인해 주석처리
            // if (imageFile.type === 'image/gif') {
            //     setWorldCupContents((prevWorldCupContents: any) => ({
            //         ...prevWorldCupContents,
            //         originalName: imageFile.name,
            //         absoluteName: imageFile.name,
            //         mediaPath: e?.target?.result,
            //         mp4Type: type,
            //     }));
            // } else {
            setWorldCupContents((prevWorldCupContents: any) => ({
                ...prevWorldCupContents,
                originalName: imageFile.name,
                absoluteName: imageFile.name,
                mediaPath: e?.target?.result,
                imgType: type,
                detailFileType: removeImagePrefixAndConvertToUpperCase(imageFile.type),
                // fileType
            }));
            // }
        });

        // if (imageFile.type === 'image/gif') {
        //     ffmpeg.FS('writeFile', imageFile.name, await fetchFile(imageFile));
        //     await ffmpeg.run('-i', imageFile.name, 'output.mp4');
        //     // await ffmpeg.run(
        //     //     '-f',
        //     //     'gif',
        //     //     '-i',
        //     //     imageFile.name,
        //     //     '-movflags',
        //     //     '+faststart',
        //     //     '-pix_fmt',
        //     //     'yuv420p',
        //     //     '-vf',
        //     //     'scale=trunc(iw/2)*2:trunc(ih/2)*2',
        //     //     'output.mp4'
        //     // );

        //     const data = ffmpeg.FS('readFile', 'output.mp4');
        //     // const url = URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' }));
        //     const url = new Blob([data.buffer], { type: 'video/mp4' });

        //     reader.readAsDataURL(url);
        //     return;
        // }

        reader.readAsDataURL(imageFile);
    };

    const removeImagePrefixAndConvertToUpperCase = (str: string) => {
        let result = str.replace('image/', ''); // "image/"를 제거
        return result.toUpperCase(); // 대문자로 변환하여 반환
    };

    return (
        <div className="mb-2">
            <strong>파일</strong>
            <div className="mb-3 w-96">
                <input
                    className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                    type="file"
                    id="formFileMultiple"
                    name="mediaPath"
                    onChange={readImage}
                    multiple
                />
                {isImageLoaded === true ? (
                    <div style={{ marginTop: '10px' }}>
                        {mp4Type && (
                            <video
                                ref={fowardVideoRef}
                                src={mp4Type}
                                width={'auto'}
                                height={100}
                                autoPlay
                                muted
                                loop
                            ></video>
                        )}

                        {imgType && <img ref={fowardImgRef} src={imgType} width={'auto'} height={100} alt="img" />}
                    </div>
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
};

export default ImageTypeLayout;
