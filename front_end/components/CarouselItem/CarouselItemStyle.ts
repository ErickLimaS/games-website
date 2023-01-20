import styled from "styled-components";

interface Props {

    image_id: string

}

export const CarouselItem = styled.li<Props[]>`

    min-width: 85vw;
    min-height: 160px;

    @media(min-width: 480px){

        min-width: 180px;

    }
    @media(min-width: 768px){

        min-width: 200px;

    }

    @media(min-width: 1440px){

        min-height: 260px;

    }

    @media(min-width: 1440px){

        min-height: 260px;

    }

    background-image: ${props => props ? `url(https://images.igdb.com/igdb/image/upload/t_1080p/${props[0] ? props[0].image_id : undefined}.jpg)` : ''};
    height: auto;
    width: inherit;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: bottom;

    border-radius: 4px;

    >a{

        content: ' '; 

        display: block;
        text-align: center;

        min-width:inherit;
        min-height:inherit;

        font-size: var(--fs-minus-2);
        font-weight: 300;

    }
    >a span{

        display: none;
        
    }
    
    >a:hover span{

        width: inherit;
        height: inherit;

        border-radius: 4px 4px 0 0;
        background: var(--black-50);

        display: block;

    }

    @media((min-width: 0px) and (max-width: 768px)){
        :hover{
            
            transform: scale(1.02);

        } 
    }

`