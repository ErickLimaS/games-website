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
            color: #5c16c5;
        }
    }

    .mobile-menu-dropdown{
        display: none;

        @media(max-width: 580px){
            display: flex;
            z-index: 1;
        }

        button{
            display: flex;
            align-items: center;
            justify-content: center;
            height: 36px;
            width: 36px;
            padding: 0.9rem 0.3rem;
            background-color: rgba(250,250,250,.9);
            border: 1px solid transparent;
            border-radius: 4px;

            svg{
                fill: #5c16c5;
                height: 36px;
                width: 36px;
            }

            :hover{
              border: 1px solid #5c16c5;
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
                color: #5c16c5;
            }
            li{
                font-size: 1.6rem;
                margin: 1rem 0;
                color: #3a3a3a;
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
            display: flex;
            flex-direction: column;
            align-items: center;
            z-index: 1;

            h2{
                font-size: 2rem;
                font-weight: 400;

                a{
                    color: #5c16c5;
                }
            }

            :hover > .desktop-ul-hover{
                display: block!important;
                width: 140px;
                top: 6.5vh;
                padding: 1rem;
                position: absolute;
                background-color: #7a30e8;
                padding: 1rem 1rem;
                border: 1px solid transparent;
                border-radius: 4px;

                hr{
                    border-width: 0.5px;
                    color: #FFF;
                }

                li{
                    width: 100%;
                    margin: 1rem 0;
                    color: #FFF;
                    font-weight: 400;

                    display: flex;
                    align-items: center;
                    justify-content: space-between;

                    svg{
                        background-color: #FFF;
                        padding: 0.3rem;
                        border-radius: 40000px;
                    }

                    :hover{
                        font-weight: 600;
                    }
                }


                font-size: 1.6rem;

            }

        }


    }

    div.mobile-search{
        display: none;
        z-index: 1;

        @media(max-width: 800px){
            display: flex;
            flex-direction: column;

            button#header-button-mobile{
                height: inherit;
                padding: 0.9rem 0.3rem;
                background-color: rgba(250,250,250,.9);
                border: 1px solid transparent;
                border-radius: 4px;
                display: flex;
                align-items: center;

                svg{
                    margin: 0 0.6rem;
                    color: #5c16c5;
                    width: 20px;
                    height: 20px;
                }

                @media(max-width: 490px){
                    span{
                        display: none;
                    }
                }

                :hover{
                    background-color: rgba(250,250,250,1);
                    border: 1px solid #5c16c5;
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
                flex-direction: column;
                align-items: center;
                position: absolute;
                right: 0rem;
                top: 9vh;

                width: 100%;
                position: absolute;

                .input-and-button{
                    display: flex;
                    justify-content: center;
                    margin-bottom: 1rem;
                }
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
                z-index: 1;

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
            border: 1px solid #5c16c5;
            border-radius: 4000px;
            background-color: rgba(250,250,250,.8);
            cursor: pointer;

            svg{
                color: #5c16c5;

            }

            :hover{
                background-color: #955eed;

                svg{
                    color: #FFF;
                }
            }
        }

        .search-results-desktop{
            z-index: 1;
            .loading {
                position: absolute;
                top: 1vh;
                  
            }

            .search-result{
                position: absolute;
                top: 10vh;
                right: 5vh;
                z-index: 1;

                .results-active{
                    display: block;
                    background-color: rgba(0,0,0,.2);
                    padding: 0.5rem;
                    border-radius: 4px;

                    button{
                        border: 1px solid #ff4d4d;
                        border-radius: 4px;
                        padding: 1rem;
                        margin-bottom: 0.5rem;
                        background-color: transparent;
                        background-color: #ffb3b3;
                        color: #FFF;

                        :hover{
                            background-color: #ff4d4d;
                            color: #FFF;
                        }
                    }
                }
                .results-deactive{
                    display: none;
                }

            }
        }
    }

`