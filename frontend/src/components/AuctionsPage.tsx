import React, { useEffect, useState } from 'react'
import { Auction, Pagination } from '../types'
import axios from 'axios';
import Input from './inputs/Input';
import { format } from 'date-fns'
import AuctionForm from './form/AuctionForm';

export default function AuctionsPage() {
    const [auctions, setAuctions] = useState<Pagination<Auction> | undefined>(undefined);
    const [params, setParams] = useState({
        from: '',
        to: '',
        userId: '',
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
                size: params.size
            }
        });
        setAuctions(res.data);
    }

    useEffect(() => {
        fetchAuctions();
    }, [params])

    return (
        <div className='container'>
            <h2 className='text-center m-3'>Auctions overview</h2>
            <div className='mt-2 d-flex  align-items-center'>
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
                <Input
                    placeholder='User id'
                    label='User id'
                    value={params.userId}
                    onChange={val => setParams(prev => {
                        return {
                            ...prev,
                            userId: val
                        }
                    })}
                />

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
