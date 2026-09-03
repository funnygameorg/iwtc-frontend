import React, { HTMLAttributes } from 'react';
import { FieldError } from 'react-hook-form';

interface Props extends HTMLAttributes<HTMLSpanElement> {
    result?: Pick<FieldError, 'message'>;
}

const ValidateMessage = ({ result, ...args }: Props) => {
    return (
        <>
            {result && (
                <span className="text-xs text-red-500" {...args}>
                    {result.message || '필드를 확인해주세요.'}
                </span>
            )}
        </>
    );
};

export default React.memo(ValidateMessage);
