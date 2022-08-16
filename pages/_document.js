import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html>
            <Head />
            <body className='bg-slate-100 dark:bg-gray-800'>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}