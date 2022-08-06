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

    .page-title{
        width: 100%;

        display: flex;
        align-items: center;
        justify-content: center;

        margin: 2rem 0;

        h1{
            color: #fff;
            font-size: 4rem;
            font-weight: 600;

            border-bottom: 4px solid blueviolet;

            @media(max-width: 620px){
                font-size: 2.4rem;
            }
        }
    }

`

export const HighlightedGame = styled.div`

    display: flex;
    flex-direction: row;
    
    width: 90%;
    height: 50vh;

    margin: 1rem 0;

    @media(max-width: 842px){
        width: inherit;
    }

    @media(max-width: 620px){
        height: 80vh;
    }

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

        @media(max-width: 620px){
            display: none;

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

    ul{
        width: 100%;

        li{
            width: 100%;

            @media(min-width: 620px){
                height: 100%;
            }

            > div{
                
                @media(min-width: 620px){
                    height: inherit;
                }

                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;

                @media(max-width: 620px){
                    flex-direction: column;
                }

                .game-description{
                    width: 40%;
                    height: 80%;

                    @media(max-width: 620px){
                        width: 80%;
                        height: 100%;

                        
                        display: flex;
                        flex-direction: row;
                        justify-content: center;
                        align-items: center;
                    }

                    margin: 1rem;

                    overflow: auto;
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

                        p{
                            color: #c0c0c0;
                            font-size: 1.4rem;
                            font-weight: 400;


                        }
                    }
                }
            }

    }

    .desktop--heading{
        display: flex;

        @media(max-width: 620px){
            display: none;
        }
    }

    .mobile--heading{
        display: none;

        @media(max-width: 620px){
            display: flex;
            width: 90vw;
        }

        div.slide-inner{
                    padding: 0!important;
        }

        .item{

            *{
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
                                sans-serif;
            }
                padding: 0;
            
                height: inherit;
                width: 100vw;

                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;

                div{
                    padding: 0;
                }

                .all-info{

                    h2{
                        background-color: #00000078;
                        padding: 1rem;
                        border-radius: 4px;
                    }
                    
                    > *{
                        padding-left: 0;
                    }
                }

                h3.release-date{
                    margin: 2rem 0;

                    color: #fff;
                    font-weight: 400;
                }

                .game-description{
                    width: 95%;
                    height: 100%;
                        
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    align-items: flex-start;

                    overflow: auto;
                    overflow: auto;

                            ::-webkit-scrollbar {
                                width: 8px;

                                margin-left: 1rem;
                            }

                            ::-webkit-scrollbar-track {
                                background: #555;
                            }
                            
                            ::-webkit-scrollbar-thumb {
                                background: #888; 
                            }
                            
                            ::-webkit-scrollbar-thumb:hover {
                                background: #555; 
                            }

                        p{
                            color: #c0c0c0;
                            font-size: 1.4rem;
                            font-weight: 400;
                        }
                }

                .game-platforms{

                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    align-items: center;
                    flex-wrap: wrap;

                    a{
                        color: #f2f2f2;
                        font-weight: 400;
                        text-decoration: underline;
                        

                        :after{
                            content: ', ';
                            white-space: pre;
                        }

                        :last-child:after{
                            content: '';
                        }
                    }

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

                
                @media(min-width: 620px){
                    width: 60%;
                    height: 100%;
                }

                box-shadow: 0px 0px 9px 5px #00000045;

                border-radius: 4px;
                overflow: hidden;

                @media(max-width: 620px){
                    padding: 0!important;
/* 
                    height: 320px!important;
                    width: 260px!important; */
                                    
                    /* width: auto!important; */
                    min-height: 260px!important;

                    border-radius: 4px;
                }

                *{
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
                                sans-serif;
                }

                div.all-info{
                    height: 100%;
                    width: 50%;

                    background-image: linear-gradient(to right,rgb(0 0 0 / 75%) 30%,rgb(255 255 255 / 0%));

                    @media(max-width: 620px){
                        width: 80%;
                        background-image: none;
                    }

                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;

                    :hover{

                        >div.game-name h2{
                            text-decoration: underline;
                        }
                    }

                    >*{
                        padding-left: 1rem;
                    }

                    @media(max-width: 620px){
                        padding-left: 0;
                    }

                    .game-name{


                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        
                        h2, a{
                            color: #fff;
                            font-size: 3rem;
                            font-weight: 600;

                        }
                    }

                        a {

                            :hover{
                                color: #fff;
                                text-decoration: underline;
                            }
                        }

                        h3{
                            color: #c0c0c0;
                            padding: 2rem 1rem;
                            font-size: 1.8rem;
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

                                color: #c0c0c0;
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
                                color: #c0c0c0;
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

                    div.game-release{

                        
                        display: flex;
                        flex-direction: column;
                        justify-content: flex-end;
                        
                        
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

        @media(max-width: 620px){
            font-size: 2.4rem;
        }
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
                font-size: 1rem;
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