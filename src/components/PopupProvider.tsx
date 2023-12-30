'use client';
import { createContext, PropsWithChildren, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import AlertPopup from './popup/AlertPopup';

interface ModalDataType {
    madal: JSX.Element;
}

interface PopupContextType {
    showPopup: (modal: JSX.Element) => void;
    hidePopup: () => void;
}

export const PopupContext = createContext<PopupContextType>({
    showPopup: (modal: JSX.Element) => {},
    hidePopup: () => {},
});

const PopupPopvider = ({ children }: PropsWithChildren) => {
    const [isOpenPopup, setIsOpenPopup] = useState(false);
    const [modalList, setModalList] = useState<ModalDataType[]>([]);

    const showPopup = (modal: JSX.Element) => {
        setIsOpenPopup(true);
        setModalList((prev) => [...prev, modal] as ModalDataType[]);

        // if (toastTimer.current) {
        //   clearTimeout(toastTimer.current);
        // }

        // const timer = setTimeout(() => {
        //   setIsOpenPopup(false);
        //   setMessage("");
        // }, 3000);
        // toastTimer.current = timer;
    };

    const hidePopup = () => {
        setIsOpenPopup(false);
        setModalList([]);
    };
    return (
        <PopupContext.Provider value={{ showPopup, hidePopup }}>
            {children}
            <>
                {isOpenPopup &&
                    modalList.map((modal: any, index: number) => {
                        return <div key={index}>{modal}</div>;
                    })}
            </>
        </PopupContext.Provider>
    );
};

export default PopupPopvider;
