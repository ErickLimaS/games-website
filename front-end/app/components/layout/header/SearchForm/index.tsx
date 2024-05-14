"use client"
import React, { useState } from 'react'
import SearchSvg from "@/public/assets/svgs/search.svg"

function SearchForm({ isMobile }: { isMobile?: boolean }) {

    const [searchValue, setSearchValue] = useState<string>('')

    function getSearchResults(e: React.FormEvent<HTMLFormElement>) {

        e.preventDefault()

        console.log(searchValue)

    }

    return (
        <form
            onSubmit={(e) => getSearchResults(e)}
            className={`flex ${isMobile ? "w-full" : ""}`}
        >
            <input
                dir='ltr'
                className={`py-3 px-2 text-black bg-white/25 rounded-s ${isMobile ? "w-full" : ""}`}
                type="text"
                name='search'
                placeholder="Search"
                onChange={(e) => setSearchValue(e.target.value)}
            />
            <button
                dir='rtl'
                className='py-3 px-4 text-black bg-white/25 rounded-s'
                type='submit'
            >
                <SearchSvg width={16} height={16} aria-label="Search" fill="white"/>
            </button>
        </form>
    )
}

export default SearchForm