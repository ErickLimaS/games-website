import styled from 'styled-components'

export const Container = styled.div`

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    background-color: #181818;

    padding-bottom: 2rem;

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

export const HighlightedGame = styled.div`

    display: flex;
    flex-direction: row;
    
    width: 100%;
    height: 91vh;

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

    /* border-top: 2px solid #5c16c5; */
    /* border-bottom: 2px solid #5c16c5; */

    ul{
        width: 100%;

        li{
            width: 100%;
            height: 100%;

            > a{
                width: 100%;
            }

        }

    }
`

export const GameMapItem = styled.div`

                background-image: ${props => props.data.screenshots && `url(//images.igdb.com/igdb/image/upload/t_screenshot_big/${props.data.screenshots[0].image_id}.jpg)`};

                background-image: ${props => props.data.artwork ? `url(//images.igdb.com/igdb/image/upload/t_screenshot_big/${props.data.artwork[0].image_id}.jpg)` : `#c0c0c0`};


                background-position: center;
                background-repeat: no-repeat;
                background-size: cover;
                background-image: rgba(0,0,0,.5);

                width: 100%;
                height: 100%;

                div.all-info{
                    height: 100%;
                    width: 50%;

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
                    >*{
                        padding-left: 1rem;
                    }

                    div.game-name{

                        height: 40%;

                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        
                        h2{
                            font-size: 4rem;
                            font-weight: 600;
                        }
                    }

                    div.game-release{

                        height: 60%;
                        
                        display: flex;
                        flex-direction: column;
                        justify-content: flex-end;
                        
                        *{
                            color: #c0c0c0;
                        }

                        >p{ 
                            font-size: 1.6rem;
                            font-weight: 400;

                            height: 80%;

                            overflow: auto;

                            ::-webkit-scrollbar {
                                width: 10px;
                            }

                            ::-webkit-scrollbar-track {
                                background: #f1f1f1; 
                            }
                            
                            ::-webkit-scrollbar-thumb {
                                background: #888; 
                            }
                            
                            ::-webkit-scrollbar-thumb:hover {
                                background: #555; 
                            }
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
                                    white-space: pre;
                                    content: ", ";
                                }
                                :last-child::after{
                                    content: "";
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
                                    white-space: pre;
                                    content: ", ";
                                }
                                :last-child::after{
                                    content: "";
                                }


                            }
                        }
                    }
            }

`

export const GamesReleased = styled.div`

    background-image: linear-gradient(rgba(0,0,0,.95), rgba(0,0,0,.25));
    width: 100%;

    padding: 2rem 0;
    margin: 0 2rem;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    h1.second-title{
        font-size: 3.8rem;
        font-weight: 400;

        margin: 1rem 0 2rem 0;

        border-bottom: 4px solid blueviolet;
        color: #fff;
    }
    
    ul{
        background-color: rgba(250,250,250,0.1);

        width: 70%;

        padding: 0 1rem;

        @media(max-width: 1020px){
            width: 90%;
        }

        li{

            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;

            @media(max-width: 460px){

                justify-content: center;
                flex-wrap: wrap;

            }

            border-radius: 4px;

            margin: 1rem 0;
            
            background-color: rgba(0,0,0,0.30);

            >*, a{
                color: #fff;
            }

            a{
                font-size: 1.4rem;
                font-weight: 400;

                @media(max-width: 460px){

                    font-size: 1.0rem;

                }

                :hover{
                    transition: all ease-in-out 100ms;
                    text-decoration: underline;
                }
            }

            >div{
                width: 90%;

                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: space-around;

                @media(max-width: 460px){

                    margin: 1rem 0;

                    flex-direction: column;

                }

            }

            h2:last-child{
                margin-right: 1rem;
            }

            :hover{
                transition: all ease-in-out 100ms;
                opacity: 0.7;
            }
        }

    }

`