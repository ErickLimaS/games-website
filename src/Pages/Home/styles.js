import styled from 'styled-components'

export const Container = styled.div`

    .loading-active{
        display: flex;
        height: 90vh;
    }

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
                display: flex;
                margin: 5vh 0;
                margin-top: 10vh;
                font-size: 4.6rem;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                width: -webkit-fill-available;
            }
        }
        h2{
            color: #000;
            font-size: 3rem;
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
    background-image: cover;

    @media(max-width: 620px){
        height: auto;
        background-position: center;
    }
    @media(min-width: 860px){
        height: 75vh;
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

            a, h3{
                width: fit-content!important;
            }
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

        >div{
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            @media(max-width: 620px){
                width: 100vw;
            }

        }

        a{            
            width: 80%;
            color: #FFF;
            font-size: 3rem;
            font-weight: 400;
        }
        h3{
            width: max-content;
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
            flex-wrap: wrap;

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
            width: max-content;
            display: flex;
            justify-content: center;
            padding: 0.5rem 1rem;
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

    >h1{
        border-bottom: 4px solid #5c16c5;
        width: max-content;
        font-size: 3rem;
        font-weight: 600;
        width: inherit;

        @media(max-width: 470px){
            font-size: 2.2rem;
        }
    }

    .ratings-section{
        display: flex;
        flex-direction: column;
        margin: 1rem 0;
        justify-content: center;
        align-items: center;

        /* @media(max-width: 898px){
            flex-wrap: wrap;

            >div{
                width: initial!important;
            }
        } */

        >div{
            margin: 1.5rem 0;
        }

        div.game-highest-rated{

            /* background-image: ${props => props.highestRatings[0].game.artworks ? `url(//images.igdb.com/igdb/image/upload/t_original/${props.highestRatings[0].game.artworks[0].image_id}.jpg)` : ``}; */
            background-position: center;
            background-size: cover;

            width: 70vw;
            
            @media(max-width: 898px){

                width: 90vw;
            }

            background-color: rgba(0,0,0,.1);

            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: stretch;

            @media(max-width: 768px){

                justify-content: center;
                flex-wrap: wrap;

            }

            border-radius: 2px;

            img{
                height: initial;
                border-radius: 2px;

                @media(max-width: 898px){

                    height: fit-content;
                }
                @media(max-width: 768px){

                    height: auto;
                    width: 280px;
                }   
            }
                
            .game-info{

                height: inherit;
                width: max-content;

                margin: 0 2rem;

                display: flex;
                flex-direction: column;
                justify-content: space-between;

                >*{
                    margin: 1rem 0;
                }

                div.name-and-score{

                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    align-items: center;
                    flex-wrap: wrap;

                    a{
                        color: #5c16c5;
                        :hover{
                            opacity: 0.9;
                        }
                    }
                    h2{
                        font-size: 3rem;
                    }
                }
                p{
                    font-size: 2rem;
                    font-weight: 400;

                    @media(max-width: 768px){
                        width: 100%;
                    }
                }
                span{
                    font-size: 1.6rem;
                    font-weight: 400;
                }
                div.themes{
                    ul{
                        display: flex;
                        flex-direction: row;
                    }
                    li{
                        font-size: 1.4rem;
                        font-weight: 600;
                    }
                    li:after{
                        content: ', ';
                        white-space: pre;
                    }
                    li:last-child:after{
                        content: '';
                    }
                }

            }

        }

        .ratings-games{
            overflow: auto;

            width: 90vw;

            display: flex;
            flex-direction: column;

            @media(max-width: 898px){

                align-items: center;
                justify-content: center;
                
            }
            
            >h2{
                font-size: 2rem;
                font-weight: 400;
            }

            ul{
                display: flex;
                flex-direction: row;
                align-items: center;

                width: inherit;

                li{
                    
                    margin: 0 0.5rem;

                }
            }
        }

        
    }

`