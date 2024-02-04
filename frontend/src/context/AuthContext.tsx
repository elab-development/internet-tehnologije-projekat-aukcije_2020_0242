import axios from "axios";
import { RegisterUser, User } from "../types"
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from "react-router";

export interface AuthContextType {
    user?: User,
    login: (email: string, password: string) => void,
    register: (u: RegisterUser) => void,
    logout: () => void,
    error: string,
    setError: (val: string) => void
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
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading) {
            return;
        }
        const token = localStorage.getItem('token');
        if (!token) {
            setLoading(false);
            return;
        }
        axios.get('/api/user', { headers: { Authorization: 'Bearer ' + token } })
            .then(res => {
                setUser(res.data);
                axios.defaults.headers.common.Authorization = 'Bearer ' + token;
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
            navigate('/')
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
            navigate('/')
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
                setError,
                logout,
                register,
                error
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}