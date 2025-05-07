import React, { type ChangeEvent, type HTMLInputTypeAttribute, type ReactNode } from 'react';
import { useComposedRefs } from '#lib/react';
import { cn } from '#lib/utils';
import { ButtonClear } from './components/button-clear.js';
import { InputWrapper } from './components/input-wrapper.js';
import { Prefix } from './components/prefix.js';
import { Suffix } from './components/suffix.js';
import { useInputMask, type InputMaskitoProps } from './hooks/use-input-mask.js';
import { Input } from './input.js';

type FlexibleInputProps = {
    isClearable?: boolean;
    prefix?: ReactNode;
    suffix?: ReactNode;
    mask?: InputMaskitoProps;
    onChange?: (value: string) => void;
    value?: React.InputHTMLAttributes<HTMLInputElement>['value'];
    itemRef?: React.Ref<HTMLInputElement> | undefined;
    onClear?: () => void;
    CustomClearButton?: ReactNode;
    className?: string;
    type?: HTMLInputTypeAttribute;
    disabled?: boolean;
    isValid?: boolean;
    formItemId?: string;
};

export const FlexibleInput = ({
    isClearable,
    prefix,
    suffix,
    mask,
    CustomClearButton,
    onClear,
    itemRef,
    onChange,
    disabled,
    isValid,
    formItemId,
    ...props
}: FlexibleInputProps) => {
    const inputRef = useInputMask(mask);

    return (
        <InputWrapper>
            {({ value, setValue, ref }) => {
                const composedRefs = useComposedRefs<HTMLInputElement>(inputRef, ref, itemRef);
                const isButtonClearVisible = (value || props.value) && isClearable;
                return (
                    <>
                        <div className="group flex">
                            {prefix && <Prefix>{prefix}</Prefix>}

                            <div className="relative w-full">
                                {isButtonClearVisible && (
                                    <ButtonClear
                                        onClear={() => {
                                            setValue('');
                                            onChange && onChange('');

                                            onClear?.();
                                        }}
                                        CustomClearButton={CustomClearButton}
                                    />
                                )}

                                <Input
                                    ref={composedRefs}
                                    value={value || props.value}
                                    className={cn(
                                        prefix && 'rounded-l-none',
                                        suffix && 'rounded-r-none',
                                        props.className
                                    )}
                                    {...props}
                                    onInput={(e) => {
                                        onChange && onChange(e.currentTarget.value);
                                        setValue(e.currentTarget.value);
                                    }}
                                    disabled={disabled}
                                    data-invalid={!isValid}
                                    id={formItemId}
                                />
                            </div>
                            {suffix && <Suffix>{suffix}</Suffix>}
                        </div>
                    </>
                );
            }}
        </InputWrapper>
    );
};
