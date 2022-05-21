import React, { useEffect, useState } from 'react'
import * as C from './styles'
import { Link } from 'react-router-dom'
import { useRef } from 'react'
import { ReactComponent as Dot } from '../../../img/svg/dot.svg'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../../redux/actions/userActions'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

export default function Login(props) {

  const email = useRef('')
  const password = useRef('')

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo, error } = userLogin

  useEffect(() => {
    if (userInfo === 'Wrong Password.') {
      return (
        Swal.fire({
          title: 'Wrong Password!',
          text: 'Insert your Password Again.',
          icon: 'error',
          confirmButtonText: 'OK, I Will Try.',
          showConfirmButton: 'true',
          confirmButtonColor: '#5c16c5',
          backdrop: 'true',
          width: '90%',
          height: 'auto',
          allowOutsideClick: 'false'

        }),
        localStorage.removeItem('userInfo')
      )
    }
    if (userInfo) {
      navigate('/')
    }
  }, [userInfo])


  const submitRegisterForm = (e) => {
    e.preventDefault()
    if (!(email.current.value).includes('@')) {
      return (
        Swal.fire({
          title: 'Email is Not Right!',
          text: 'Your Email is Not complete. Please, Check Again.',
          icon: 'error',
          confirmButtonText: 'I Got It',
          showConfirmButton: 'true',
          confirmButtonColor: '#5c16c5',
          backdrop: 'true',
          height: '80vh',
          width: '90%',
          allowOutsideClick: 'false'

        })
      )
    }
    if ((password.current.value).length < 8) {
      return (
        Swal.fire({
          title: 'Password is Too Short!',
          text: 'The password is shorter than 8 characters',
          icon: 'error',
          confirmButtonText: 'I Got It',
          showConfirmButton: 'true',
          confirmButtonColor: '#5c16c5',
          backdrop: 'true',
          height: '80vh',
          width: '90%',
          allowOutsideClick: 'false'

        })
      )
    }
    try {
      dispatch(login(email.current.value, password.current.value))
    } catch {
      return (
        Swal.fire({
          title: 'Error',
          text: 'Try Again Later.',
          icon: 'error',
          confirmButtonText: 'I Got It',
          showConfirmButton: 'true',
          confirmButtonColor: '#5c16c5',
          backdrop: 'true',
          width: '90%',
          height: 'auto',
          allowOutsideClick: 'false'

        })
      )
    }
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
      {/* {error && (<div>{Swal.fire(
        'The Internet?', 'That thing is still around?', 'question')}</div>)} */}
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
              <Link to={`/user/register`}>I don't Have a Account</Link>
            </div>
          </div>

        </form>
      </div>


    </C.Container>
  )
}
