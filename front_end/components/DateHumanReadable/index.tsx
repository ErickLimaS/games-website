import React from 'react'

function DateHumanReadable({ date }: { date: number }) {
    return (
        <>
            {new Date(date * 1000).toLocaleString('default', { month: 'long' })} {new Date(date * 1000).getFullYear()}
        </>
    )
}

export default DateHumanReadable