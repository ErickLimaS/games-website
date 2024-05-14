import { NextRequest, NextResponse } from 'next/server';
import { getIgdbToken } from './actions';

const cookieMiddleware = async (request: NextRequest) => {

    // Getting cookies from the request using the `RequestCookies` API
    const cookie = request.cookies.get('igdbToken')

    const response = NextResponse.next()

    if (cookie) {

        // Setting cookies on the response using the `ResponseCookies` API
        response.cookies.set(cookie)

        return response

    }

    const newToken = await getIgdbToken()

    // Setting cookies on the response using the `ResponseCookies` API
    // response.cookies.set('igdbToken', newToken.access_token, {
    //     expires: newToken.expires_in
    // })
    response.cookies.set('igdbToken', newToken.access_token)

    return response
};

export default cookieMiddleware;