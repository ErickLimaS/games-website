interface ServerResult {
    result: object[] | null,
    success: boolean,
    token?: {
        access_token: string,
        expires_in: string
    } | null
}