import Axios from "axios"

const MONGODB_URL_BASE = process.env.DB_RENDER_URL || `http://localhost:9000/user`

function reqConfig(route?: string, body?: object) {

    // provided by the API, expires after some time
    const TOKEN: any = typeof window !== "undefined" && localStorage.getItem('server_token') ? localStorage.getItem('server_token') : null

    return {

        method: 'POST',
        url: `${MONGODB_URL_BASE}${route ? route : ""}`,
        headers: {
            'Authorization': `Bearer ${TOKEN}`
        },
        data: body || null

    }
}

export async function signUpUser(user: SignUp) {

    try {
        const { data } = await Axios(reqConfig("/signup", user))

        localStorage.setItem("server_token", data.token)

        return data
    }
    catch (err: any) {
        console.error(err)
        return err
    }

}

export async function logInUser(user: LogIn) {

    try {
        const { data } = await Axios(reqConfig("/login", user))

        localStorage.setItem("server_token", data.token)

        return data
    }
    catch (err: any) {
        console.error(err)
        return err
    }

}

export async function logOutUser() {

    try {

        localStorage.removeItem("server_token")

        return 
    }
    catch (err: any) {
        console.error(err)
        return err
    }

}