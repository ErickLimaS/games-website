


import styled from 'styled-components'

export const Container = styled.div`

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    background-color: #181818;

    padding: 2rem 0;

    .loading-active{
        height: 90vh;

        display: flex;
        align-items: center;
    }

    div.title-section{
        
        font-size: 2.6rem;

        color: #fff;

        h1{
            border-bottom: 4px solid #5c16c5;
        }
        
        padding: 7rem 0;

        @media(max-width: 576px){

            font-size: 1.8rem;

        }
    }

    .dots-lenght-array{
        display: flex;

        margin: 1rem;

        span.dot{
            background-color: #fff;
            border-radius: 4000px;
            content: " ";

            cursor: pointer;
            
            margin: 0 5px;

            width: 10px;
            height: 10px;
        }

    }

`

export const GamesThisYear = styled.div`

    display: flex;
    flex-direction: row;
    
    width: 100%;
    height: 55vh;

    button{
        background-color: #181818;
        border: 0;
        color: #fff;

        cursor: pointer;

        :hover{
            svg{
                color: #fff;
            }
        }
        
        width: 5%;

        @media(max-width: 426px){

            width: 15%;

        }

        @media(max-width: 630px){

            width: 10%;

        }
        @media(max-width: 830px){

            width: 7%;

        }

        svg{
            color: #666666;
            height: 30px;
            width: auto;

            @media(max-width: 426px){

                height: 20px;

            }
        }
    }

    
    border-top: 2px solid #5c16c5;
    border-bottom: 2px solid #5c16c5;

    ul{
        width: 100%;
        

        li{
            width: 100%;
            height: 100%;

            > a{
                width: 100%;
            }

            div.bgc-img{
                background-position: center;
                background-repeat: no-repeat;
                background-size: cover;
                background-image: rgba(0,0,0,.5);


                width: 100%;
                height: 100%;

                >div.all-info{
                    height: 100%;

                    background-image: linear-gradient(to right,rgb(0 0 0 / 75%) 30%,rgb(255 255 255 / 0%));

                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;

                    :hover{
                    >div.game-name h2{
                        text-decoration: underline;
                    }
                }

                *{
                    color: #fff;
                }

                div.game-name{
                    h2{
                        padding: 2rem 1rem;
                        font-size: 4rem;
                        font-weight: 600;
                    }
                }

                div.game-release{

                    *{
                        color: #c0c0c0;
                    }

                    a {

                        :hover{
                            text-decoration: underline;
                        }
                    }

                    h3{
                        padding: 2rem 1rem;
                        font-size: 2.2rem;
                        font-weight: 400;
                    }
                    div.game-platforms{
                        
                        padding: 2rem 1rem;
                        display: flex;
                        flex-direction: row;

                        a{
                            
                            display: flex;
                            flex-direction: row;
                            width: max-content;

                            font-size: 1.8rem;
                            font-weight: 400;

                            ::after{
                                padding-right: 0.5rem;
                                content: ", ";
                            }
                            :last-child::after{
                                padding-right: 0;
                                content: " ";
                            }

                        }
                    }
                    div.game-themes{
                        display: flex;
                        flex-direction: row;

                        padding: 2rem 1rem;

                        a{
                            font-size: 1.6rem;
                            font-weight: 400;

                            display: flex;
                            flex-direction: row;

                            ::after{
                                padding-right: 0.5rem;
                                content: " | ";
                            }
                            :last-child::after{
                                padding-right: 0;
                                content: " ";
                            }


                        }
                    }
                }
            }
        }
    }

}
`

export const GamesReleased = styled.div`

    
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

                        display: flex;
                        justify-content: center;

                        color: #fff;
                        width: 80%;
                    }
                }

                img{
                    width: 120px;
                    height: auto;
                    margin: 5rem 7rem 0 7rem;
                    border: 1px solid transparent;
                }
                
        }
    }



`