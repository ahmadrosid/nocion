import Head from 'next/head'

export default function Index() {
  return (
    <div>
      <Head>
        <title>Nocion - Open source alternative to notion.</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="font-mono">
        <div className="w-full max-w-5xl mx-auto space-y-2 mt-24 px-8">
          <h1 className="font-light">Nocion</h1>
          <h1>A <span className="font-normal text-red-300">Notion</span> clone.</h1>
          <h1>Just for fun.</h1>
          <div className="py-4">
            <p className="text-[#37352F] text-xl my-2">{"Powered by Next.js and React."}</p>
            <p>Made with 💖 by <a  href="https://ahmadrosid.com" className="text-pink-500 font-semibold">Ahmad Rosid</a></p>
          </div>
          <div>
            <a href="/get-started">
              <button className="btn-primary">Get started</button>
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}
