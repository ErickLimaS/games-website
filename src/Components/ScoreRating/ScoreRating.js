import React from 'react'
import { Link } from 'react-router-dom'
import * as C from './styles'

export default function ScoreRating({ data }) {
  
  return (
    <C.Container data={data}>

      <span>
        {data.rating && (
          data.rating.toFixed(1))
        }
      </span>

    </C.Container >
  )
}
