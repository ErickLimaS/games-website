import styled from 'styled-components'

export const Container = styled.div`

    background-color: #181818;

    padding: 2rem 0;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .loading-active{
        height: 90vh;

        display: flex;
        align-items: center;
    }

    >h1{
        font-size: 6rem;
        color: #fff;
        border-bottom: 4px solid #5c16c5;

        margin: 1rem 0;
    }

`
export const Heading = styled.div`

    .bg-img{
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;

        height: auto;
    
        .game-info{

            background-image: linear-gradient(to right,rgb(0 0 0 / 75%) 90%,rgb(255 255 255 / 0%));

            width: 40%;
            height: 100%;

            padding-left: 2rem;
            
            @media(max-width: 600px){
                width: 100%;
                padding: 0;

                background-image: linear-gradient(to right,rgb(0 0 0 / 75%) 100%,rgb(255 255 255 / 0%));

            }


            *{
                color: #fff;
            }

            display: flex;
            flex-direction: column;
            justify-content: space-between;

            h2{
                padding: 3rem 0;
                font-size: 4rem;
                font-weight: 600;
            }
            
            .rating{

                padding: 0;
                display: flex;
                align-items: center;
                justify-content: center;

                width: 100%;

                span{
                    
                    display: flex;
                    align-items: center;
                    justify-content: center;

                    border-radius: 4px;
                    width: 50px;
                    height: 50px;

                    font-size: 1.6rem;
                    font-weight: 600;
                }
            }

            >div{

                display: flex;
                flex-direction: row;
                flex-wrap: wrap;

                p, >div{
                    color: #c0c0c0;
                    padding: 2rem 0;
                }

                p{
                    font-size: 1.6rem;
                    font-weight: 400;
                }
                a{
                    color: #c0c0c0;
                    font-size: 1.4rem;
                    font-weight: 400;

                    :hover{
                    color: #fff;
                        text-decoration: underline;
                    }
                }

                .platforms{
                    a::after{
                        content: " | ";
                    }
                    a:last-child::after{
                        content: " ";
                    }
                }
                .themes{
                    a::after{
                        content: " | ";
                    }
                    a:last-child::after{
                        content: " ";
                    }
                }
                
            }
        }


    }



`

export const GamesList = styled.div`

    >h2{
        font-size: 4rem;
        color: #fff;
        border-bottom: 4px solid #5c16c5;

        margin: 2rem 0;
    }

    ul{

    display: grid;
    grid-template-columns: 20% 20% 20% 20%;
    grid-gap: 4rem;
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