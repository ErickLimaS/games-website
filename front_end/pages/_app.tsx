import CustomDocumentHead from '@/components/CustomDocumentHead'
import Layout from '../components/Layout/'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import store  from '../store'
import { Provider } from 'react-redux'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout>
        <CustomDocumentHead />
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}
