import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function BitcoinToUsd() {
    const [btcToUsd, setBtcToUsd] = useState<any>([])

    useEffect(() => {
        const ref = setInterval(() => {
            axios.get('/api/btc-usd')
                .then(res => setBtcToUsd(JSON.parse(res.data)));
        }, 4000)
        return () => {
            clearInterval(ref);
        }
    }, [])

    if (!btcToUsd) {
        return null;
    }
    const average = (btcToUsd[0] + btcToUsd[2]) / 2;
    return (
        <div className='text-white'>
            {`BTC: ${average.toFixed(2)} USD`}
        </div>
    )
}
