
import React from 'react'

interface Props {
    label: string,
    checked: boolean,
    onChange: () => void,
}
export default function CheckBox(props: Props) {
    return (
        <div className='form-check mt-3'>
            {props.label && <label className='form-check-label' >{props.label}</label>}
            <input
                className='form-check-input'
                type='checkbox'
                checked={props.checked}
                onChange={props.onChange}
            />
        </div>
    )
}
