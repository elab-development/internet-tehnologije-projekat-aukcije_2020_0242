import React from 'react'
import { Product } from '../types'


interface Props {
    product: Product
}

export default function ProductCard(props: Props) {
    return (
        <div className="card" >
            <div className='card-header d-flex justify-content-between'>
                <strong>{`ID: ${props.product.id}`}</strong>
                {
                    props.product.sold && (
                        <strong >
                            Sold
                        </strong>
                    )
                }
            </div>

            <img className="card-img-top" src={props.product.image} alt="Product image" />
            <div className="card-body">
                <h5 className="card-title">{props.product.name}</h5>
                <p className="card-text">{props.product.description}</p>
                {
                    props.product.category && (
                        <h6 className="card-text">{props.product.category?.name}</h6>
                    )
                }
            </div>
        </div>
    )
}
