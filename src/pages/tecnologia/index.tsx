import React from 'react';
import matter from 'gray-matter';
import Link from 'next/link';
import fs from 'fs';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import MetaData from '../../components/MetaData';

const Programacao = ({ data, title }) => {
  const RealData = data.map((blog) => matter(blog));
  let ListItems = RealData.map((listItem) => listItem.data);
  ListItems = ListItems.sort((a, b) => {
    const dateA = new Date(a.dateOrder);
    const dateB = new Date(b.dateOrder);

    return dateA.getTime() - dateB.getTime();
  }).reverse();

  return (
    <>
      <MetaData title={title} />
      <Navbar hrefReturn="/" articleMetaData={{ title: title }} />
      <div className="flex flex-col justify-between py-16">
        <div className="py-5 px-2">
          <h1 className="text-center text-2xl font-bold text-accent-1 mb-6 md:text-4xl lg:text-5xl">
            Tecnologia
          </h1>
          {ListItems.map((blog, i) => (
            <div
              key={i}
              className="bg-gray-lighter mx-auto my-4 py-2 rounded shadow-lg flex flex-wrap items-start lg:w-3/5"
            >
              <div
                className="w-full md:w-1/4 h-48 rounded md:rounded"
                style={{
                  backgroundImage: `url('/img/content/tecnologia/${blog.slug}/${blog.thumbnail}')`,
                  backgroundSize: 'cover'
                }}
              ></div>
              <div className="card-rounded-detail w-full md:hidden"></div>

              <div className="md:w-3/5 p-4 md:h-48">
                <div className="mb-8">
                  <div className="text-accent-1 font-bold text-xl mb-2">
                    <Link href={`/tecnologia/${blog.slug}`}>{blog.title}</Link>
                  </div>
                  <p className="text-accent-1-darker text-base">
                    {blog.description}
                  </p>
                </div>
                <div className="flex items-center">
                  <img
                    className="w-10 h-10 rounded-full mr-4"
                    src={`/img/avatar/${blog.avatar}`}
                    alt={`Avatar de ${blog.author}`}
                  />
                  <div className="text-sm">
                    <p className="text-sadgreen-dark leading-none">
                      {blog.author}
                    </p>
                    <p className="text-sadgreen-darker">{blog.date}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Programacao;

export async function getStaticProps() {
  const files = fs.readdirSync(`${process.cwd()}/content/tecnologia`, 'utf-8');

  const blogs = files.filter((fn) => fn.endsWith('.md'));
  const data = blogs.map((blog) => {
    const path = `${process.cwd()}/content/tecnologia/${blog}`;
    const rawContent = fs.readFileSync(path, {
      encoding: 'utf-8'
    });

    return rawContent;
  });

  return {
    props: {
      data: data,
      title: 'Tecnologia'
    }
  };
}
