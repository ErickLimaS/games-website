import styled from 'styled-components'

export const Container = styled.div`

    .loading-active{
        height: 100vh;

        display: flex;
        justify-content: center;
        align-items: center;
    }

`

export const HeadingContent = styled.div`



    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .genre-name-heading{

        height: 100%;
        width: 100%;
        background-color: rgba(0,0,0,.7);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        h1{
            color: #fff;
            font-size: 8rem;
            font-weight: 600;
        }
        p{
            color: #5c16c5;
            font-size: 3rem;
            font-weight: 400;
        }

        @media(max-width: 425px){

            *{
                padding: 0 1rem;
            }

            h1{
                font-size: 6.4rem;
            }
        }

    }


`

export const GamesFromThisGenre = styled.div`

    border-top: 2px solid #fff;
    background-image: linear-gradient(rgba(0,0,0,.95),  rgba(0,0,0,.25));
    width: 100%;

    padding: 2rem 0;
    
    div{
        margin: 2rem 0%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;

        h2{
            font-size: 4rem;
            font-weight: 600;
            color: #fff;
            border-bottom: 4px solid #5c16c5;
        }
    }

    ul{

        display: grid;
        grid-template-columns: 20% 20% 20% 20%;
        grid-gap: 2rem;
        justify-content: center;
        justify-items: center;
        align-items: center;

        margin: 2rem 0;

        @media(max-width: 1230px){
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
        }

        li{
                background-size: cover;
                background-position: center;
                border-radius: 10px;
                width: fit-content;

                margin: 1rem;
                
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
                height: 100%;

                :hover{
                    transition: all ease-in-out 100ms;
                    transform: scale(1.02);
                }

                a{
                    height: 100%;
                    background-color: rgba(0,0,0,.6);
                    border-radius: 10px;
                    
                    display: flex;
                    flex-direction: column;
                    align-items: center;

                    :hover{
                        transition: all ease-in 200ms;
                        background-color: rgba(0,0,0,.4);

                    }

                    :hover > img{
                        transition: all ease-in 100ms;
                        border: 1px solid #f1f1f1;
                    }

                    h3{
                        font-size: 1.4rem;
                        font-weight: 400;
                        color: #fff;
                        width: fit-content;
                    }
                }

                img{
                    width: 120px;
                    height: auto;
                    margin: 5rem 7rem 0 7rem;
                    border: 1px solid transparent;
                }
                div.rating{
                    margin-bottom: 5rem;
                    margin: 1rem 0;

                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    
                    p{
                        border-radius: 4000px;
                        background-color: #FFF;
                        width: min-content;
                        padding: 1.2rem 1rem;
                        font-size: 1.2rem;
                        font-weight: 600;
                        color: initial;
                    }
                }
        }
    }
`