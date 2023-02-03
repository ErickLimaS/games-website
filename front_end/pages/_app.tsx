import CustomDocumentHead from '@/components/CustomDocumentHead'
import Layout from '../components/Layout/'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <CustomDocumentHead/>
      <Component {...pageProps} />
    </Layout>
  )
}
