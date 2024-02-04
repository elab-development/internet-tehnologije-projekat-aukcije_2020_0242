import React, { useState } from 'react'
import { useAuthContext } from '../context/AuthContext';
import Input from './inputs/Input';
import { Link } from 'react-router-dom';
import ErrorDialog from './ErrorDialog';

export default function LoginPage() {
    const { login, error, setError } = useAuthContext();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    return (
        <div>
            <h3 className='mt-2 text-center'>Login</h3>
            <ErrorDialog
                error={error}
                onReset={() => { setError('') }}
            />
            <form onSubmit={e => {
                e.preventDefault();
                login(email, password);
            }}>
                <Input
                    label='Email'
                    required
                    value={email}
                    onChange={setEmail}
                    type='email'
                    placeholder='Email...'
                />
                <Input
                    label='Password'
                    required
                    value={password}
                    onChange={setPassword}
                    type='password'
                    placeholder='Password...'
                />
                <button className='btn btn-primary form-control mt-2'>Login</button>
            </form>
            <Link to='/register'>
                <button className='btn btn-secondary form-control mt-2'>Don't have an account</button>
            </Link>
        </div>
    )
}
