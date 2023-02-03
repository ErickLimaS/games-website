import React from 'react'
import Head from 'next/head'

interface Document {

    title?: string,
    description?: string

}

function CustomDocumentHead({ title, description }: Document) {
    return (
        <Head>
            <title>{title ? `${title} | My Next Game` : 'Carregando | My Next Game'}</title>
            <meta name="description" content={description ? description : "Exemplo de descrição padrão."} />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
    )
}

export default CustomDocumentHead