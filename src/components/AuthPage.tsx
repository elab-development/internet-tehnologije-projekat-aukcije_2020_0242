import React from 'react'
import LoginPage from './LoginPage'
import RegisterPage from './RegisterPage'

interface Props {
    login: boolean,
}

export default function AuthPage(props: Props) {
    return (
        <div className='container mt-3'>
            <div className='image'>

            </div>
            {
                props.login ? (<LoginPage />) : (<RegisterPage />)
            }
        </div>
    )
}
