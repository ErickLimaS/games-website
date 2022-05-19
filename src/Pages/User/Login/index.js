import React from 'react'
import * as C from './styles'
import Axios from 'axios'
import { Link } from 'react-router-dom'
import { useRef } from 'react'
import { ReactComponent as Dot } from '../../../img/svg/dot.svg'
import { useDispatch } from 'react-redux'
import { login } from '../../../redux/actions/userActions'

export default function Login() {

  const email = useRef('')
  const password = useRef('')

  const dispatch = useDispatch()

  const submitRegisterForm = (e) => {
    e.preventDefault()
    dispatch(login(email.current.valueOf, password.current.value))
  }

  return (
    <C.Container>

      <div className='explaining-text'>
        <h1>With A Account here in My Next Game you can</h1>
        <ul>
          <li><Dot /> Be Up to Date with the New Releases!</li>
          <li><Dot /> Get notified when a game changed its Score Rate!</li>
          <li><Dot /> Get informations only available here!</li>
          <li><Dot /> And More!</li>
        </ul>
      </div>
      <div>
        <form className='register-form' onSubmit={submitRegisterForm}>

          <h2>Login</h2>

          <div>
            <label htmlFor='email'>Email</label>
            <input type='email' id='email' placeholder='Email' ref={email} required></input>
          </div>

          <div>
            <label htmlFor='password'>Password</label>
            <input type='password' id='password' placeholder='Password' autoComplete='on' required ref={password} ></input>
          </div>

          <div className='buttons'>
            <div>
              <label />
              <button type='submit' placeholder='Confirm Password' required>Login</button>
            </div>
            <div>
              <label />
              <Link to={`/user/register`}>Dont Have a Account?</Link>
            </div>
          </div>

        </form>
      </div>


    </C.Container>
  )
}
