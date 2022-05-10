import styled from 'styled-components'

export const Container = styled.footer`

    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: rgba(250,250,250,8);
    padding: 1rem 0;

    .about{
        font-size: 1.8rem;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        flex-wrap: wrap;

        @media(max-width: 540px){
            font-size: 2rem;
        }

        nav{
            margin: 1rem 0;

            *{
                color: #5c16c5;
            }
        }

        .disclaimer{
            background-color: rgba(250,250,250,1);
            border: 1px solid #e3e3e3;
            padding: 0.5rem;
            border-radius: 4px;
            font-size: 1.8rem;
            margin: 1rem 2.5rem;

            @media(max-width: 540px){
                font-size: 2rem;
            }

            span{
                color: #5c16c5;
            }

            a:hover{
                text-decoration: underline;
            }

            *{
                font-weight: 600;
            }
        }

        li{
            margin: 0.5rem 0;
            :hover{
                text-decoration: underline;
            }
        }
    }
    small{
        font-size: 1.4rem;
        
        @media(max-width: 540px){
            font-size: 1.6rem;
        }

        a:hover{
            text-decoration: underline;
        }
    }

`