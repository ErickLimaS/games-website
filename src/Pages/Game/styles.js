import styled from 'styled-components'

export const Container = styled.div`

    inherit: max-content;

    .loading-active{
        height: 90vh;

        display: flex;
        align-items: center;
    }

    .loading-deactive{
        height: 90vh;

        display: flex;
        align-items: center;
        animation: loading-opacity-change infinite 3100ms;
    
    }

    @keyframes loading-opacity-change{
        0% {
            opacity: 1;
        }
        100%{
            opacity: 1;
        }
    }


`

export const HeadingContent = styled.div`

    top: 40vh;
    height: 80vh;

    .backImage-blur{

        height: 40vh;
        top: 40vh;
        border-top: 1px solid white;
        border-bottom: 10px solid white;
        background-size: 100%;
        filter: blur(8px);

        @media(max-width: 540px){
            background-size: 200%;
        }

    }

    .game-first-content{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-evenly;
        position: absolute;
        top: 16vh;
        width: 100%;
        height: inherit;

        @media(max-width: 540px){
            top: 25vh;
        }

        .game-first-info{
            width: 50%;
            display: flex;
            flex-direction: column;
            justify-content: space-around;

            >div:first-child{
                margin-top: -10rem;
            }
        }

        
        .info-2{
            h2{
                color: #c0c0c0;
                text-shadow: 0 1px 1px rgb(0 0 0 / 60%);

                *{
                    color: #c0c0c0;
                }
            }
        }

        li{
            color: #000;
            margin: 1rem 0;

            h1{
                font-size: 5rem;
                font-weight: 600;
                color: white;
                text-shadow: 0 1px 1px rgb(0 0 0 / 40%);
            }
            h2{
                font-size: 2rem;
                font-weight: 400;
                color: #FFF;
                text-shadow: 0 1px 1px rgb(0 0 0 / 20%);

                a:hover{
                    text-decoration: underline;
                }

                *{
                    font-size: 1.8rem;
                    color: #FFF;
                    text-shadow: 0 1px 1px rgb(0 0 0 / 40%);
                }
            }
            h3{
                font-size: 1.8rem;
                font-weight: 400;
                color: #a3a3a3;
                text-shadow: 0 1px 1px rgb(0 0 0 / 10%);

                a:hover{
                    text-decoration: underline;
                }

                *{
                    font-size: 1.8rem;
                    color: #a3a3a3;
                }
            }
            h4{
                font-size: 1.8rem;
                font-weight: 400;
                color: #a3a3a3;
                text-shadow: 0 1px 1px rgb(0 0 0 / 10%);

            }
        }
    }

    .rating{
        display: flex;
        flex-direction: column;
        align-items: center;
        jusitfy-content: center;
        border-radius: 4px;
        background-color: #e7e7e7;
        padding: 1rem 1rem 0.5rem 1rem;
        height: 40vh;
        width: 30vh;

        .rating-score{
            width: 80%;
            height: 55%;
            border-radius: 4000px;
            padding: 1.5rem 1rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background-color: #FFF;

            h2{
                font-size: 4.2rem;
                font-weight: 400;
            }
            p{
                font-size: 2rem;
            }
        }
        span{
            font-size: 2rem;
            margin: 1rem 0;
        }
    }

`

export const Details = styled.div`

    border-top: 2px solid #5c16c5;
    position: absolute;
    width: 100%;
    top: 96vh;
    display: flex;
    justify-content: center;

    div.details{
        h3{
            padding: 1rem 2rem;
            border: 1px solid #c0c0c0;
            font-size: 1.6rem;
        }
        .pointer{
            :hover{
                cursor: pointer;
                border-bottom: 2px solid #5c16c5;
            }
        }
    }


`