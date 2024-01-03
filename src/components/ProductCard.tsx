import React from 'react'
import { Product } from '../types'


interface Props {
    product: Product
}

export default function ProductCard(props: Props) {
    return (
        <div className="card" >
            {
                props.product.sold && (
                    <div className='card-header'>
                        Sold
                    </div>
                )
            }
            <img className="card-img-top" src={props.product.image} alt="Product image" />
            <div className="card-body">
                <h5 className="card-title">{props.product.name}</h5>
                <p className="card-text">{props.product.description}</p>
            </div>
        </div>
    )
}
