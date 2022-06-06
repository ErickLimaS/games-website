import styled from 'styled-components'

export const Containter = styled.div`

    div.loading{
        
        height: 0;
        svg{
            width: 90px;
        }
    }

    div.result-is-fetch{

        margin: 2rem 0;
        height: 0;

        font-size: 2rem;
        color: #f3f3f3;

        @media(max-width: 662px){
            height: initial;
        }

    }

    .search-platform{

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        height: 91vh;
        width: 100%;

        >div{
            margin: 2rem 0;
        }

        .heading{

            width: 70%;

            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            h1{
                font-size: 7rem;
                font-weight: 600;
                
                color: #fff;
                border-bottom: 4px solid #fff;
            }
            p{
                font-size: 2.4rem;
                font-weight: 400;

                color: #fff;
            }

        }

        .div-form{
                
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            width: 50%;

            @media(max-width: 1020px){
                width: 70%;
            }

            @media(max-width: 662px){
                width: 90%;
            }

            form{
                width: 80%;

                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;

                input{
                    padding: 1rem;
                    width: 60%;
                    
                    outline: 0;

                    border: 1px solid transparent;
                    border-radius: 4px 0 0 4px;
                    
                    font-size: 1.8rem;
                }
                button{
                    cursor: pointer;

                    padding: 1rem;
                    width: 30%;

                    background-color: #5c16c5;
                    color: #fff;

                    font-size: 1.8rem;

                    border: 1px solid #fff;
                    border-radius: 0 4px 4px 0;

                    :hover{
                        transition: all ease-in 100ms;
                        opacity: 0.8;
                    }
                }
            }
        }
        
    }

`

export const ConsoleList = styled.div`

    margin-top: ${props => props.results.length >= 1 && ('-10vh')};

    @media(max-width: 662px){
        margin-top: 0;
    }

    display: grid;
    justify-items: center;
    grid-gap: 2rem;
    grid-template-columns: ${props => {
        if (props.results.length >= 3) {
            return 'auto auto auto'
        }
        else if (props.results.length === 2) {
            return 'auto auto'
        }
        else {
            return 'auto'
        }
    }};

    @media(max-width: 1020px){
        grid-template-columns: auto auto;
    }

    @media(max-width: 662px){
        grid-template-columns: auto;
    }

    .platform{

        width: 50vh;

        display: flex;
        flex-direction: column;
        justify-content: center;

        padding: 1rem;

        background-color: #f1f1f1;
        border-radius: 4px;

        .platform-heading{

            margin: 1rem 0;
            
            a{
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: space-evenly;

                img{
                    width: 120px;
                    height: auto;
                }
                h2{
                    font-size: 2.6rem;
                    font-weight: 400;

                    color: #5c16c5;
                }

                :hover{
                    transition: all ease-in 100ms;
                    opacity: 0.8;
                }
            }

        }

        .details{

            margin: 1rem;

            p{
                padding: 0.5rem 1rem;

                font-size: 1.6rem;
                font-weight: 400;
            }

        }

        a.button{

            padding: 1rem;

            background-color: #5c16c5;
            border-radius: 4px;

            font-size: 1.4rem;

            color: #fff;

            display: flex;
            justify-content: center;

            :hover{
                transition: all ease-in 100ms;
                opacity: 0.8;
            }
        }
    }

`