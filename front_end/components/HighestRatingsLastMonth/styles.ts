import styled from "styled-components";

export const Container = styled.div`


                        height: auto;
                        width: 140px;

                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;

                        border-radius: 10px;

                        @media(max-width: 470px){
                            
                        }

                        >div{
                            margin: 0;
                            width: 100%;
                            height: 100%;
                            border-radius: 10px;

                            display: flex;
                            align-items: center;
                            justify-content: center;

                            a{
                                height: inherit;
                                width: inherit;

                                img{
                                    height: inherit;
                                    width: inherit;

                                    border-radius: 2px;
                                    
                                }

                                :hover{
                                    opacity: 0.9;
                                }
                            }  

                            :hover > div.background-image{
                                
                                background-image: linear-gradient(to right,rgba(0,0,0,.85) 70%,rgba(0,0,0,.4) 95%,rgba(0,0,0,.02) 100%);

                            }
                        }
                        a.link{
                            color: #000;
                            font-size: 1.6rem;
                            font-weight: 400;
                        }
`