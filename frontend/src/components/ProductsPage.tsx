import React, { useEffect, useState } from 'react'
import { Pagination, Product } from '../types';
import axios from 'axios';
import Input from './inputs/Input';
import Select from './inputs/Select';
import ProductCard from './ProductCard';
import ProductForm from './form/ProductForm';
export default function ProductsPage() {
    const [products, setProducts] = useState<Pagination<Product> | undefined>(undefined);
    const [params, setParams] = useState({
        name: '',
        sold: 0,
        page: 0,
        size: 20
    })
    const [selectedId, setSelectedId] = useState(0);
    const selectedProduct = products?.data.find(p => p.id === selectedId);
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
                <button
                    onClick={() => {
                        setParams(prev => {
                            return {
                                ...prev,
                                page: prev.page - 1
                            }
                        })
                    }}
                    disabled={params.page === 0}
                    className="btn btn-white mt-3"
                > &laquo;</button>
                <button
                    onClick={() => {
                        setParams(prev => {
                            return {
                                ...prev,
                                page: prev.page + 1
                            }
                        })
                    }}
                    disabled={products && products.total <= products.data.length * (params.page + 1)}
                    className="btn btn-white mt-3"
                > &raquo;</button>
            </div>
            <div className='row mt-2'>
                <div className='col-5'>
                    {
                        products?.data.map(product => {
                            return (
                                <div
                                    key={product.id}
                                    className={`product ${product.id === selectedId ? 'border border-info' : ''}`}
                                    onClick={() => {
                                        setSelectedId(prev => prev === product.id ? 0 : product.id)
                                    }}>
                                    <ProductCard product={product} />
                                </div>
                            )
                        })
                    }
                </div>
                <div className='col-7'>
                    <ProductForm
                        product={selectedProduct}
                        onSubmit={async createProduct => {
                            if (!selectedProduct) {
                                await axios.post('/api/products', createProduct);
                            } else {
                                await axios.put('/api/products/' + selectedId, createProduct);
                            }
                            await fetchProducts();
                        }}

                    />
                </div>
            </div>
        </div>
    )
}
