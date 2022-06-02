import styled from 'styled-components'

export const Container = styled.div`

    width: 40%;

    @media(max-width: 868px){
        width: 90%;
    }

    height: auto;
    
    padding: 0.5rem 1rem;
    margin: 0.2rem 0;

    justify-content: center;
    align-items: center;
    background-color: rgba(250,250,250,1);
    border: 1px solid #c4a4f4;
    border-radius: 4px;

    > a{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;

        :hover > h1{
            text-decoration: underline;
        }
    }

    img{
        height: 133px;
        width: 100px;
        border-radius: 2px;
    }

    .game-details{
        margin: 0 1rem;
        width: 70%;
        display: flex;
        flex-direction: column;

        *{
            margin: 0.5rem 0;
        }

        h1{
            font-size: 1.8rem;
            font-weight: 600;
            a{
                color: #333333;
            }

            :hover{
                text-decoration: underline;
            }
        }

        p{
            font-size: 1.4rem;
            font-weight: 400;
            color: #666666;
        }

        > a{
            display: flex;
            align-items: center;
            justify-content: center;

            font-size: 1.6rem;
            font-weight: 400;

            padding: 0.5rem 1rem;

            color: #fff;
            background-color: #5c16c5;
            border-radius: 2px;
        }
    }


`