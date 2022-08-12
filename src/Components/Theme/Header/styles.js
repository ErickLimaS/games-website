import styled from 'styled-components'

export const Container = styled.header`

    height: 9vh;

    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;

    background-color: rgba(250,250,250,.8);

    .header-company-name{
        img{
            height: 7vh;
        }
    }

    .mobile-menu-dropdown{
        display: none;

        @media(max-width: 842px){
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

            svg.list-button{
                fill: #5c16c5;
                height: 36px;
                width: 36px;
            }

            :hover{
              background-color: rgba(250,250,250,.1);
            }
        }
        button.active{
            background-color: rgba(0,0,0,.1);
        }

        .dropdown-active{
            display: flex;
            position: absolute;
            top: 9vh;
            left: 0;
            right: 0;
            flex-direction: column;
            width: 100%;
            background-color: rgba(250,250,250,1);

            nav{
                padding: 1rem;
            }

            h2{
                font-size: 2.4rem;
                margin: 2rem 0;
                color: #5c16c5;

                display: flex;
                flex-direction: row;
                align-items: center;
                
                cursor: default;

                svg.icons8{
                    margin-right: 2rem;
                    width: auto;
                    height: 40px;
                }

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
        align-items: center;
        height: 100%;

        @media(max-width: 842px){
            display: none;
        }

        .desktop-ul-hover{
            display: none;
        }

        >nav, >div{
            height: 100%;

            margin: 0 2rem;

            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            z-index: 1;

            border-top: 4px solid transparent;
            transition: all ease 200ms;
    
            h2, button{
                cursor: default;
                font-size: 2rem;
                font-weight: 400;
                color: #5c16c5;

                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;

                svg.icons8{
                    margin-right: 2rem;
                    width: auto;
                    height: 30px;
                }
                
                .icons-2{
                    height: 25px!important;
                }

            }

            :hover{
                border-top: 4px solid #7a30e8;
            }

            :hover > .desktop-ul-hover{
                display: block!important;
                width: 140px;
                top: 9vh;
                padding: 1rem;
                position: absolute;
                background-color: #7a30e8;
                padding: 1rem 1rem;
                border: 1px solid transparent;
                border-radius: 4px;

                ::after{
                    content: "";
                    position: absolute;
                    top: -6px;
                    left: 45%;
                    border-left: 5px solid transparent;
                    border-right: 5px solid transparent;
                    border-bottom: 5px solid #7a30e8;
                    width: 0;
                    height:0;
                    z-index: 1;
                }

                hr{
                    border-width: 0.5px;
                    color: #FFF;
                }

                li{
                    border-bottom: 1px solid #fff;

                    :last-child{
                        border-bottom: 0;
                    }
                }

                a{
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
                        transition: all ease-in-out 70ms;
                        transform: scale(1.04);
                    }

                }

                font-size: 1.6rem;

            }

        }


    }

    div.mobile-search{
        display: none;
        z-index: 1;

        @media(max-width: 842px){
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
                }

            }
            button.active{
                background-color: rgba(0,0,0,.1)!important;
            }

            div.mobile-input{
                display: none;
            }

            div.mobile-input.active{
                padding: 1rem 0;
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
                    width: -webkit-fill-available;
                    display: flex;
                    justify-content: center;
                    margin-bottom: 1rem;
                }
                input{
                    width: 70%;
                    padding: 0.5rem;

                    font-size: 1.6rem;
                    font-weight: 400;

                    border: 0;
                    border-radius: 4px 0 0 4px;

                    outline: 0;
                }
                button{
                    padding: 1.1rem;

                    border: 0;
                    border-radius: 0 4px 4px 0;

                    background-color: #5c16c5;

                    color: #fff;

                    :hover{
                        transition: all ease-in-out 200ms;
                        background-color: #fff;
                        color: #5c16c5;
                    }
                }

                .search-results-mobile-2{
                    width: -webkit-fill-available;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;

                    .search-result{
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                    }
                }
            }

        }
    }

    div.search-input{

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        z-index: 1;

        /* margin-top: 4px; */

        @media(max-width: 842px){
            display: none;
        }

        *{
            margin: 0 0.4rem;
        }

        div.input{
            
            align-items: center;
            justify-content: center;

            background-color: rgba(0,0,0,.4);
            position: absolute;
            top: 9vh;
            left: 0;

            margin: 0;

            width: 100%;

            input#input-search-text{

                margin: 1rem 0;
                padding: 1rem;
                font-size: 1.8rem;
                font-weight: 400;
                border: 0;
                border-radius: 4px 0 0 4px ;
                width: 40%;

                :focus{
                    outline: none;
                }

            }
            button{
                background-color: #fff;
                border: 0;
                height: inherit;    
                padding: 1.05rem;
                margin: 0;
                border-radius: 0 4px 4px 0;

                :hover{
                    transition: all ease-in 150ms;

                    background-color: #7a30e8;

                    svg{
                        color: #fff;
                    }
                }
            }

        }

        button{
            border: 1px solid transparent;
            background-color: rgba(250,250,250,.8);
            cursor: pointer;

            font-size: 1.8rem;

            svg{
                color: #5c16c5;

                height: 20px;
                width: auto;
            }

            :hover{

            }
        }

        .search-results-desktop{

            z-index: 1;

            *{
                margin: 0;
            }

            .search-result{

                .loading {
                
                }

                width: 100%;

                position: absolute;
                top: 18vh;
                left: 0;

                z-index: 1;

                .results-deactive{
                    display: none;
                }
                
                .results-active{
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;

                    *{
                        margin: 0.2rem 0;
                    }

                    background-color: rgba(0,0,0,.4);
                    border-radius: 4px;

                    button{
                        border: 1px solid transparent;
                        border-radius: 4px;
                        padding: 1rem;
                        margin-bottom: 0.5rem;
                        background-color: #ff4d4d;
                        color: #FFF;

                        :hover{
                            background-color: #ff4d4d;
                            opacity: 0.9;
                        }
                    }
                }
                
            }
        }

    }

`

