// if no token was sent from client, it request a new one from API then returns to client
export async function getIgdbToken() {

    try {
        const data = await fetch(`https://id.twitch.tv/oauth2/token?client_id=${process.env.IGDB_CLIENT_ID}&client_secret=${process.env.IGDB_CLIENT_SECRET}&grant_type=client_credentials`,
            {
                method: "POST"
            }
        ).then(async res => await res.json())

        return { expires_in: data.expires_in, access_token: data.access_token }

    }
    catch (err: any) {

        console.error(err)

        return err

    }

}