import React from 'react'
import { Link } from 'react-router-dom'
import * as C from './styles'

export default function ScoreRating({ data }) {

  console.log(data)

  return (
    <C.Container data={data}>


      <span style={(data.rating >= 75 && {
        backgroundColor: 'green'
      }) || (data.rating < 75 && data.rating > 50 && {
        backgroundColor: '#fc3'
      }) || (data.rating < 50 && {
        backgroundColor: 'red'
      })}>
        {(data.rating).toFixed(1)}</span>

    </C.Container >
  )
}
