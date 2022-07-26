import styled from "styled-components";

export const Container = styled.div`

                    margin-bottom: 5rem;
                    margin: 1rem 0;

                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    
                    span{
                        border-radius: 8px;
                        background-color: ${props => props.data.rating >= 75 && "green"} ${props => props.data.rating < 75 && props.data.rating > 50 && "#fc3"}  ${props => props.data.rating < 50  && "red"};

                        width: min-content;
                        padding: 1.2rem 1rem;

                        font-size: 1.4rem;
                        font-weight: 600;
                        color: #fff;
                    }        



`