import React from "react";
import Head from "next/head";
import clsx from "clsx";

export default function Onboarding() {
  const [teamSelected, setSelectedTeam] = React.useState(true);

  return (
    <div className="grid place-items-center h-screen bg-[#f7f6f3]">
      <Head>
        <title>Onboarding - Noicon</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="pb-12">🚀</h1>
          <h2>How are you planning to use Nocion?</h2>
          <p className="text-[#413e38]">
            Choose one that make you feel rich rather than ones that make you
            feel poor 😎.
          </p>
        </div>
        <div className="flex justify-between max-w-xl gap-4 cursor-pointer">
          <div
            className={clsx(
              "w-full bg-white p-8 rounded-lg shadow-md border-2 text-center relative",
              teamSelected ? "border-[#308bbf]" : "border-white"
            )}
            onClick={() => setSelectedTeam(true)}
          >
            {teamSelected && (
              <div className="flex justify-center py-6 absolute top-0 left-0 w-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-[#1D89C7]"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            )}
            <h3 className="text-xl pt-8 text-[#111111] font-semibold">
              With my team
            </h3>
            <p className="text-base py-2 text-[#808080]">
              Colaborate on you docs, projects, and wikis.
            </p>
            <p className="text-[#777777] py-2 text-sm font-light">
              Try for free
            </p>
          </div>
          <div
            className={clsx(
              "w-full bg-white p-8 rounded-lg shadow-md border-2 text-center relative",
              !teamSelected ? "border-[#308bbf]" : "border-white"
            )}
            onClick={() => setSelectedTeam(false)}
          >
            {!teamSelected && (
              <div className="flex justify-center py-6 absolute top-0 left-0 w-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-[#1D89C7]"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            )}
            <h3 className="text-xl pt-8 text-[#111111] font-semibold">
              For myself
            </h3>
            <p className="text-base py-2 text-[#808080]">
              Write better. Think more clearly. Stay organized.
            </p>
            <p className="text-[#777777] py-2 text-sm font-light">
              Free for 1 person.
            </p>
          </div>
        </div>
        <div className="flex justify-center">
          <a href="/getting-started">
            <button className="btn-primary w-[200px] shadow-md">
              Continue
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}
