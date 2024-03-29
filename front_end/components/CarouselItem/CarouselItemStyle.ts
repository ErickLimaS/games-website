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

        min-height: 180px;

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

        min-width:100%;
        min-height:inherit;

        font-size: var(--fs-minus-2);
        font-weight: 500;

    }
    >a span{

        display: none;
        
    }

    .carousel_item_container{

        min-height: inherit;
        padding: 16px;

        display: flex;
        gap: 0 16px;
        align-items: flex-start;

    }
    
    .carousel_item_container img{

        margin: auto 0;
        border-radius: 4px;

    }

    .carousel_item_container h5{

        margin-top: 8px;

        font-size: var(--fs-minus-1);
        font-weight: 500;

    }

    a[data-active=true] span{

        border: 2px solid  var(--green);

    }
    
    >a:hover span,
    >a[data-active=true] span,
    >a[data-show-cover-name=true] span{

        animation: fade-in forwards 500ms;

        width: inherit;
        min-height: inherit;

        border-radius: 4px 4px;
        background: var(--black-50);

        display: block;

    }

    @keyframes fade-in {

        0%{
            opacity: 0;
        }
        100%{
            opacity: 1;
        }

    }


`