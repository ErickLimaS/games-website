import styled from 'styled-components'

interface Props {

    image_id: string,

}

export const BackgroundImage = styled.div<Props>`

    animation: fade-in forwards 700ms;

    z-index: -1;

    position: absolute;
    top: 0; 
    left: 0;

    height: 135vh;
    width: 100%;

    background-image: linear-gradient(
          rgba(0, 0, 0, 0.3), 
          rgba(0, 0, 0, 0.5)), 
        ${props => `url(https://images.igdb.com/igdb/image/upload/t_1080p/${props.image_id}.jpg)`}
    ;

    background-repeat: no-repeat;
    background-size: auto 75%;
    background-position: top;
    
    @media(min-width: 1020px) {

        height: 90vh;
        background-size: cover;
        background-position: bottom;

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