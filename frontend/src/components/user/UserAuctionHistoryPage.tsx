import React, { useEffect, useState } from 'react'
import Input from '../inputs/Input'
import { useLocation, useNavigate } from 'react-router'
import { Pagination, Auction } from '../../types';
import axios from 'axios';
import { useAuthContext } from '../../context/AuthContext';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

export default function UserAuctionHistoryPage() {
    const search = useLocation().search;
    const parsed = new URLSearchParams(search);
    const [auctions, setAuctions] = useState<Pagination<Auction> | undefined>(undefined);
    const navigate = useNavigate();
    const { user } = useAuthContext();
    useEffect(() => {
        const urlParams = new URLSearchParams(search);
        urlParams.set('userId', `${user?.id || ''}`)
        axios.get('/api/auctions?' + urlParams.toString())
            .then(res => setAuctions(res.data))
            .catch(() => setAuctions(undefined))
    }, [search, user?.id])
    return (
        <div className='container'>
            <h2 className='text-center m-2'>History</h2>
            <div className='mt-2 d-flex  align-items-end justify-content-between'>
                <div className='pe-3'>
                    <Input
                        placeholder='from'
                        label='From'
                        type='date'
                        value={parsed.get('from') || ''}
                        onChange={val => {
                            parsed.set('from', val);
                            navigate('/history?' + parsed.toString());
                        }}
                    />
                </div>
                <div className='pe-3'>
                    <Input
                        placeholder='To'
                        label='To'
                        type='date'
                        value={parsed.get('to') || ''} onChange={val => {
                            parsed.set('to', val);
                            navigate('/history?' + parsed.toString());
                        }}
                    />
                </div>
                <div style={{ flex: 1 }}>
                    <Input
                        placeholder='Search'
                        label='Search'
                        value={parsed.get('search') || ''} onChange={val => {
                            parsed.set('search', val);
                            navigate('/history?' + parsed.toString());
                        }}
                    />
                </div>
                <div className='d-flex  align-items-center'>
                    <button
                        onClick={() => {
                            parsed.set('search', `${Number(parsed.get('page') || 0) - 1}`);
                            navigate('/history?' + parsed.toString());
                        }}
                        disabled={!Number(parsed.get('page') || 0)}
                        className="btn btn-white mt-3"
                    > &laquo;</button>
                    <button
                        onClick={() => {
                            parsed.set('search', `${Number(parsed.get('page') || 0) + 1}`);
                            navigate('/history?' + parsed.toString());
                        }}
                        disabled={auctions && auctions.total <= auctions.data.length * (Number(parsed.get('page') || 0) + 1)}
                        className="btn btn-white mt-3"
                    > &raquo;</button>
                </div>
            </div>
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
                                            <td>
                                                <Link to={'/auction/' + auction.id}>{auction.id}</Link>
                                            </td>
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
    )
}
