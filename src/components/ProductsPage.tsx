import React, { useEffect, useState } from 'react'
import { Pagination, Product } from '../types';
import axios from 'axios';
import Input from './Input';
import Select from './Select';
import ProductCard from './ProductCard';
export default function ProductsPage() {
    const [products, setProducts] = useState<Pagination<Product> | undefined>(undefined);
    const [params, setParams] = useState({
        name: '',
        sold: 0,
        page: 0,
        size: 20
    })
    const fetchProducts = async () => {
        const res = await axios.get('/api/products', {
            params: {
                ...params,
                sold: params.sold === 0 ? undefined : (params.sold === 1 ? 1 : 0)
            }
        })
        setProducts(res.data)
    }

    useEffect(() => {
        fetchProducts();
    }, [params]);

    return (
        <div className='container mt-3'>
            <h2 className='text-center'>Products</h2>
            <div className='mt-2 d-flex  align-items-center'>
                <div style={{ flex: 1 }}>
                    <Input placeholder='Search...' value={params.name} onChange={val => {
                        setParams(prev => {
                            return {
                                ...prev,
                                name: val
                            }
                        })
                    }} />
                </div>
                <div className='px-4'>
                    <Select
                        value={params.sold}
                        data={[{
                            value: 0,
                            label: 'All'
                        }, {
                            value: 1,
                            label: 'Sold'
                        }, {
                            value: 2,
                            label: 'Not sold'
                        }]}
                        onChange={(val) => {
                            setParams(prev => {
                                return {
                                    ...prev,
                                    sold: Number(val)
                                }
                            })
                        }}
                    />
                </div>

            </div>
            <div className='row mt-2'>
                <div className='col-5'>
                    {
                        products?.data.map(product => {
                            return (
                                <ProductCard product={product} key={product.id} />
                            )
                        })
                    }
                </div>
                <div className='col-7'>

                </div>
            </div>
        </div>
    )
}
