import styled from 'styled-components'

export const Container = styled.div`

    background-image: linear-gradient(#5c16c5 50%,#FFF 100%);
    
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    padding: 3rem 0;

    width: 100%;

    div{
        margin: 0 1rem;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        
        @media(max-width: 425px){

            margin: 2rem 1rem;

            >h1{
                font-size: 5rem!important;
                font-weight: 600;
            }
            > p{
                font-size: 2rem!important;
                font-weight: 400!important;
            }

        }

        > h1{
            font-size: 7rem;
            font-weight: 600;
            color: #FFF;
        }
        > p{
            margin: 2rem 0;
            font-size: 3rem;
            font-weight: 400;
            color: #FFF;
        }
    }
`

export const ProfileForm = styled.div`

    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;

    form{
        padding: 2rem;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        background-color: #FFF;
        border-radius: 4px;

        box-shadow: 20px 19px 11px 8px #00000085;
        
        @media(max-width: 425px){
        
            box-shadow: none;
        }

        width: 80%;

        >div{
            margin: 1rem 0;

            
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;

            
            @media(max-width: 768px){
                flex-direction: column;

                width: 100%;

                label{
                    width: 100%!important;

                    margin: 0.5rem 0;

                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: center;
                }

                input{    
                    width: 90%!important;
                }

                button{
                    width: 100%;
                    border-radius: 4px!important;
                }
            }

            width: 50%;

            label{

                width: 30%;

                font-size: 2.2rem;
                font-weight: 400;
            }

            input{
                width: 70%;
                padding: 1rem;
                border-radius: 4px;

                font-size: 1.6rem;

                border: 2px solid #c0c0c0;
            }

            input:disabled{
                border: 2px solid rgba(0,0,0,.4);
                background-color: rgba(0,0,0,.1);

                cursor: not-allowed;
                
            }

        }

        >div:last-child{
 
            align-self: center!important;
            justify-content: center!important;

            > label{
                display: none;
            }

            > button#cancel-changes-button{
                cursor: pointer;

                margin: 1rem 2rem;

                padding: 1rem 2rem;

                background-color: #ff4d4d;
                color: #FFF;

                font-size: 1.4rem;
                font-weight: 600;

                border: 1px solid red;
                border-radius: 2px;

                :hover{
                    transition: all ease-in 100ms;
                    opacity: 0.8;
                }

            }
            > button#submit-button{
                cursor: pointer;

                margin: 1rem 2rem;

                padding: 1rem 2rem;

                
                font-size: 1.4rem;
                font-weight: 600;

                color: #FFF;
                background-color: #5cd65c;
                border: 1px solid green;
                border-radius: 2px;

                :hover{
                    transition: all ease-in 100ms;
                    opacity: 0.8;
                }

            }

        
        }

    }



`