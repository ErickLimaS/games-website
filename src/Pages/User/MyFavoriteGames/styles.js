import styled from 'styled-components'

export const Container = styled.div`

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    background-image: linear-gradient(#5c16c5 50%, #FFF 100%);

    .heading-text{
        width: 70%;

        @media(max-width: 1024px){
            width: 80%;
        }

        @media(max-width: 620px){
            width: 85%;

            h1{
                font-size: 4rem!important;
                font-weight: 600!important;
            }
            h2{
                font-size: 2.4rem!important;
                font-weight: 400!important;
            }
            p{
                font-size: 2.0rem!important;
                font-weight: 400!important;
            }
        }

        margin: 3rem 0;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        *{
            margin: 1rem 0;
            color: #FFF;
        }

        h1{
            font-size: 5rem;
            font-weight: 600;
        }
        h2{
            font-size: 3.2rem;
            font-weight: 400;
        }
        p{
            font-size: 2.8rem;
            font-weight: 300;
        }
    }

`

export const Games = styled.div`

    margin: 2rem 0;

    width: 100%;

    ul{
        display: grid;
        grid-template-columns: 45% 45% ;
        align-items: center;
        justify-content: space-around;

        @media(max-width: 768px){
            display: flex;
            flex-direction: column;

        }
    }

    .alert-no-games{
        background-color: #FFF;
        border: 2px solid #5c16c5;
        border-radius: 4px;

        display: flex;
        flex-direction: column;
        align-items: center;
        
        padding: 2rem;
        margin: 0 1rem;
        
        box-shadow: 20px 19px 11px 8px #00000085;

        h3{
            font-size: 4rem;
            font-weight: 600;
            color: #5c16c5;
        }
        h4{
            margin: 2rem 0;
            font-size: 2.4rem;
            font-weight: 400;
        }
        h5{
            margin: 2rem 0;
            font-size: 2rem;
            font-weight: 300;
        }
    }

`

export const MapGame = styled.li`


    background-color: #FFF;
        border: 2px solid #5c16c5;
        border-radius: 4px;

        width: 90%;
        margin: 1rem 0;

        @media(max-width: 768px){
            width: 85%;
            flex: unset;
            margin: 1rem 0;

            display:flex;
            flex-wrap: wrap;
        }

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
        
        padding: 2rem;
        
        box-shadow: 20px 19px 11px 8px #00000085;

        img{
            width: 120px;
            border-radius: 4px;

            :hover{
                transition: all ease-in 100ms;
                opacity: 0.8;
            }
        }

        div.game-name{
            display: flex;
            flex-direction: column;
            align-items: center;

            *{
                margin: 1rem 0;
            }

            h3{
                font-size: 3rem;
                font-weight: 600;
                color: #4b12a1;
                border-bottom: 2px solid #4b12a1;

                :hover{
                    transition: all ease-in 100ms;
                    opacity: 0.8;
                }
            }

            a:last-child{
                padding: 1rem 2rem;
                
                background-color: #4b12a1;
                color: #FFF;
                border-radius: 4px;

                font-size: 1.6rem;
                font-weight: 600;

                :hover{
                    transition: all ease-in 100ms;
                    opacity: 0.8;
                }
                
            }
        }
        div.game-rating{
            display: flex;
            flex-direction: column;
            align-items: center;
            
            >div{
                width: 47px;
                height: auto;

                display: flex;
                flex-direction: column;
                align-items: center;

                margin: 1rem 0;

                background-color: ${props => Number(props.item.rating) >= 75 && ('green;')};
                background-color: ${props => {
        if (Number(props.item.rating) < 75 && Number(props.item.rating) > 50) {
            return 'orange;'
        }
    }};
                background-color: ${props => Number(props.item.rating) < 50 && ('red;')};
                border-radius: 8px;

                p{
                    margin: 0;
                    padding: 1rem 1rem;

                    font-size: 2rem;
                    font-weight: 400;
                    color:#fff;
                }
            }
            p{
                font-size: 1.6rem;
                font-weight: 600;
            }
        }


`