import styled from 'styled-components'

export const Container = styled.div`


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

    .summary{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        margin: 1rem 0;

        p{
            width: 70%;
            font-size: 2rem;
            font-weight: 400;
        }

    }

    hr{
        margin: 4rem 0;
    }


`

export const HeadingContent = styled.div`

    border-top: 1px solid white;
    border-bottom: 10px solid white;
    background-size: 100%;
    background-position: center;

    @media(max-width: 990px){
        background-position: top;
    }

    @media(max-width: 540px){
        background-size: 200%;
    }

    .game-first-content{
        padding-top: 10vh;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-evenly;
        width: 100%;
        background-image: linear-gradient(rgba(0 ,0 ,0 ,0.4), rgba(250,250,250,1) 60%);

        
        @media(max-width: 620px){
            flex-direction: column;
            background-image: linear-gradient(rgba(0 ,0 ,0 ,0.5),rgba(250,250,250,1) 80%);
        }

        @media(max-width: 540px){
            top: 25vh;
        }

        .game-cover-art{
            display: flex;
            flex-direction: column;
            align-items: center;

            span{
                padding: 0.5rem;
                margin: 1rem 0;
                background-color: #5c16c5;
                width: 90%;
                border-radius: 4px;
                display:flex;
                justify-content: center;
                font-size: 1.8rem;
                color: #FFF;
                font-weight: 600;
            }
        }

        .game-first-info{
            width: 50%;
            display: flex;
            flex-direction: column;
            justify-content: space-around;

            @media(max-width: 620px){
                width: 90%;
            }

            >div:first-child{
                margin-top: -10rem;

                @media(max-width: 620px){
                    margin-top: 0rem;
                }
            }
        }

        
        .info-2{
            h2{
                color: #696969;
                text-shadow: 0 1px 1px rgb(0 0 0 / 60%);

                *{
                    color: #696969;
                    text-shadow: 0 1px 1px rgb(0 0 0 / 20%);
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
                text-shadow: 0 1px 1px rgb(0 0 0 / 80%);
            }
            h2{
                font-size: 2rem;
                font-weight: 400;
                color: #FFF;
                text-shadow: 0 1px 1px rgb(0 0 0 / 60%);

                a:hover{
                    text-decoration: underline;
                }

                *{
                    font-size: 1.8rem;
                    color: #FFF;
                    text-shadow: 0 1px 1px rgb(0 0 0 / 60%);
                }
            }
            h3{
                font-size: 1.8rem;
                font-weight: 400;
                color: #696969;
                text-shadow: 0 1px 1px rgb(0 0 0 / 10%);

                a:hover{
                    text-decoration: underline;
                }

                *{
                    font-size: 1.8rem;
                    color: #696969;
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
                font-weight: 600;
            }
            p{
                font-size: 2rem;
                font-weight: 400;
            }
        }
        span{
            font-size: 2rem;
            margin: 1rem 0;
            font-weight: 600;
        }
    }

`

