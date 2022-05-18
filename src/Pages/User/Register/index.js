import React from 'react'
import * as C from './styles'
import Axios from 'axios'
import { Link } from 'react-router-dom'
import { useRef } from 'react'
import { ReactComponent as Dot } from '../../../img/svg/dot.svg'

export default function Register() {

  const name = useRef('')
  const email = useRef('')
  const password = useRef('')
  const confirmPassword = useRef('')
  const checkbox = useRef('')

  const submitRegisterForm = (e) => {
    console.log('oi')
  }

  return (
    <C.Container>

      <div className='explaining-text'>
        <h1>With A Account here on My Next Game you can</h1>
        <ul>
          <li><Dot /> Be Up to Date with the New Releases!</li>
          <li><Dot /> Get notified when a game changed its Score Rate!</li>
          <li><Dot /> Get informations only available here!</li>
          <li><Dot /> And More!</li>
        </ul>
      </div>

      <div>
        <form className='register-form' onSubmit={submitRegisterForm}>

          <h2>Sign Up</h2>

          <div>
            <label htmlFor='name'>Name</label>
            <input type='text' id='name' placeholder='Name' ref={name} required></input>
          </div>

          <div>
            <label htmlFor='email'>Email</label>
            <input type='email' id='email' placeholder='Email' ref={email} required></input>
          </div>

          <div>
            <label htmlFor='password'>Password</label>
            <input type='password' id='password' placeholder='Password' autoComplete='on' required ref={password} ></input>
          </div>

          <div>
            <label htmlFor='confirm-password'>Confirm Password</label>
            <input type='password' id='confirm-password' placeholder='Confirm Password' autoComplete='off' required ref={confirmPassword}></input>
          </div>

          <div className='checkbox'>
            <label htmlFor='checkbox'>Checking this, i accept all the terms of this site.{'(O site não tem Termos. É apenas para alusão.)'} </label>
            <input type='checkbox' id='checkbox' ref={checkbox} required></input>
          </div>

          <div className='buttons'>
            <div>
              <label />
              <button type='submit' placeholder='Confirm Password' required>Sign Up</button>
            </div>
            <div>
              <label />
              <Link to={`/user/login`}>Already have a Account?</Link>
            </div>
          </div>

        </form>
      </div>


    </C.Container>
  )
}
