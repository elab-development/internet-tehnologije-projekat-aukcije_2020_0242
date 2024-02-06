import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

export default function StatisticsPage() {
    const [data, setData] = useState([] as any[])

    useEffect(() => {
        axios.get('/api/product-statistics')
            .then(res => setData(res.data))
    }, [])

    return (
        <div className='container'>
            <h2 className='text-center m-2'>Product statistics</h2>
            <ResponsiveContainer width='100%' aspect={2.3}>
                <BarChart data={data}>
                    <XAxis dataKey='name' />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey='active' fill='#9dd7f5' />
                    <Bar dataKey='success' fill='#3cde10' />
                    <Bar dataKey='failed' fill='#d60909' />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}
