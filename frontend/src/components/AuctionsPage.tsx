import React, { useEffect, useState } from 'react'
import { Auction, AuctionStatus, Pagination, User } from '../types'
import axios from 'axios';
import Input from './inputs/Input';
import { format } from 'date-fns'
import AuctionForm from './form/AuctionForm';
import Select from './inputs/Select';

export default function AuctionsPage() {
    const [auctions, setAuctions] = useState<Pagination<Auction> | undefined>(undefined);
    const [users, setUsers] = useState<User[]>([])
    const [params, setParams] = useState({
        from: '',
        to: '',
        userId: '',
        search: '',
        page: 0,
        size: 20
    })

    const fetchAuctions = async () => {
        const res = await axios.get('/api/auctions', {
            params: {
                from: params.from || undefined,
                to: params.to || undefined,
                userId: params.userId || undefined,
                page: params.page,
                search: params.search,
                size: params.size
            }
        });
        setAuctions(res.data);
    }

    useEffect(() => {
        fetchAuctions();
    }, [params])

    useEffect(() => {
        axios.get('/api/users')
            .then(res => setUsers(res.data))
            .catch(() => setUsers([]))
    }, [])

    const changeStatus = async (auctionId: number, status: AuctionStatus) => {
        const res = await axios.put('/api/auctions/' + auctionId, { status });
        setAuctions(prev => {
            if (!prev) {
                return prev;
            }
            return {
                ...prev,
                data: prev.data.map(e => e.id === auctionId ? res.data : e)
            }
        })
    }

    return (
        <div className='container'>
            <h2 className='text-center m-3'>Auctions overview</h2>
            <div className='mt-2 d-flex  align-items-end justify-content-between'>
                <div className='pe-3'>
                    <Input
                        placeholder='from'
                        label='From'
                        type='date'
                        value={params.from}
                        onChange={val => setParams(prev => {
                            return {
                                ...prev,
                                from: val
                            }
                        })}
                    />
                </div>
                <div className='pe-3'>
                    <Input
                        placeholder='To'
                        label='To'
                        type='date'
                        value={params.to}
                        onChange={val => setParams(prev => {
                            return {
                                ...prev,
                                to: val
                            }
                        })}
                    />
                </div>
                <div style={{ flex: 1 }}>
                    <Input
                        placeholder='Search'
                        label='Search'
                        value={params.search}
                        onChange={val => setParams(prev => {
                            return {
                                ...prev,
                                search: val
                            }
                        })}
                    />
                </div>
                <Select
                    label='User id'
                    value={params.userId}
                    data={users.map(user => {
                        return {
                            value: user.id,
                            label: user.firstName + ' ' + user.lastName
                        }
                    })}
                    onChange={val => setParams(prev => {
                        return {
                            ...prev,
                            userId: val as any
                        }
                    })}
                />
                <div className='d-flex  align-items-center'>
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
                        disabled={auctions && auctions.total <= auctions.data.length * (params.page + 1)}
                        className="btn btn-white mt-3"
                    > &raquo;</button>
                </div>
            </div>
            <div className='row mt-2'>
                <div className='col-7'>
                    {
                        auctions && auctions.data.length > 0 && (
                            <table className='table display'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Start time</th>
                                        <th>End time</th>
                                        <th>Start price</th>
                                        <th>Product</th>
                                        <th>User</th>
                                        <th>Total bids</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        auctions.data.map(auction => {
                                            return (
                                                <tr key={auction.id}>
                                                    <td>{auction.id}</td>
                                                    <td>{format(new Date(auction.startTime * 1000), 'dd.MM.yyyy HH:mm')}</td>
                                                    <td>{format(new Date(auction.endTime * 1000), 'dd.MM.yyyy HH:mm')}</td>
                                                    <td>{auction.startPrice}</td>
                                                    <td>{auction.product.name}</td>
                                                    <td>{auction.user ? (auction.user.firstName + ' ' + auction.user.lastName) : '/'}</td>
                                                    <td>{auction.bids.length}</td>
                                                    <td>{auction.status}</td>
                                                    <td>
                                                        {auction.status === 'active' && (
                                                            <div className='btn-group'>
                                                                <button
                                                                    onClick={() => {
                                                                        changeStatus(auction.id, 'success')
                                                                    }}
                                                                    className='btn btn-success'>Success</button>
                                                                <button
                                                                    onClick={() => {
                                                                        changeStatus(auction.id, 'failed')
                                                                    }}
                                                                    className='btn btn-danger'>Fail</button>
                                                            </div>
                                                        )}
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        )
                    }
                </div>
                <div className='col-5'>
                    <AuctionForm
                        onSubmit={async val => {
                            try {
                                await axios.post('/api/auctions', val);
                                fetchAuctions();
                            } catch (error) {

                            }
                        }}
                    />
                </div>
            </div>
        </div>
    )
}