export const Details = styled.div`

    width: 100%;
    display: flex;
    flex-direction: column;
    margin: 2rem 0;

    .navigation{
        display: flex;
        flex-direction: row;
        justify-content: center;
        margin-bottom: 1.5rem;

        @media(max-width: 384px){
            flex-direction: column;
        }


        h3{
            padding: 1rem 2rem;
            border: 1px solid #c0c0c0;
            font-size: 1.8rem;
            font-weight: 600;
        }
        .pointer{
            :hover{
                cursor: pointer;
                border-bottom: 2px solid #5c16c5;
            }
        }
    }

    div.details{

        .dropdown{
        }

        .dropdown-item{
            display: none;
        }
        
        .dropdown-item.active.screenshots{
            background-color: #200845;
            padding: 2rem 1rem;
            display: flex;
            flex-direction: row;
            justify-content: flex-start;

            @media(max-width: 620px){
                flex-direction: column;
            }
                
                .list-imgs{
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    height: 80vh;
                    width: 32vh;
                    overflow: auto;
                    margin: 0 3rem;

                    @media(max-width: 620px){
                        flex-direction: row;
                        justify-content: center;
                        width: auto;
                        overflow: auto;
                        height: initial;
                        margin: 2rem 0;
                    }

                    ::-webkit-scrollbar {
                    width: 5px;
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

                    img{
                        margin: 0.2rem 0;
                        width: 160px;
                        height: 100px;
                        cursor: pointer;
                        border: 1px solid transparent;

                        :hover{
                            border: 1px solid #FFF;
                            background-color: blue;
                            opacity: 0.7;
                        }
                    }
                }

                .big-img{
                    height: 100%;
                    width: 100%;
                    display: flex;
                    justify-content: center;
                    align-self: center;

                    
                    img.active{
                        display: block;
                        max-width: 780px;
                        width: 90%;
                        height: auto;

                        @media(max-width: 620px){
                            width: 90%;
                            height: auto;
                        }
                    }
                    img.not-active{
                        display: none!important;
                    }
                }


        }
        .dropdown-item.active.videos{
            
            display: flex;
            flex-direction: row;
            align-items: center;
            background-color: #200845;
            padding: 2rem 1rem;

            @media(max-width: 620px){
                flex-direction: column;
            }


            .list-videos{
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                height: 80vh;
                width: 40vh;
                overflow: auto;
                margin: 0 3rem;

                @media(max-width: 620px){
                    height: auto;
                    flex-direction: row;
                    width: 90%;
                }

                ::-webkit-scrollbar {
                    width: 5px;
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

                h4{
                    font-size: 2rem;
                    font-weight: 600;
                    color: #FFF;
                    cursor: pointer;
                    padding: 0.5rem 1rem;
                    margin: 0.5rem 0;
                    border: 1px solid rgba(250,250,250,.5);
                    border-radius: 4px;
                    width: 80%;

                    @media(max-width: 620px){
                        height: max-content;
                        width: auto;
                        margin: 0 0.5rem;
                    }

                    :hover{
                        border: 1px solid #FFF;
                    }
                }

            }

            .video-display{
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                width: 100%;

                h2.active{
                    display: block;
                    font-size: 2rem;
                    font-weight: 600;
                    padding: 1rem;
                    color: #FFF;
                }
                iframe.active{
                    display: block;
                    height: 480px;
                    width: 80%;

                    @media(max-width: 620px){
                        height: 300px;
                        width: 90%;
                        margin: 0 0.5rem;
                    }
                }

                .not-active{
                    display: none;
                }
            }
        }

        .dropdown-item.active.details{

            display: flex;
            flex-direction: column;
            align-items: center;
            background-color: #200845;
            padding: 2rem 1rem;

            @media(max-width: 620px){
                padding: 1rem;
            }

            .list-details{
                ul{
                    border-left: 4px solid #FFF;
                    margin: 2rem 1rem;

                    @media(max-width: 620px){
                        margin: 1rem 0.5rem;
                    }

                    ul{
                        border-left: 2px solid #FFF;
                        margin: 2rem 1rem;

                        h6{
                            font-size: 1.8rem;
                            font-weight: 600;
                        }

                        li{
                            display: flex;
                            flex-direction: column;
                            align-items: baseline;

                        }
                    }
                }
                a{
                    color: #FFF;
                    text-decoration: underline;

                    :hover{
                        opacity: 0.7;
                    }
                }
                li{
                    color: #FFF;
                    flex-direction: column;
                    font-size: 1.6rem;
                    padding-left: 2rem;
                    margin: 2rem 0;

                    @media(max-width: 620px){
                        display: flex;
                        margin: 0.5rem 0;
                    }

                    display: flex;
                    align-items: baseline;

                    h5{
                        font-size: 1.8rem;
                        margin: 2rem 1rem;
                        font-weight: 600;
                    }
                    h6{
                        font-size: 1.6rem;
                        margin: 1rem 0rem;
                        font-weight: 400;
                    }

                    p{
                        padding: 0 0.2rem;
                    }

                    p::after{
                        content:  ",";
                    }
                    
                    p:last-child{
                        ::after{
                            content: ".";
                        }
                    }
                }
            }


        }
    }


`