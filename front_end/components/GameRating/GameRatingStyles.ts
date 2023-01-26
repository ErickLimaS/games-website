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

    padding: 12px

    @media(min-width: 1020px){

        padding: 16px;

    }

    font-weight: 500;

    background-color: ${props => props.rating ? bcgColor(props.rating) : 'var(--black-75)'};
    
    border-radius: 16px;

   
`

export default ParagraphContainer