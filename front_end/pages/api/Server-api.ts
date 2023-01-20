/* eslint-disable import/no-anonymous-default-export */
import Axios from 'axios'

const CORS_ANYWHERE = 'https://cors-anywhere.herokuapp.com/'
const SERVER_BASE = 'https://games-website-1.herokuapp.com'

export default {

    allFavoriteGame: async (id) => {

        console.log(id)

        const { data } = await Axios({
            url: `${CORS_ANYWHERE}${SERVER_BASE}/users/my-favorite-games`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                userId: `${id}`
            }


        }).catch(err => {
            console.error(err);

        })

        return data;

    },

    getNewProfileChanges: async (id, newPassword, newName) => {

        const { data } = await Axios({
            url: `${CORS_ANYWHERE}${SERVER_BASE}/users/update-profile`,
            method: 'PUT',
            data: {
                userId: `${id}`,
                newPassword: `${newPassword}`,
                newName: `${newName}`
            },

        })

        return data;

    }
}


