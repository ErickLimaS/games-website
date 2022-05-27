import styled from 'styled-components'

export const Container = styled.div`

    .loading-active{
        height: 90vh;

        display: flex;
        align-items: center;
    }

`
export const HeadingContent = styled.div`


    height: 50vh;
    background-color: #f2f2f2;

    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;

    @media(max-width: 990px){
        height: initial;
        justify-content: center;
    }

    div.platform-logo{
        margin-left: 10%;
        width: 30%;

        @media(max-width: 990px){
            width: initial;
            margin: 0;
            justify-self: center;
        }

        img{
            width: 300px;
            height: auto;
            padding: 1rem;
        }

    }

    div.platform-name{
        margin-left: 5%;
        width: 50%;

        @media(max-width: 990px){
            width: 80%;
            margin-left: 0;

            h1{
                margin-bottom: 3rem 0;
            }
        }

        h1{
            font-size: 4rem;
            margin-bottom: 1.6rem;
        }
        p{
            font-size: 1.8rem;

        }
    }


`

export const MoreDetails = styled.div`

    width: 100%;
    margin: 3rem 0;

    .console-info{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        h2:first-child{
            font-size: 3rem;
            font-weight: 600;
            margin: 3rem 0;
            border-bottom: 4px solid #5c16c5;

            @media(max-width: 340px){
                width: 90%;
            }
        }
        h2{
            font-size: 2.2rem;
            font-weight: 400;
            margin: 1rem 0;
        }

        div.console-versions{
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: flex-start;

            @media(max-width: 800px){
                flex-wrap: wrap;
            }

            .version{
                width: 33.3%;
                padding: 1rem;
                margin: 1rem 2rem;

                @media(max-width: 800px){
                    width: 90%;
                }

                h3{
                    font-size: 2rem;
                    margin: 1rem 0;
                    font-weight: 600;
                }
                h4{
                    border-top: 1px solid #c0c0c0;
                    font-size: 1.6rem;
                    font-weight: 600;
                }
                p{
                    border-top: 1px solid #c0c0c0;
                    margin: 0.5rem 0;
                    font-size: 1.4rem;

                    span{
                        
                        font-size: 1.6rem;
                        font-weight: 600;

                        ::after{
                            content: ':';
                        }
                    }

                }
            }
        }
    }

`

export const ConsoleGamesRelated = styled.div`

    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 3rem 0;

    h2{
        margin: 3rem 0;
        font-size: 3rem;
        font-weight: 600;
        border-bottom: 4px solid #5c16c5;
    }

    .games-list{
        
        width: 90%;
        display: flex;
        flex-direction: row;
        align-items: center;
        
        ul{
            display: flex;
            flex-direction: row;
            align-items: center;
            overflow: auto;

            ::-webkit-scrollbar {
                height: 8px;
            }

            ::-webkit-scrollbar-track {
                background: #f1f1f1;
                border-radius: 10px;
            }
                
            ::-webkit-scrollbar-thumb {
                background: #888; 
                border-radius: 10px;
            }

            ::-webkit-scrollbar-thumb:hover {
                background: #555; 
            }

            li{
                background-size: cover;
                background-position: center;
                border-radius: 10px;
                margin: 0.5rem 1rem;
                
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;

                a{
                    background-color: rgba(0,0,0,.6);
                    border-radius: 10px;

                    :hover{
                        transition: all ease-in 200ms;
                        background-color: rgba(0,0,0,.4);
                    }

                    :hover > img{
                        transition: all ease-in 100ms;
                        border: 1px solid #f1f1f1;
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

    }

`