export const UserMobile = styled.div`


    font-size: 2rem;
    border: 1px solid #c0c0c0;
    border-radius: 4px;
    padding: 1rem 0.5rem;

    .login{
        font-size: 2.6rem;

        a{
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;

            svg{
                width: 30px;
                height: 30px;
            }
        }
    }
    
    > .dropdown.desktop.desk-active{
        display: block;
    }

    .user-name-and-caret{

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;

        h2{
            margin: 0!important; 

            display: flex;
            flex-direction: row;
            align-content: center;
            align-items: center;
            
            svg{
                height: 20px;
                width: auto;
                transform: scale(1.5);

                margin-left: 1rem;
            }

            *{
                margin-right: 2rem;
            }

            span{
                margin: 0 1rem;

                width: 30px!important;
                height: 30px!important;

                display: flex;
                align-items: center;
                justify-content: center;

                color: #fff;
                font-size: 2rem;
                font-weight: 400;

                border-radius: 4000px;
                background-color: #c0c0c0;
            }
        }

    }
    
    .user-name-and-caret-desktop{

        display: flex;
        flex-direction: row;
        align-items: baseline;
        justify-content: center;
        transition: all cubic-bezier(0.4, 0, 0.2, 1) 750ms;

        cursor : pointer;

        span{
                width: 30px!important;
                height: 30px!important;

                display: flex;
                align-items: center;
                justify-content: center;

                color: #fff;
                font-size: 2rem;
                font-weight: 400;

                border-radius: 4000px;
                background-color: #c0c0c0;
        }

        h3{
            color: #4b12a1;
            border-bottom: 1px solid #4b12a1;

            
        }
        svg{
            fill: #c0c0c0;
            transition: all cubic-bezier(0.4, 0, 0.2, 1) 750ms;
            transform: rotate(180deg);
        }

    }

    .dropdown.active{
        display: block;
        background-color: rgba(0,0,0,.5);
        border-radius: 4px;
        padding: 1rem;
        margin-top: 2rem;

        ul{
            li{
                a{
                    display: flex;
                    align-items: center;

                    font-size: 1.8rem;
                    color: #FFF;

                    svg{
                        margin-right: 2rem; 
                        color: #FFF;
                    }

                    :hover{
                       text-decoration: underline;
                    }
                    
                    span{
                        display: flex;
                        justify-content: center;
                        align-items: center;

                        height: 30px;
                        width: 30px;
                        
                        border-radius: 4000px;
                        border: 1px solid #c0c0c0;
                    }
                    
                }
            }
            li:last-child{

                svg{
                    color: red;
                }

                :hover{
                    a, svg{
                        color: red;
                    }
                }
            }
            
        }
    }
    .dropdown.deactive{
        display: none;
    }


    .dropdown.desktop{
        display: none;
        position: absolute;
        right: 0;

        width: max-content;

        background-color: rgba(250,250,250,1);
        border-radius: 4px;
        border: 1px solid #c0c0c0;
        
        padding: 1rem;

        ul{
            display: flex;
            flex-direction: column;
            justify-content: center;

            li{
                padding: 0.2rem 0;
                margin: 0.5rem 0;
                border-bottom: 1px solid #c0c0c0;

                :hover{
                    background-color: rgba(250,250,250,0.4);
                    border-radius: 2px;
                    
                }

                a{
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    align-items: center;
                    color: #666666;
                    font-weight: 400;

                    :hover{
                        color: #000;
                        svg{
                            color: #5c16c5;
                        }

                        span{
                            background-color: #5c16c5;
                            color: #FFF;
                        }
                    }

                    svg{
                        margin-right: 1rem;
                        width: 20px;
                        height: 20px;

                    }

                    span{
                        display: flex;
                        justify-content: center;
                        align-items: center;

                        height: 30px;
                        width: 30px;
                        
                        border-radius: 4000px;
                        background-color: #c0c0c0;
                    }
                }

                :last-child{

                    :hover{
                        a, svg{
                            color: red;
                        }
                    }
                }
            }
        }
    }



`
export const UserDesktop = styled.div`

    @media(max-width: 842px){
        display: none;
    }

    font-size: 2rem;
    /* padding: 1rem 0.5rem; */

    height: inherit;

    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    align-items: center;

    .login{
        font-size: 2.6rem;

        a{
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;

            svg{
                width: 30px;
                height: 30px;
            }
        }
    }
    
    > .dropdown.desktop.desk-active{
        display: block;
    }

    .user-name-and-caret{

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;

        h2{
            margin: 0!important; 

            display: flex;
            flex-direction: row;
            align-content: center;
            align-items: center;

            *{
                margin-right: 2rem;
            }

            span{
                margin: 0 1rem;

                width: 30px!important;
                height: 30px!important;

                display: flex;
                align-items: center;
                justify-content: center;

                color: #fff;
                font-size: 2rem;
                font-weight: 400;

                border-radius: 4000px;
                background-color: #c0c0c0;
            }
        }

    }
    
    .user-name-and-caret-desktop{

        display: flex;
        flex-direction: row;
        align-items: baseline;
        justify-content: center;
        transition: all cubic-bezier(0.4, 0, 0.2, 1) 750ms;

        cursor: pointer;

        *{
            margin: 0 0.5rem;
        }

        span{
            width: 30px!important;
            height: 30px!important;

            display: flex;
            align-items: center;
            justify-content: center;

            color: #fff;
            font-size: 2rem;
            font-weight: 400;

            border-radius: 4000px;
            background-color: #c0c0c0;
        }

        h3{
            color: #4b12a1;
            border-bottom: 1px solid #4b12a1;
            font-size: 2.4rem;
            font-weight: 400;
            
        }
        svg{
            fill: #c0c0c0;
            transition: all cubic-bezier(0.4, 0, 0.2, 1) 750ms;
            transform: rotate(180deg);
        }

    }

    .dropdown.active{
        display: block;
        background-color: rgba(0,0,0,.5);
        border-radius: 4px;
        padding: 1rem;
        margin-top: 2rem;

        ul{
            li{
                a{
                    display: flex;
                    align-items: center;

                    color: #FFF;

                    svg{
                        margin-right: 2rem; 
                        color: #FFF;
                    }

                    :hover{
                       text-decoration: underline;
                    }
                    
                    span{
                        display: flex;
                        justify-content: center;
                        align-items: center;

                        height: 30px;
                        width: 30px;
                        
                        border-radius: 4000px;
                        border: 1px solid #c0c0c0;
                    }
                    
                }
            }
            li:last-child{

                svg{
                    color: red;
                }

                :hover{
                    a, svg{
                        color: red;
                    }
                }
            }
            
        }
    }
    .dropdown.deactive{
        display: none;
    }


    .dropdown.desktop{
        display: none;
        position: absolute;
        top: 10vh;

        width: max-content;

        background-color: rgba(250,250,250,1);
        border-radius: 4px;
        border: 1px solid #c0c0c0;
        
        padding: 2rem;

        ::after{
            content: "";
            position: absolute;
            top: -10px;
            left: 45%;
            border: 1px solid #c0c0c0;
            border-left: 10px solid transparent;
            border-right: 10px solid transparent;
            border-bottom: 10px solid rgba(250,250,250,1);
            width: 0;
            height:0;
            z-index: 1;
        }

        ul{
            display: flex;
            flex-direction: column;
            justify-content: center;

            li{
                padding: 0.2rem 0;
                margin: 0.5rem 0;
                border-bottom: 1px solid #c0c0c0;

                :hover{
                    background-color: rgba(250,250,250,0.4);
                    border-radius: 2px;
                    
                }

                a{
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    align-items: center;
                    color: #666666;
                    font-weight: 400;

                    :hover{
                        color: #000;
                        svg{
                            color: #7a30e8;
                        }

                        span{
                            background-color: #666666;
                            color: #FFF;
                        }
                    }

                    svg{
                        margin-right: 1rem;
                        width: 20px;
                        height: 20px;

                    }

                    span{
                        display: flex;
                        justify-content: center;
                        align-items: center;

                        height: 30px;
                        width: 30px;
                        
                        border-radius: 4000px;
                        background-color: #c0c0c0;
                    }
                }

                :last-child{

                    :hover{
                        a, svg{
                            color: red;
                        }
                    }
                }
            }
        }
    }

    a.login--button{
        height: inherit;

        color: rgb(92, 22, 197);

        svg{
            height: 2.5rem;
            width: auto;

            margin-right: 1rem;
        }

        :hover{

        }

    }

`