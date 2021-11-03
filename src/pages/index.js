import Head from 'next/head'

export default function Home() {
  return (
    <div className="font-mono">
      <Head>
        <title>Noiton - Open source alternative to notion.</title>
        <link rel="icon" href="/favicon.ico" />
        <script defer data-domain="nocion.vercel.app" src="https://plausible.io/js/plausible.js"></script>
      </Head>

      <main>
        <div className="w-full max-w-5xl mx-auto space-y-2 mt-24 px-8">
          <h1 className="font-light">Nocion</h1>
          <h1>A <span className="font-normal text-red-300">Notion</span> clone.</h1>
          <h1>Just for fun.</h1>
          <div className="py-4">
            <p className="text-[#37352F] text-base">Powered by Next.js and React.</p>
          </div>
          <div>
            <a href="/onboarding">
              <button className="btn-primary">Get started</button>
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}
