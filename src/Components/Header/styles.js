import styled from 'styled-components'

export const Container = styled.header`

    height: 9vh;

    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;

    background-color: rgba(250,250,250,.8);

    .header-company-name{
        h1{
            font-size: 2.4rem;
            font-weight: 600;
        }
    }

    .mobile-menu-dropdown{
        display: none;

        @media(max-width: 580px){
            display: flex;
        }

        button{
            height: 36px;
            width: 36px;
            padding: 0.9rem 0.3rem;
            background-color: rgba(250,250,250,.9);
            border: 1px solid #e3e3e3;
            border-radius: 4px;

            svg{
                fill: #000;
            }

            :hover{
              border: 1px solid #c0c0c0;
              background-color: rgba(250,250,250,.1);
            }
        }
        button.active{
            background-color: rgba(0,0,0,.1);
        }

        .dropdown-active{
            display: flex;
            position: absolute;
            top: 10vh;
            left: 0;
            right: 0;
            flex-direction: column;
            width: 100%;
            background-color: #e3e3e3;

            nav{
                padding: 1rem;
            }

            h2{
                font-size: 2.4rem;
                margin: 2rem 0;
            }
            li{
                font-size: 1.6rem;
                margin: 1rem 0;
            }
        }
        .dropdown-not-active{
            display: none;
        }
    }

    .nav-and-hover-list{
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        @media(max-width: 580px){
            display: none;
        }

        .desktop-ul-hover{
            display: none;
        }

    
        >nav{
            margin: 0 2rem;

            h2{
                font-size: 2rem;
                font-weight: 600;
            }

            :hover > .desktop-ul-hover{
                display: block!important;
                width: 100px;
                position: absolute;
                margin-left: -4vh;
                background-color: #e3e3e3;
                padding: 1rem 1rem;
                border: 1px solid transparent;
                border-radius: 4px;

                li{
                    width: 100%;
                    margin: 0.5rem 0;
                }


                font-size: 1.6rem;
                font-weight: 600;

            }

        }


    }

    div.mobile-search{
        display: none;

        @media(max-width: 800px){
            display: flex;
            flex-direction: column;

            button#header-button-mobile{
                height: inherit;
                padding: 0.9rem 0.3rem;
                background-color: rgba(250,250,250,.9);
                border: 1px solid #e3e3e3;
                border-radius: 4px;
                display: flex;
                align-items: center;

                svg{
                    margin: 0 0.6rem;
                }

                @media(max-width: 490px){
                    span{
                        display: none;
                    }
                }

                :hover{
                    background-color: rgba(250,250,250,1);
                    border: 1px solid #c0c0c0;
                }
            }
            button.active{
                background-color: rgba(0,0,0,.1)!important;
            }

            div.mobile-input{
                display: none;
            }

            div.mobile-input.active{
                padding: 1rem;
                background: rgba(0,0,0,.4);
                border-radius: 4px 0px 0px 4px;
                display: flex;
                position: fixed;
                right: 0rem;
                top: 9vh;

                input{
                    padding: 0.5rem;
                    font-size: 1.6rem;
                    font-weight: 400;
                    border: 1px solid #c0c0c0;
                    border-radius: 4px;
                    width: 170px;
                    margin-right: 1rem;
                }
                button{
                    border: 1px solid #c0c0c0;
                    padding: 0.8rem 1rem;
                    border: 1px solid #c0c0c0;
                    border-radius: 4000px;

                    :hover{
                        border: 1px solid #000;
                        background-color: rgba(250,250,250,1);
                    }
                }
            }
        }
    }

    div.search-input{

        display: flex;
        flex-direction: row;
        align-items: center;

        @media(max-width: 800px){
            display: none;
        }

        *{
            margin: 0 0.4rem;
        }
        input#input-search-text{
            padding: 0.5rem;
            font-size: 1.6rem;
            font-weight: 400;
            border: 1px solid #c0c0c0;
            border-radius: 4px;
            width: 170px;

        }
        button{
            padding: 0.8rem 0.6rem;
            border: 1px solid #c0c0c0;
            border-radius: 4000px;
            background-color: rgba(250,250,250,.8);
            cursor: pointer;

            :hover{
                border: 1px solid #000;
                background-color: rgba(250,250,250,1);
            }
        }
    }

`