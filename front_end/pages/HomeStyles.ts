import styled from 'styled-components'

interface Props {

    image_id: string,

}

export const SectionContainer = styled.section<Props>`

    padding: 48px 0;

    background-image: ${props => `url(https://images.igdb.com/igdb/image/upload/t_1080p/${props.image_id}.jpg)`};
    height: auto;
    width: inherit;
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

        background-image: ${props => `url(https://images.igdb.com/igdb/image/upload/t_1080p/${props.image_id}.jpg)`};

    }


`