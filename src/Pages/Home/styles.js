import styled from 'styled-components'

export const Container = styled.div`



    div.mobile-website-heading{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin: 0 2rem;

        @media(max-width: 620px){
            width: -webkit-fill-available;
        }

        *{
            margin: 2rem 0;
        }

        h1{
            color: #5c16c5;
            font-size: 6rem;
            font-weight: 600;

            @media(max-width: 620px){
                width: -webkit-fill-available;
            }
        }
        h2{
            color: #000;
            font-size: 4rem;
            font-weight: 400;
            width: 70%;

            @media(max-width: 620px){
                width: -webkit-fill-available;
            }
        }

        @media(max-width: 620px){
            display: flex;
        }
        @media(min-width: 621px){
            display: none;
        }
    }

`

export const HeadingContent = styled.div`

    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: top;
    background-cover: cover;

    @media(max-width: 620px){
        height: auto;
        background-position: center;
    }
    @media(min-width: 860px){
        height: 65vh;
    }
    

    div.desktop-website-heading{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 50%;
        height: auto;
        height: -webkit-fill-available;
        background-image: linear-gradient(to right, rgba(0,0,0,.85) 70%, rgba(0,0,0,.4) 95%, rgba(0,0,0,.02) 100%);

        @media(max-width: 620px){
            width: -webkit-fill-available;
            display: none;
        }

        *{
            margin: 2rem 0;
        }

        h1{
            color: #5c16c5;
            font-size: 6rem;
            font-weight: 600;
            width: 60%;

            @media(max-width: 620px){
                width: -webkit-fill-available;
            }
        }
        h2{
            color: #FFF;
            font-size: 2rem;
            font-weight: 400;
            width: 70%;

            @media(max-width: 620px){
                width: -webkit-fill-available;
            }
        }
    }

    .info-game-to-be-released{
        height: auto;
        width: 30%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-image: linear-gradient(to left, rgba(0,0,0,.5) 80%, rgba(0,0,0,.2) 95%, rgba(0,0,0,.02) 100%);

        @media(max-width: 620px){
            width: -webkit-fill-available;
            background-image: initial;
            background-color: rgba(0,0,0,.5);
        }

        *{
            margin: 2rem 0;
        }

        h2{            
            width: 80%;
            color: #FFF;
            font-size: 2rem;
            font-weight: 400;

            
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }

        div{
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }

        a{            
            width: 80%;
            color: #FFF;
            font-size: 3rem;
            font-weight: 400;
        }
        h3{
            width: 100%;
            color: #FFF;
            font-size: 1.8rem;
            font-weight: 400;
            a{
                color: #FFF;
                border-bottom: 2px solid #5c16c5;
            }
        }

        ul{
            display: flex;
            flex-direction: row;

            li{
                font-size: 1.8rem;
                color: #FFF;
                margin: 0 0.5rem;
            }
            li::after{
                content: ',';
            }
            li:last-child{
                ::after{
                    content: '.';
                }
            }
        }


        a.a-tag-button-style{
            font-size: 2.4rem;
            width: 50%;
            display: flex;
            justify-content: center;
            padding: 0.5rem;
            border-radius: 4px;
            border: 1px solid rgba(250,250,250,.5);
            background-color: #7a30e8;

            :hover{
                background-color: #5c16c5;
                border: 1px solid #FFF;
            }
        }
    }

`

export const HighestRatingsLastMonth = styled.section`

    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 2rem;

    h2:first-child{
        border-bottom: 4px solid #5c16c5;
        width: max-content;
        font-size: 3rem;
        font-weight: 600;
    }

    .ratings-section{
        display: flex;
        flex-direction: row;
        margin: 1rem 0;

        .ratings-text{
            height: 50%;

            h3{
                color: #5c16c5;
                font-size: 3rem;
                font-weight: 600;
            }
            p{
                font-size: 2rem;
                font-weight: 400;
            }
            
        }

        .ratings-games{

            width: 50%;
            ul{
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
                overflox: auto;

                li:first-child{
                    display: flex;
                }

                li{
                    div{
                        height: 250px;
                        width: 320px;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                    }


                    img{
                        height: 120px;
                        width: 100px;
                    }

                }
            }
        }
    }

`