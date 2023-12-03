import React, { useState } from 'react';
import { usePopper } from 'react-popper';

interface IProps {
    commentId: number;
    isPopup: boolean;
}
const ReplyPopup = ({ commentId, isPopup }: IProps) => {
    const [referenceElement, setReferenceElement] = useState(null);
    const [popperElement, setPopperElement] = useState(null);
    const { styles, attributes } = usePopper(referenceElement, popperElement, {
        placement: 'bottom',
        modifiers: [
            {
                name: 'offset',
                options: {
                    offset: [0, 10], // (x, y) offset 값 설정
                },
            },
        ],
    });

    const customStyles = {
        position: 'absolute',
        inset: '0px auto auto 0px',
        margin: '0px',
        transform: 'translate(651px, 370px)',
        ...styles.popper, // 기존 Popper.js의 스타일과 병합
        // visibility: popperElement ? 'visible' : 'hidden',
    };

    return (
        <div
            id={`dropdownComment${commentId}`}
            className={`${
                isPopup ? 'block' : 'hidden'
            } z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600 `}
            // data-popper-placement="bottom"
            style={customStyles}
            {...attributes.popper}
            data-popper-placement="bottom"
        >
            <ul
                className="py-1 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownMenuIconHorizontalButton"
            >
                <li>
                    <a
                        href="#"
                        className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                        Edit
                    </a>
                </li>
                <li>
                    <a
                        href="#"
                        className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                        Remove
                    </a>
                </li>
                <li>
                    <a
                        href="#"
                        className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                        Report
                    </a>
                </li>
            </ul>
        </div>
    );
};

export default ReplyPopup;
