import styled from 'styled-components'

interface Props {

    image_id: string,

}

export const BackgroundImage = styled.div<Props>`

    z-index: -1;

    position: absolute;
    top: 0; 
    left: 0;

    height: 90vh;
    width: 100%;

    background-image: linear-gradient(
          rgba(0, 0, 0, 0.3), 
          rgba(0, 0, 0, 0.5)), 
        ${props => `url(https://images.igdb.com/igdb/image/upload/t_1080p/${props.image_id}.jpg)`}
    ;

    background-repeat: no-repeat;
    background-size: auto 75%;
    background-position: bottom;

    
    @media(min-width: 425px) {

        height: 90vh;
        background-size: auto 75%;
        background-position: bottom;

    }
    
    @media(min-width: 1020px) {

        background-size: cover;

    }

    @media(min-width: 1440px) {

        background-image: linear-gradient(
            rgba(0, 0, 0, 0.3), 
            rgba(0, 0, 0, 0.5)), 
            ${props => `url(https://images.igdb.com/igdb/image/upload/t_1080p/${props.image_id}.jpg)`}
        ;

    }


`