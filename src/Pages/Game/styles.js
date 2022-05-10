import styled from 'styled-components'

export const Container = styled.div`

    height: 100vh;

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


`

export const HeadingContent = styled.div`

    top: 10vh;

    .backImage-blur{

        height: 40vh;
        top: 40vh;
        border-top: 1px solid white;
        border-bottom: 10px solid white;

    }

    .game-first-content{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-evenly;
        position: absolute;
        top: 35vh;
        width: 100%;
        height: inherit;

        li{
            color: #000;
            margin: 1rem 0;

            h1{
                font-size: 5rem;
                font-weight: 600;
            }
            h2{
                font-size: 2rem;
                font-weight: 400;
                color: #a3a3a3;
            }
            h3{
                font-size: 1.8rem;
                font-weight: 400;
                color: #a3a3a3;
            }
            h4{
                font-size: 1.8rem;
                font-weight: 400;
                color: #a3a3a3;
            }
        }
    }






`