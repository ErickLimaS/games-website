import styled from 'styled-components'

export const Container = styled.div`


    width: 50vh;
    
    padding: 0.5rem 1rem;
    justify-content: center;
    align-items: center;
    background-color: #f0e8fc;
    border: 1px solid #c4a4f4;
    border-radius: 4px;

    a{
        display: flex;
        flex-direction: row;
    }

    .img{
        width: 30%;

        img{
            height: 100px;
            width: min-content;
        }
        margin: 1rem 0;
    }

    .game-details{
        margin: 0 1rem;
        width: 70%;
        display: flex;
        flex-direction: column;

        h1{
            font-size: 1.6rem;
            font-weight: 600;
            color: #c0c0c0;

            :hover{
                text-decoration: underline;
            }
        }
    }


`