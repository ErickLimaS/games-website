import React from 'react'

function AgeRating(props: AgeRating | undefined) {

    switch (props?.rating) {
        case 6:
            return <>ESRB <b>RP</b></>
        case 7:
            return <>ESRB <b>RP</b></>
        case 8:
            return <>ESRB <b>E</b></>
        case 9:
            return <>ESRB <b>E10</b></>
        case 10:
            return <>ESRB <b>T</b></>
        case 11:
            return <>ESRB <b>M</b></>
        case 12:
            return <>ESRB <b>AO</b></>
        default:
            return <>Restrição Indisponivel</>
    }

}

export default AgeRating