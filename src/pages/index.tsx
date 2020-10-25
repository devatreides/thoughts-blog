import { useRouter } from 'next/router';
import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Footer from '../components/Footer';

const Index = ({ title, description }) => {
  const router = useRouter();

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <meta name="Description" content={description}></meta>
        <title>{title}</title>
      </Head>
      <div className="flex justify-center pt-4">
        <p className="text-lg text-bold text-accent-1 text-bold">
          <Link href="https://twitter.com/tongedev"> Twitter </Link>—
          <Link href="https://instagram.com/tomb.dev"> Instagram </Link>—
          <Link href="https://dev.to/tombenevides"> Dev.to </Link>—
          <Link href="https://github.com/tombenevides"> Github </Link>
        </p>
      </div>
      <h1 className="text-center text-2xl font-bold text-accent-1 mb-6 md:text-4xl lg:text-5xl py-8">
        Cogitare.Press
      </h1>
      <div className="w-screen flex place-items-auto bg-gray-100 py-8">
        <div className="w-full mx-auto">
          <div className="mx-auto my-5 flex flex-col rounded-md items-center lg:w-2/5 py-8">
            <div className="w-full text-center mx-auto">
              <button
                type="button"
                onClick={() => router.push('/programacao')}
                className="border border-accent-1 bg-accent-1 text-white text-xl text-bold rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-accent-1-darker focus:outline-none focus:shadow-outline"
              >
                Programação
              </button>
              <button
                type="button"
                className="border border-accent-1 bg-accent-1 text-white text-xl rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-accent-1-darker focus:outline-none focus:shadow-outline"
              >
                Dicas
              </button>
              <button
                type="button"
                className="border border-accent-1 bg-accent-1 text-white text-xl rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-accent-1-darker focus:outline-none focus:shadow-outline"
              >
                Games
              </button>
              <button
                type="button"
                className="border border-accent-1 bg-accent-1 text-white text-xl rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-accent-1-darker focus:outline-none focus:shadow-outline"
              >
                Reflexões
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Index;

export async function getStaticProps() {
  return {
    props: {
      title: 'NextJS Blog',
      description: 'A Simple Markdown Content NextJS Blog'
    }
  };
}
