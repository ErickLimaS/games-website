import styled from 'styled-components'

export const Container = styled.footer`

    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: rgba(250,250,250,8);
    padding: 1rem 0;

    .about{
        font-size: 1.6rem;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        flex-wrap: wrap;

        nav{
            margin: 1rem 0;
        }

        .disclaimer{
            background-color: rgba(250,250,250,1);
            border: 1px solid #e3e3e3;
            padding: 0.5rem;
            border-radius: 4px;
            font-size: 1.6rem;
            margin: 1rem 0;

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
        font-size: 1.2rem;

        a:hover{
            text-decoration: underline;
        }
    }

`