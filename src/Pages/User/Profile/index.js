import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { getNewProfileChanges } from '../../../redux/actions/userActions'
import * as C from './styles'

export default function Profile() {

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const nameInput = useRef('')
  const passwordInput = useRef('')
  const confirmPasswordInput = useRef('')

  const navigate = useNavigate()

  document.title = 'Profile | My Next Game'

  useEffect(() => {

    if (userInfo == null) {
      navigate('/')
    }

  }, [])

  const dispatch = useDispatch()

  const handleNewProfileInfo = (e) => {
    e.preventDefault()

    if ((passwordInput.current.value).length < 8) {
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

    if (passwordInput.current.value !== confirmPasswordInput.current.value) {
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

    dispatch(getNewProfileChanges(
      userInfo.id,
      passwordInput.current.value,
      nameInput.current.value
    ))

  }

  return (
    <C.Container>

      <div>
        <h1>{userInfo.name}'s Profile</h1>

        <p>You can only change few information of your account. </p>
      </div>

      <C.ProfileForm>

        <form onSubmit={handleNewProfileInfo}>

          <div>
            <label htmlFor='id'>User ID</label>
            <input type='text' id='id' placeholder={`${userInfo.id}`} disabled></input>
          </div>

          <div>
            <label htmlFor='name'>Name</label>
            <input type='text' ref={nameInput} id='name' placeholder={`${userInfo.name}`}></input>
          </div>

          <div>
            <label htmlFor='email'>Email</label>
            <input type='email' id='email' placeholder={`${userInfo.email}`} disabled></input>
          </div>


          <div>
            <label htmlFor='new-password'>Password</label>
            <input type='password' ref={passwordInput} id='new-password' placeholder={`New Password`}></input>
          </div>


          <div>
            <label htmlFor='confirm-password'>Confirm Password</label>
            <input type='password' ref={confirmPasswordInput} id='confirm-password' placeholder={`Confirm Password`}></input>
          </div>

          <div>
            <label htmlFor='submit-button' />
            <label htmlFor='cancel-changes-button' />
            <button type='button' id='cancel-changes-button' onClick={() => navigate('/')}>Cancel Changes</button>
            <button type='submit' id='submit-button'>Submit Changes</button>
          </div>

        </form>

      </C.ProfileForm>


    </C.Container>
  )
}
