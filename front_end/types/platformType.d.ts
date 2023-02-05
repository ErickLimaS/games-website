interface Platform {

    name: string,
    summary: string | null,
    platform_logo: {
        image_id: string
    },
    versions: PlatformVersion[] | null

}

interface PlatformVersion {
    
    id: string | null,
    name: string | null,
    cpu: string | null,
    graphics: string | null,
    memory: string | null,
    storage: string | null,
    os: string | null,
    media: string | null,
    online: string | null,
    connectivity: string | null,

}