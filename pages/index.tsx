import Head from 'next/head'

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>SHTEM Website</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container">
        <h1 className="text-7xl font-bold text-center">
          Hello
        </h1>
      </main>
    </div>
  )
}
