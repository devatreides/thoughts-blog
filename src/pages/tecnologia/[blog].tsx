import React from 'react';
import Head from 'next/head';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import gfm from 'remark-gfm';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const CodeBlock = ({ language, value }) => {
  return <SyntaxHighlighter language={language}>{value}</SyntaxHighlighter>;
};

const flatten = (text: string, child) => {
  return typeof child === 'string'
    ? text + child
    : React.Children.toArray(child.props.children).reduce(flatten, text);
};

const HeadingRenderer = (props) => {
  const children = React.Children.toArray(props.children);
  const text = children.reduce(flatten, '');
  const slug = text.toLowerCase().replace(/\W/g, '-');
  return React.createElement('h' + props.level, { id: slug }, props.children);
};

const Blog = ({ content, data }) => {
  const frontmatter = data;

  console.log(frontmatter);
  return (
    <>
      <Head>
        <meta name="Description" content={data.description}></meta>
        <title>{data.title}</title>
        {frontmatter.typeArticle === 'translate' ? (
          <link
            rel="alternate"
            hrefLang="en"
            href={frontmatter.originalArticle}
          />
        ) : null}
      </Head>
      <Navbar hrefReturn="/tecnologia" articleMetaData={data} />
      <div className="flex flex-col justify-between pb-8">
        <div className="pb-20 px-2">
          <div className="mx-auto max-w-6xl px-8 border border-gray border-opacity-75 rounded-md shadow-md pt-6 pb-8 mb-4">
            <div className="flex flex-col items-center">
              <img
                alt="thumb-article"
                src={`/img/content/tecnologia/${frontmatter.slug}/${frontmatter.thumbnail}`}
                width="45%"
              />
            </div>
            <h1 className="text-center text-2xl font-bold text-accent-1 mb-6 md:text-4xl lg:text-5xl">
              {frontmatter.title}
            </h1>
            <h3 className="text-center text-2xl font-bold text-accent-1 mb-6 md:text-2xl lg:text-3xl">
              {frontmatter.description}
            </h3>
            <div className="border-gray shadow-lg">
              {frontmatter.typeArticle === 'translate' ? (
                <>
                  <h3 className="text-lg font-bold text-black md:text-sm lg:text-sm">
                    Traduzido por {frontmatter.author} em {frontmatter.date}
                  </h3>
                  <h3 className="text-lg font-bold text-black mb-6 md:text-sm lg:text-sm">
                    Escrito originalmente por {frontmatter.originalAuthor}.Para
                    acessar o artigo original,{' '}
                    <a
                      rel="noreferrer"
                      target="_blank"
                      href={frontmatter.originalArticle}
                    >
                      clique aqui
                    </a>
                  </h3>
                </>
              ) : (
                <h3 className="text-lg font-bold text-black md:text-sm lg:text-sm">
                  Escrito por {frontmatter.author} em {frontmatter.date}
                </h3>
              )}
            </div>
            <article className="prose prose-lg max-w-none">
              <ReactMarkdown
                escapeHtml={false}
                plugins={[gfm]}
                source={content}
                renderers={{ code: CodeBlock, heading: HeadingRenderer }}
              />
            </article>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Blog;

Blog.getInitialProps = async (context) => {
  const { blog } = context.query;
  // Import our .md file using the `slug` from the URL
  const content = await import(`../../../content/tecnologia/${blog}.md`);
  const data = matter(content.default);
  return { ...data };
};
