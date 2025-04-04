import '@/styles/globals.css'
import NextNProgress from 'nextjs-progressbar'
import Layout from '@/components/Layout'
import { useRouter } from 'next/router'
import { Provider } from 'react-redux'
import { store } from '@/redux/store'
import BASE_URL from '@/config'
import { SnackbarProvider } from 'notistack'
import { DefaultSeo, NextSeo } from 'next-seo'
import { seoData } from '@/utility/const'
import Script from 'next/script'

export default function App({ Component, pageProps }) {
  return (
    <>
      <DefaultSeo {...seoData} />
      <Script
        async
        src='https://www.googletagmanager.com/gtag/js?id=G-V1J9SKGV3W'
      ></Script>
      <Script id='clarity-script' strategy='afterInteractive'>
        {`    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "nkik2r1lg7");`}
      </Script>
      <script
        dangerouslySetInnerHTML={{
          __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-V1J9SKGV3W');
              `
        }}
      />

      <Provider store={store}>
        <SnackbarProvider>
          <Layout>
            <>
              <NextNProgress color='black' />
              <Component {...pageProps} />
            </>
          </Layout>{' '}
        </SnackbarProvider>
      </Provider>
    </>
  )
}
