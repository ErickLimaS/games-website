import { signUpUser } from '@/api/server'
import AlertMessage from '@/components/AlertMessage'
import CustomDocumentHead from '@/components/CustomDocumentHead'
import React, { FormEvent, useEffect, useState } from 'react'
import Styles from './SignupStyles.module.css'

function Signup() {

    async function submitHandler(e: FormEvent) {

        e.preventDefault()

        const form = e.target as HTMLFormElement

        const user: SignUp = {
            user: {
                name: {
                    first: form.first_name.value,
                    last: form.last_name.value,
                },
                email: form.email.value,
                password: form.password.value,
                birthDate: {
                    date: new Date(form.date.value).getDate() + 1,
                    month: new Date(form.date.value).getMonth(),
                    year: new Date(form.date.value).getFullYear(),
                }
            }
        }

        const res = await signUpUser(user)

        if (res) {

            // gets the html to server response, then shows on screen
            const message = AlertMessage(res)

            const pageContainer = document.getElementById(`conxtainer`);
            document.body.insertBefore(message, pageContainer);

        }

    }

    return (

        <>
            <CustomDocumentHead title="Cadastro" />

            <div id={Styles.container}>

                <div className={`${Styles.content_container} ${Styles.row}`}>

                    <div className={Styles.text_container}>

                        <h1 id={Styles.heading}>Cadastro</h1>

                        <p>Junte-se a mais de 1 milhão* de usuários!</p>

                    </div>

                    <div className={Styles.form_container}>

                        <form onSubmit={(e) => submitHandler(e)} aria-label={Styles.heading}>

                            <label>
                                Primeiro Nome
                                <input type="text" placeholder='Nome' name='first_name' required></input>
                            </label>

                            <label>
                                Último Nome
                                <input type="text" placeholder='Sobrenome' name='last_name' required></input>
                            </label>

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

                            <label>
                                Data de Nascimento
                                <input type="date" name='date' required></input>
                            </label>

                            <button type='submit'>CADASTRAR</button>

                        </form>

                    </div>

                </div>

            </div>

        </>
    )
}

export default Signup