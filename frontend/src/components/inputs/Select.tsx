import React from 'react'

type ValueType = number | string

interface Props {
    label?: string,
    value: ValueType,
    onChange: (val: ValueType) => void,
    data: { value: ValueType, label: string }[]
}


export default function Select(props: Props) {
    return (
        <div className='form-group mt-3 d-flex'>
            {props.label && <label >{props.label}</label>}
            <select className='form-control'
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
