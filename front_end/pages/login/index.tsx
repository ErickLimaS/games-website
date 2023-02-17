import { logInUser } from '@/api/server'
import AlertMessage from '@/components/AlertMessage'
import CustomDocumentHead from '@/components/CustomDocumentHead'
import Link from 'next/link'
import React, { FormEvent, useState } from 'react'
import Styles from './LoginStyles.module.css'
import Logo from '../../public/img/logo/logo.png'
import Image from 'next/image'
import Spinner from '../../public/img/icons/Spinner1S200Px'

function Login() {

    const [loading, setLoading] = useState<Boolean>(false)

    async function submitHandler(e: FormEvent) {

        e.preventDefault()

        setLoading(true)

        const form = e.target as HTMLFormElement

        const user: LogIn = {
            email: form.email.value,
            password: form.password.value
        }

        const res = await logInUser(user)

        if (res) {

            // gets the html to server response, then shows on screen
            const message = AlertMessage(res)

            const pageContainer = document.getElementById(`conxtainer`);
            document.body.insertBefore(message, pageContainer);

        }

        setLoading(false)

    }

    return (

        <>
            <CustomDocumentHead title="Login" />

            <div id={Styles.container}>

                <div className={`${Styles.content_container} ${Styles.row}`}>

                    <div className={Styles.text_container}>

                        <h1 id={Styles.heading}>Login</h1>

                        <p>Volte a salvar os seus jogos entrando em sua conta!</p>

                        <Link href="/signup">Não tem uma conta? Clique aqui!</Link>

                    </div>

                    <div className={Styles.form_container}>

                        <div className={Styles.img_container}>
                            <Image src={Logo} fill alt='Logo da My Next Game'></Image>
                        </div>

                        <form onSubmit={(e) => submitHandler(e)} aria-label={Styles.heading}>

                            <div className={Styles.input_container}>

                                <label>
                                    Email
                                    <input type="email" placeholder='email' name='email' required></input>
                                </label>

                                <label>
                                    Senha
                                    <input type="password" placeholder='senha'
                                        name='password'
                                        title='Precisa ter 8 caracteres, com números e letras.'
                                        pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
                                        required
                                    ></input>
                                </label>

                            </div>

                            <button type='submit'
                                disabled={loading ? true : false}
                            >
                                {loading ? <Spinner /> : 'LOGIN'}
                            </button>

                        </form>

                    </div>

                </div>

            </div>

        </>
    )
}

export default Login