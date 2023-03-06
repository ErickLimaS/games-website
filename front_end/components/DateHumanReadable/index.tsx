import React from 'react'

function DateHumanReadable({ date, fullDate }: { date: number, fullDate?: boolean }) {
    return (
        fullDate ? (
            <>

                {new Date(date * 1000).getDate()}
                {' '}
                {new Date(date * 1000).toLocaleString(
                    'default',
                    { month: 'long' })
                }
                {' de '}
                {new Date(date * 1000).getFullYear()}
            </>
        ) : (
            <>
                {new Date(date * 1000).toLocaleString(
                    'default',
                    { month: 'long' })
                }
                {' '}
                {new Date(date * 1000).getFullYear()}
            </>
        )
    )
}

export default DateHumanReadable