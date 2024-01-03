import React, { useEffect, useState } from 'react'
import { Pagination, Product } from '../types';
import axios from 'axios';
import Input from './Input';
export default function ProductsPage() {
    const [products, setProducts] = useState<Pagination<Product> | undefined>(undefined);
    const [params, setParams] = useState({
        name: '',
        sold: undefined as boolean | undefined,
        page: 0,
        size: 20
    })

    useEffect(() => {
        axios.get('/api/products', { params })
            .then(res => setProducts(res.data))
    }, [params]);

    return (
        <div className='container mt-3'>
            <h2 className='text-center'>Products</h2>
            <div className='mt-2 d-flex justify-content-between align-items-center'>
                <Input placeholder='Name...' />
            </div>
        </div>
    )
}
