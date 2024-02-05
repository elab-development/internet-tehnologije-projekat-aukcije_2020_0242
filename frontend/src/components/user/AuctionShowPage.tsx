import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { Auction } from '../../types';
import axios from 'axios';
import { format } from 'date-fns';
import Input from '../inputs/Input';
import { useAuthContext } from '../../context/AuthContext';

export default function AuctionShowPage() {
    const id = useParams().id;
    const [auction, setAuction] = useState<Auction | undefined>(undefined);
    const navigate = useNavigate();
    const [bid, setBid] = useState('')
    const { user } = useAuthContext();
    const [error, setError] = useState('')
    const sortedBids = (auction?.bids || []).slice().sort((a, b) => b.price - a.price);
    useEffect(() => {
        axios.get('/api/auctions/' + id)
            .then(res => {
                setAuction(res.data)
            })
            .catch(() => {
                navigate('/');
            })
    }, [id])
    if (!auction) {
        return null;
    }
    const minValue = sortedBids.length === 0 ? (auction.startPrice - 1) : sortedBids[0].price;
    return (
        <div className='container mt-5'>
            <div className='row'>
                <div className='col-6'>
                    <div className='mb-1'>
                        <strong>
                            {`Start time: ${format(auction.startTime * 1000, 'dd.MM.yyyy HH:mm')}`}
                        </strong>
                    </div>
                    <div className='mb-1'>
                        <strong>
                            {`Start price: ${auction.startPrice}`}
                        </strong>
                    </div>
                    <div className='mb-1'>
                        <strong>
                            {`Status: ${auction.status}`}
                        </strong>
                    </div>
                    <div className='mb-1'>
                        <strong>
                            {`Product: ${auction.product.name}`}
                        </strong>
                        <p className='p-2'>
                            {auction.product.description}
                        </p>
                    </div>
                    <div>
                        <img src={auction.product.image} alt="Product image" height={400} width='100%' />
                    </div>
                </div>
                <div className='col-6'>
                    <h4 className='text-center'>Bids</h4>
                    {
                        !user?.admin && (
                            <>
                                {
                                    !user && (
                                        <div>
                                            You need to login in order to create a bid
                                        </div>
                                    )
                                }
                                {
                                    user && (
                                        <>
                                            {
                                                sortedBids.length > 0 && sortedBids[0].user.id === user.id ? (
                                                    <div>
                                                        You are the leader
                                                    </div>
                                                ) : (
                                                    <>
                                                        <form
                                                            onSubmit={async (e) => {
                                                                e.preventDefault();
                                                                if (Number(bid) < minValue + 1) {
                                                                    return;
                                                                }
                                                                try {
                                                                    const res = await axios.post('/api/auctions/' + id + '/bids', { amount: bid })
                                                                    setBid('');
                                                                    setAuction(res.data);
                                                                    setError('');
                                                                } catch (error) {
                                                                    if (axios.isAxiosError(error)) {
                                                                        setError(error.response?.data.message || '')
                                                                    } else {
                                                                        setError('Could not create bid');
                                                                    }
                                                                }
                                                            }}
                                                            className='d-flex justify-content-between'>
                                                            <div className='input-wrapper' style={{ flex: 1 }}>
                                                                <Input value={bid} onChange={setBid} type='number' placeholder='Enter bid...' />

                                                            </div>
                                                            <button disabled={Number(bid) < minValue + 1} className='btn btn-secondary '>Make bid</button>
                                                        </form>
                                                        {
                                                            error && (
                                                                <span className='mt-2 text-danger'>{error}</span>
                                                            )
                                                        }
                                                    </>
                                                )
                                            }
                                        </>
                                    )
                                }
                            </>
                        )
                    }
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Created at</th>
                                <th>User</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                sortedBids.map(userBid => {
                                    return (
                                        <tr key={userBid.id}>
                                            <td>{format(userBid.createdAt, 'dd.MM.yyyy HH:mm')}</td>
                                            <td>{userBid.user.firstName + ' ' + userBid.user.lastName}</td>
                                            <td>{userBid.price}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
