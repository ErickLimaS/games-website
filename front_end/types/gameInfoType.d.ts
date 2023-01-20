interface GameInfo {

    id: number,
    name: string,
    game_modes: [
        {
            name: string,
            slug: string
        }
    ],
    cover: {
        url: string | undefined,
        image_id: string | undefined
    },
    artworks: [
        {
            image_id: string,
            url: string | undefined
        }
    ]
    slug: string,
    first_release_date: number

}