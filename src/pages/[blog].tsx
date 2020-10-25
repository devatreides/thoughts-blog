import React from 'react';
import Head from 'next/head';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import gfm from 'remark-gfm';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const CodeBlock = ({ language, value }) => {
  return (
    <SyntaxHighlighter showLineNumbers={true} language={language}>
      {value}
    </SyntaxHighlighter>
  );
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

  return (
    <>
      <Head>
        <title>{data.title}</title>
      </Head>
      <Navbar articleMetaData={data} />
      <div className="bg-sadgreen-light flex flex-col min-h-screen justify-between">
        <div className="py-20 px-2">
          <div className="mx-auto max-w-5xl bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h1 className="text-center text-2xl font-bold text-sadgreen-light mb-6 md:text-4xl lg:text-5xl">
              {frontmatter.title}
            </h1>
            <h3 className="text-center text-2xl font-bold text-sadgreen-light mb-6 md:text-2xl lg:text-3xl">
              {frontmatter.description}
            </h3>
            <h3 className="text-lg font-bold text-black mb-6 md:text-md lg:text-lg">
              Escrito por {frontmatter.author} em {frontmatter.date}
            </h3>
            <article className="prose prose-lg max-w-none">
              <ReactMarkdown
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
  const content = await import(`../../content/${blog}.md`);
  const data = matter(content.default);

  return { ...data };
};
