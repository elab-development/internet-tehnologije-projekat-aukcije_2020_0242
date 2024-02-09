import React from 'react'

interface Props {
    label: string,
    value: string | number,
    onChange: (val: string) => void,
    type: React.HTMLInputTypeAttribute,
    placeholder: string,
    required: boolean,
    textArea: boolean;
    disabled?: boolean
}

export default function Input(props: Partial<Props>) {
    return (
        <div className='form-group mt-3'>
            {props.label && <label >{props.label}</label>}
            {
                props.textArea ? (
                    <textarea disabled={props.disabled} className='form-control' required={props.required}
                        value={props.value} placeholder={props.placeholder} onChange={e => props.onChange?.(e.currentTarget.value)}></textarea>
                ) : (
                    <input disabled={props.disabled} className='form-control' required={props.required} type={props.type}
                        value={props.value} placeholder={props.placeholder} onChange={e => props.onChange?.(e.currentTarget.value)} />
                )
            }
        </div>
    )
}
