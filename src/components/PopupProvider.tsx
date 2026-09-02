'use client';
import { createContext, PropsWithChildren, useState } from 'react';

interface PopupContextType {
    showPopup: (modal: JSX.Element) => void;
    hidePopup: () => void;
}

export const PopupContext = createContext<PopupContextType>({
    showPopup: () => {},
    hidePopup: () => {},
});

const PopupProvider = ({ children }: PropsWithChildren) => {
    const [isOpenPopup, setIsOpenPopup] = useState(false);
    const [modalList, setModalList] = useState<JSX.Element[]>([]);

    const showPopup = (modal: JSX.Element) => {
        setIsOpenPopup(true);
        setModalList((prev) => [...prev, modal]);

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
                    modalList.map((modal, index) => {
                        return <div key={index}>{modal}</div>;
                    })}
            </>
        </PopupContext.Provider>
    );
};

export default PopupProvider;
