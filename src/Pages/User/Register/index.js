import React, { useEffect } from 'react'
import * as C from './styles'
import { ReactComponent as SpinnerSvg } from '../../../img/svg/Spinner-1s-200px.svg'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useRef } from 'react'
import { ReactComponent as Dot } from '../../../img/svg/dot.svg'
import { register } from '../../../redux/actions/userActions'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

export default function Register(props) {

  const name = useRef('')
  const email = useRef('')
  const password = useRef('')
  const confirmPassword = useRef('')
  const checkbox = useRef('')

  const navigate = useNavigate()

  const userRegister = useSelector((state) => state.userRegister)
  const { userInfo, loading } = userRegister

  const dispatch = useDispatch()

  document.title = 'Register | My Next Game'

  const submitRegisterForm = (e) => {
    e.preventDefault();

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
          width: '90%',
          height: 'auto',
          allowOutsideClick: 'false'

        })
      )
    }

    if (password.current.value !== confirmPassword.current.value) {
      return (
        Swal.fire({
          title: `Password and Confirm Password Don't Match!`,
          text: 'The password and confirm password is not the same.',
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

    dispatch(register(name.current.value, email.current.value, password.current.value))
    navigate('/')
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
          {/* <form className='register-form'> */}

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
              {/* <button type='button' onClick={submitRegisterForm} placeholder='Confirm Password' required>Sign Up</button> */}
              <button type='submit' placeholder='Confirm Password' required>{!loading ? 'Sign Up' : <SpinnerSvg />}</button>
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
