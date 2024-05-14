import { cookies } from "next/headers"
import { selectAllFields } from "./igdbConstants"
import { getIgdbToken } from "../../actions"

const BASE_URL = "https://api.igdb.com/v4"

async function cookiesServerSide() {

    const cookie = cookies()
    const tokenOnCookies = cookie.get("igdbToken") ? cookie.get("igdbToken")!.value : undefined

    // First, try to get token on cookies, else fetchs a temporary one for the first time
    return tokenOnCookies

}

async function postData(query: string, clientToken?: string) {

    const TOKEN = await cookiesServerSide()

    try {
        const res = await fetch(`${BASE_URL}/multiquery`,
            {
                method: 'POST',
                headers: {
                    'Client-ID': `${process.env.NEXT_PUBLIC_IGDB_CLIENT_ID}`,
                    'Authorization': `Bearer ${TOKEN}`
                },
                body: String.raw`${query}` || null
            }
        ).then(
            async res => await res.json()
        )

        return res

    }
    catch (err: any) {

        console.error(err)

        return err

    }

}

// Fetch Home Page Data
export async function fetchHomePageData(genre?: string, platform?: string) {

    const query = `query games "This Month Releases" {
                        ${selectAllFields}
                        where artworks != null & rating > 80 & first_release_date != null;
                        sort first_release_date desc;
                        limit 12;
                    };
                    query games "${genre || `horror`} Genre" {
                        ${selectAllFields}
                        where artworks != null & themes.slug = "${genre || `horror`}";
                        limit 20;
                    };
                    query games "Games to Platform ${platform || `130`}" {
                        ${selectAllFields}
                        where rating > 70 & artworks != null & platforms = ${platform || `130`};
                        sort rating desc;
                        sort rating_count desc;
                    };
                    query themes "Themes Limited To 18" {
                        fields *; 
                        limit 18;
                    };
                    `

    const data = await postData(query)

    return data

}

// Fetch Search Results
export async function fetchSearchResults(searchValue: string) {

    const query = `${selectAllFields}
                    search "${searchValue}"; 
                    limit 8;
                    `

    const data = await postData(query)

    return data

}

export { getIgdbToken }
