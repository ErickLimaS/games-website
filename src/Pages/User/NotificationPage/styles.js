import styled from 'styled-components'

export const Container = styled.div`

    background-image: linear-gradient(#5c16c5, #fff);

    padding: 2rem 0;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .no-notifications{
        height: 100vh;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        h1{
            font-size: 5rem;
            font-weight: 600;
            color: #fff;
        }
        p{
            font-size: 2.8rem;
            font-weight: 400;
            color: #fff;
        }

        @media(max-width: 740px){
            h1{
                font-size: 4.2rem;
                font-weight: 600;
                color: #fff;
            }
            p{
                font-size: 2.4rem;
                font-weight: 400;
                color: #fff;
            }
        }
    }

    .heading{
        margin: 4rem 0;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        *{
            margin: 2rem 0;
        }

        h1{
            font-size: 5rem;
            font-weight: 600;
            color: #fff;
        }

        p{
            font-size: 2.8rem;
            font-weight: 400;
            color: #fff;
        }

        button{
            cursor: pointer;

            padding: 1rem;

            color:  #5c16c5;

            font-size: 1.8rem;

            background-color: #e3e3e3;
            border: 1px solid #5c16c5;
            border-radius: 4px;

            :hover{
                box-shadow: 0px 0px 10px 0px #0000007a;
                opacity: 1.1;
            }
        }
        
        @media(max-width: 1024px){
            
            width: 80%;
        }

        @media(max-width: 740px){

            h1{
                font-size: 4.2rem;
                font-weight: 600;
                color: #fff;
            }
            p{
                font-size: 2.4rem;
                font-weight: 400;
                color: #fff;
            }
        }
    }
`

export const Notifications = styled.div`

    width: 100%;

    display: grid;
    grid-template-columns: auto auto auto;
    grid-gap: 2rem;
    align-items: center;
    justify-content: center;

    @media(max-width: 1020px){
        grid-template-columns: auto auto;
    }
    @media(max-width: 740px){
        grid-template-columns: auto;
    }

`

export const Games = styled.div`

    padding: 1rem;

    background-color: #efefef;

    border: 1px solid #5c16c560;
    border-radius: 4px;

    >*{
        margin: 0.5rem 0;
    }
        
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        :hover{
            box-shadow: 0px 0px 20px 0px #0000007a;
        }
        
        img{
            height: 240px;
            border-radius: 4px;
        }

        a, h3{
            font-size: 3rem;
            font-weight: 600;
            color: #5c16c5;
            
            cursor: pointer;

            :hover{
                opacity: 0.9;
            }
        }

        .comparing-rating{
            
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;


            div.rating{
                
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;

                margin: 0 2rem;

                @media(max-width: 374px){

                    margin: 0 0.5rem;

                }

                h4{
                    font-size: 2rem;
                    font-weight: 400;
                }

                >div.previous-rating{
                    margin: 1rem;

                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;

                    width: 5rem;
                    height: 5rem;

                    background-color: ${(props) => props.item.olderRating >= 75 && 'green'};
                    background-color: ${(props) => props.item.olderRating < 75 && 'orange'};
                    background-color: ${(props) => props.item.olderRating === 0 && '#c0c0c0'};

                    border-radius: 8px;

                    p{
                        font-size: 1.8rem;
                        font-weight: 400;
                        color: #fff;
                    }

                }
                >div.new-rating{
                    margin: 1rem;

                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;

                    width: 5rem;
                    height: 5rem;

                    background-color: ${(props) => props.item.newRating >= 75 && 'green'};
                    background-color: ${(props) => props.item.newRating < 75 && 'orange'};
                    background-color: ${(props) => props.item.newRating === 0 && '#c0c0c0'};

                    border-radius: 8px;

                    p{
                        font-size: 1.8rem;
                        font-weight: 400;
                        color: #fff;
                    }

                }
                p{
                    font-size: 1.6rem;
                    font-weight: 400;
                }
            }

        }

        a.button{
            padding: 1rem;

            cursor: pointer;

            font-size: 2.2rem;
            font-weight: 400;
            color: #fff;

            background-color: #5c16c5;
            border-radius: 4px;

            :hover{
                opacity: 0.9;
            }

        }

`