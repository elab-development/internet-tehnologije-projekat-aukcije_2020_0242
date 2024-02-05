import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { Auction, Pagination } from '../../types';
import axios from 'axios';
import AuctionCard from '../AuctionCard';
import Input from '../inputs/Input';
import CheckBox from '../inputs/CheckBox';

export default function UserAuctionPage() {
    const search = useLocation().search;
    const [auctions, setAuctions] = useState<Pagination<Auction> | undefined>(undefined);
    const navigate = useNavigate();
    const parsed = new URLSearchParams(search);
    useEffect(() => {
        axios.get('/api/auctions' + search)
            .then(res => setAuctions(res.data))
            .catch(() => setAuctions(undefined))
    }, [search])
    return (
        <div className='container px-5'>
            <h3 className='text-center m-3'>Search auctions</h3>
            <div className='row'>
                <div className='col-6'>
                    <Input label='Search' value={parsed.get('search') || ''} onChange={val => {
                        parsed.set('search', val);
                        navigate('/?' + parsed.toString());
                    }} />
                    <Input label='From' type='date' value={parsed.get('from') || ''} onChange={val => {
                        parsed.set('from', val);
                        navigate('/?' + parsed.toString());
                    }} />
                    <Input label='To' type='date' value={parsed.get('to') || ''} onChange={val => {
                        parsed.set('to', val);
                        navigate('/?' + parsed.toString());
                    }} />
                    <CheckBox
                        label='Only active'
                        checked={Number(parsed.get('onlyActive')) == 1}
                        onChange={() => {
                            parsed.set('onlyActive', Number(parsed.get('onlyActive')) == 1 ? '0' : '1');
                            navigate('/?' + parsed.toString());
                        }}
                    />
                </div>
                <div className='col-6'>
                    {
                        auctions?.data.map(auction => {
                            return (
                                <div className='mb-2'>
                                    <AuctionCard auction={auction} key={auction.id} />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}
