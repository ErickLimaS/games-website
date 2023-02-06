import styled from "styled-components";

interface Props {

    rating: number

}

// changes bcg color depending on rating
function bcgColor(rating: number) {

    if (rating >= 80) {

        // green
        return '#78dc16'

    }
    else if (rating >= 50) {

        // yellow
        return '#ebdb08'

    }

    // red
    return '#e8311b'


}

export const RatingContainer = styled.div<Props>`

    background-color: ${props => props.rating ? bcgColor(props.rating) : 'var(--black-75)'};

    width: 45px;
    height: 45px;

    display: flex;
    justify-content: center;
    align-items: center;

    border: 2px solid var(--white-75);

    border-radius: 8px;

    @media(min-width: 1020px){

        width: 50px;
        height: 50px;

    }

    >p{

        font-weight: 500;
        
    }
   
`

export default RatingContainer