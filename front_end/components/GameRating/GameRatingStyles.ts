import styled from "styled-components";

interface Props {

    rating: number

}

function bcgColor(rating: number) {

    if (rating > 80) {

        return '#57e32c'

    }
    else if (rating > 50) {

        return '#ffe234'

    }

    return '#ff4545'


}

export const ParagraphContainer = styled.p<Props>`

    padding: 12px;

    @media(min-width: 1020px){

        padding: 16px;

    }

    font-weight: 500;

    background-color: ${props => props.rating ? bcgColor(props.rating) : 'var(--black-25)'};
    
    border-radius: 16px;

   

`

export default ParagraphContainer