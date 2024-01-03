import axios from "axios";
import { RegisterUser, User } from "../types"
import React, { useContext, useEffect, useState } from 'react'

export interface AuthContextType {
    user?: User,
    login: (email: string, password: string) => void,
    register: (u: RegisterUser) => void,
    logout: () => void,
    error: string
}

const AuthContext = React.createContext<AuthContextType | null>(null);

export function useAuthContext() {
    const authC = useContext(AuthContext);
    if (!authC) {
        throw new Error('Missing context provider');
    }
    return authC;
}


export function AuthContextProvider(props: React.PropsWithChildren) {
    const [user, setUser] = useState<User | undefined>(undefined);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!loading) {
            return;
        }
        const token = localStorage.getItem('token');
        if (!token) {
            setLoading(false);
            return;
        }
        axios.get('/api/user')
            .then(res => {
                setUser(res.data.user);
                localStorage.setItem('token', res.data.token);
                axios.defaults.headers.common.Authorization = 'Bearer ' + res.data.token;
            })
            .catch(err => {

            })
            .finally(() => {
                setLoading(false)
            })

    }, [loading])

    const logout = async () => {
        await axios.post('/api/logout')
        setUser(undefined);
        axios.defaults.headers.common.Authorization = undefined;
        localStorage.removeItem('token');
    }

    const login = async (email: string, password: string) => {
        try {
            const res = await axios.post('/api/login', { email, password });
            setUser(res.data.user);
            localStorage.setItem('token', res.data.token);
            axios.defaults.headers.common.Authorization = 'Bearer ' + res.data.token;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setError(error.response?.data.message);

            } else {
                setError('Something went wrong');
            }
        }
    }

    const register = async (u: RegisterUser) => {
        try {
            const res = await axios.post('/api/register', u);
            setUser(res.data.user);
            localStorage.setItem('token', res.data.token);
            axios.defaults.headers.common.Authorization = 'Bearer ' + res.data.token;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setError(error.response?.data.message);

            } else {
                setError('Something went wrong');
            }
        }
    }

    if (loading) {
        return null;
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
                register,
                error
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}