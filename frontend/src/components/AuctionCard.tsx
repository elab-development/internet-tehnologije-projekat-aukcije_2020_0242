import React from 'react'
import { Auction, Bid } from '../types'
import { format } from 'date-fns'
import { Link } from 'react-router-dom';
interface Props {
    auction: Auction
}

export default function AuctionCard(props: Props) {
    const highestBid = props.auction.bids.reduce((acc, bid) => {
        if (!acc) {
            return bid;
        }
        return acc.price < bid.price ? bid : acc
    }, undefined as Bid | undefined);
    return (
        <div className="card" >
            <div className='card-header d-flex justify-content-between'>
                <strong>{`Start time: ${format(props.auction.startTime * 1000, 'dd.MM.yyyy HH:mm')}`}</strong>
                <strong>
                    {`Status: ${props.auction.status}`}
                </strong>
            </div>

            <img className="card-img-top" src={props.auction.product.image} alt="Product image" />
            <div className="card-body">
                <h5 className="card-title">{props.auction.product.name}</h5>
                <p className="card-text">{props.auction.product.description}</p>
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">{`Start price: ${props.auction.startPrice}`}</li>
                {highestBid && (
                    <>
                        <li className="list-group-item">{`Highest bid: ${highestBid.price}`}</li>
                        <li className="list-group-item">{`User: ${highestBid.user.firstName + ' ' + highestBid.user.firstName}`}</li>
                    </>
                )}
                <li className="list-group-item">
                    <Link to={'/auction/' + props.auction.id}>
                        <button className='btn btn-primary'>Details</button>
                    </Link>
                </li>
            </ul>
        </div>
    )
}
