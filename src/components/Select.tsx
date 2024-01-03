import React from 'react'

interface Props {
    label: string,
    value: string,
    onChange: (val: string) => void,
    required: boolean
    data: { value: string, label: string }[]
}


export default function Select(props: Props) {
    return (
        <div className='form-group mt-3'>
            {props.label && <label >{props.label}</label>}
            <select className='form-control' required={props.required}
                value={props.value} onChange={e => props.onChange?.(e.currentTarget.value)}>
                {
                    props.data.map(element => {
                        return (
                            <option key={element.value} value={element.value}>{element.label}</option>
                        )
                    })
                }
            </select>
        </div>
    )
}
