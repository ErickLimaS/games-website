import styled from "styled-components";

interface Props {

    rating: number

}

function bcgColor(rating: number) {

    if (rating >= 80) {

        return '#78dc16'

    }
    else if (rating >= 0) {

        return '#ffee0c'

    }

    return '#e8311b'


}

export const ParagraphContainer = styled.p<Props>`

    text-align: center;

    padding-top: 8px;
    
    width: 45px;
    height: 45px;

    @media(min-width: 1020px){

        width: 50px;
        height: 50px;

    }

    font-weight: 500;

    background-color: ${props => props.rating ? bcgColor(props.rating) : 'var(--black-75)'};
    
    border-radius: 16px;

   
`

export default ParagraphContainer