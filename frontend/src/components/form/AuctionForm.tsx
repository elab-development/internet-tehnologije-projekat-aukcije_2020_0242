import React, { useState } from 'react'
import { CreateAuction, Product } from '../../types'
import Input from '../inputs/Input'
import Select from '../inputs/Select'

interface Props {
    onSubmit: (p: CreateAuction) => void,
    products: Product[]
}


export default function AuctionForm(props: Props) {
    const [auctionData, setAuctionData] = useState<CreateAuction>({
        endTime: '',
        startPrice: 0,
        productId: 0,
        startTime: ''
    })
    return (
        <div>
            <h3 className='text-center m-2'>
                Create auction
            </h3>
            <form onSubmit={e => {
                e.preventDefault();
                props.onSubmit(auctionData)
            }}>
                <Input
                    label='Start time'
                    placeholder='Start time'
                    required
                    type='datetime-local'
                    value={auctionData.startTime}
                    onChange={val => setAuctionData(prev => { return { ...prev, startTime: val } })}
                />
                <Input
                    label='End time'
                    placeholder='End time'
                    required
                    type='datetime-local'
                    value={auctionData.endTime}
                    onChange={val => setAuctionData(prev => { return { ...prev, endTime: val } })}
                />
                <Input
                    label='Start price'
                    placeholder='Start price'
                    required
                    type='number'
                    value={auctionData.startPrice}
                    onChange={val => setAuctionData(prev => { return { ...prev, startPrice: Number(val) } })}
                />
                <Select
                    label='Product'
                    data={props.products.map(product => {
                        return {
                            label: product.name,
                            value: product.id
                        }
                    })}
                    value={auctionData.productId}
                    onChange={val => setAuctionData(prev => { return { ...prev, productId: Number(val) } })}
                />
                <button className='btn btn-primary mt-2 form-control'>Save</button>
            </form>
        </div>
    )
}
