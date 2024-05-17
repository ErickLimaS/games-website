import { fetchAllGenres } from '@/app/api/igdb'
import Link from 'next/link'
import React from 'react'

async function GenresSection() {

    const allGenres: igdbGenre[] = await fetchAllGenres().then(res => res[0].result)

    return (
        <section className='container mx-auto px-2'>

            <h2 className='text-4xl font-bold text-white mb-4'>
                Game Categories
            </h2>

            <div>
                <ul className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-4'>
                    {allGenres.map(item => (

                        <li
                            key={item.id}
                            className='relative bg-secondary/80 hover:bg-secondary/50 aspect-[7/5] rounded-md transition-all'
                        >

                            <Link
                                href={`/genre/${item.slug}`}
                                className='block w-full h-full'
                            >
                                <h3
                                    className='absolute bottom-1 left-1 xl:bottom-2 xl:left-2 text-white font-semibold line-clamp-1'
                                >
                                    {item.name}
                                </h3>
                            </Link>

                        </li>

                    ))}
                </ul>
            </div>

        </section>
    )
}

export default GenresSection