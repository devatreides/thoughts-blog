import Head from 'next/head';

export default function MetaData({
  title,
  description = '',
  frontmatter = null
}) {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      <meta name="robots" content="index, follow" />
      <script
        data-ad-client="ca-pub-7826067101448928"
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
      />
      <meta name="Description" content={description}></meta>
      <title>{title}</title>
      {frontmatter.typeArticle === 'translate' ? (
        <link
          rel="alternate"
          hrefLang="en"
          href={frontmatter.originalArticle}
        />
      ) : null}
    </Head>
  );
}
