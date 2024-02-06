import React, { useEffect, useState } from 'react'
import { Category, CreateProduct, Product } from '../../types'
import Input from '../inputs/Input'
import CheckBox from '../inputs/CheckBox'
import Select from '../inputs/Select'

interface Props {
    product?: Product,
    onSubmit: (p: CreateProduct) => void,
    categories: Category[]
}

const emptyProduct = {
    description: '',
    image: '',
    name: '',
    sold: false,
    categoryId: ''
}

export default function ProductForm(props: Props) {
    const [productData, setProductData] = useState<CreateProduct>(emptyProduct)

    useEffect(() => {
        if (props.product) {
            setProductData({
                description: props.product.description,
                name: props.product.name,
                categoryId: props.product.category ? (props.product.category.id + '') : '',
                image: props.product.image,
                sold: props.product.sold,
            })
        } else {
            setProductData(emptyProduct)
        }
    }, [props.product])


    return (
        <div>
            <h3 className='text-center m-2'>
                {props.product ? 'Update product' : 'Create product'}
            </h3>
            <form onSubmit={e => {
                e.preventDefault();
                props.onSubmit(productData)
            }}>
                <Input
                    label='Name'
                    placeholder='Name'
                    required
                    value={productData.name}
                    onChange={val => setProductData(prev => { return { ...prev, name: val } })}
                />
                <Input
                    label='Image'
                    placeholder='Image'
                    required
                    value={productData.image}
                    onChange={val => setProductData(prev => { return { ...prev, image: val } })}
                />
                <Input
                    label='Description'
                    placeholder='Description'
                    required
                    textArea
                    value={productData.description}
                    onChange={val => setProductData(prev => { return { ...prev, description: val } })}
                />
                <Select
                    label='Category'
                    value={productData.categoryId}
                    data={props.categories.map(c => {
                        return {
                            value: c.id,
                            label: c.name
                        }
                    })}
                    onChange={val => {
                        setProductData(prev => {
                            return {
                                ...prev,
                                categoryId: val + ''
                            }
                        })
                    }}
                />
                <CheckBox
                    label='Sold'
                    checked={productData.sold}
                    onChange={() => setProductData(prev => { return { ...prev, sold: !prev.sold } })}
                />
                <button className='btn btn-primary mt-2 form-control'>Save</button>
            </form>
        </div>
    )
}
