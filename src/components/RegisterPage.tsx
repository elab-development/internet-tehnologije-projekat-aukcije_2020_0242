import React, { useState } from 'react'
import { useAuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import Input from './Input';

export default function RegisterPage() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState('')
    const { register, error } = useAuthContext();
    const [repeat, setRepeat] = useState('')
    return (
        <div>
            <h3 className='mt-2 text-center'>Login</h3>
            {
                error && (
                    <div className="alert alert-danger mt-2" >
                        {error}
                    </div>
                )
            }
            <form onSubmit={e => {
                e.preventDefault();
                if (password !== repeat) {
                    return;
                }
                register({
                    email,
                    firstName,
                    lastName,
                    phone,
                    password
                });
            }}>
                <Input
                    label='First name'
                    required
                    value={firstName}
                    onChange={setFirstName}
                    placeholder='First name...'
                />
                <Input
                    label='Last name'
                    required
                    value={lastName}
                    onChange={setLastName}
                    placeholder='Last name...'
                />
                <Input
                    label='Phone number'
                    required
                    value={phone}
                    onChange={setPhone}
                    type='tel'
                    placeholder='Phone number...'
                />
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
                <Input
                    label='Repeat password'
                    required
                    value={repeat}
                    onChange={setRepeat}
                    type='password'
                    placeholder='Password...'
                />
                <button disabled={password !== repeat} className='btn btn-primary form-control mt-2'>Register</button>
            </form>
            <Link to='/'>
                <button className='btn btn-secondary form-control mt-2'>Already have an account</button>
            </Link>
        </div>
    )
}
