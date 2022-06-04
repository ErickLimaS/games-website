import styled from 'styled-components'

export const Container = styled.div`

    height: 91vh;

    display:flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;

    background-color: #5c16c5;

    @media(max-width: 900px){
        flex-direction: column-reverse;
        height: auto;
        padding: 2rem 0;
        padding-bottom: 10rem;
    }

    .explaining-text{

        width: 45%;

        @media(max-width: 900px){
            width: 90%;
            margin: 2rem 0;
        }

        h1{
            font-size: 6rem;
            color: #FFF;
        }

        ul{
            margin: 3rem 0;
            margin-left: 4rem;

            li{
                font-size: 2rem;
                margin: 1rem 0;

                color: #FFF;

                display:flex;
                flex-direction: row;
                align-items: center;

                svg{
                    width: 30px;
                    height: 30px;
                    color: #FFF;
                }
            }

        }
    }

    form.register-form{

        width: 400px;
        height: auto;
        background-color: #f1f1f1;
        border-radius: 10px;

        display:flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        @media(max-width: 900px){
            width: 60vh;
            height: 60vh;
        }

        @media(max-width: 500px){
            width: 50vh;
            height: 70vh;
        }

        @media(max-width: 424px){
            width: 360px;
            height: 70vh;
        }

        @media(max-width: 364px){
            width: 310px;
        }

        h2{
            margin: 2rem 0;
            
            font-size: 2.6rem;
            font-weight: 400;

            border-bottom: 2px solid #5c16c5;
        }

        >div{
            margin: 0.8rem 1.5rem;
            width: -webkit-fill-available;

            display: flex;
            flex-direction: column;

            label{
                font-size: 1.6rem;
            }

            input{
                margin: 0.2rem 0;
                padding: 0.8rem;
                font-size: 1.6rem;
                border: 1px solid #c0c0c0;
                border-radius: 4px;

                :focus-visible{
                    outline: 2px solid #a3a3a3;
                }
            }

        }
        div.checkbox{
            display: flex;
            flex-direction: row-reverse;
            align-items: center;
            margin: 1.8rem 1rem;

            *{
                margin: 0 0.5rem;
            }

            input{
                height: 4rem;
                width: 4rem;
            }

            label{
                font-size: 1.6rem;
            }
        }
        div.buttons{
            display: flex;
            flex-direction: column;
            align-items: center;

            >div{
                transition: all ease-in 200ms;
                margin: 1rem 0;
                
                width: inherit;

                button{
                    padding: 0.8rem 1rem;
                    width: inherit;

                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: center;
                    

                    font-size: 2rem;
                    font-weight: 400;
                    color: #FFF;
                    cursor: pointer;

                    background-color: #6b19e6;
                    border: 1px solid #7a30e8;
                    border-radius: 4px;
                    
                    svg{
                        margin: 0;

                        height: auto;
                        width: 30px;

                        transform: scale(1.5);
                    }

                    :hover{
                        opacity: 0.9;
                        border: 1px solid #6017cf;
                    }

                }
                a{
                    font-size: 1.6rem;
                    color: inherit;
                    width: inherit;

                    :hover{
                        text-decoration: underline;
                    }
                }
               
                
            }

        }
    }

`