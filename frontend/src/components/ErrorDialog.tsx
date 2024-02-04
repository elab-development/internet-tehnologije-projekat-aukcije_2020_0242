import React from 'react'

interface Props {
    error: string,
    onReset: () => void,
}

export default function ErrorDialog(props: Props) {
    if (!props.error) {
        return null;
    }
    return (
        <div className="alert alert-danger p-2 mt-2 d-flex align-items-center justify-content-between" role="alert">
            {props.error}
            <button type="button" className="btn btn-white" onClick={props.onReset}>
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    )
}
