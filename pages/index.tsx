import Prismic from 'prismic-javascript';
import { RichText, Date } from 'prismic-reactjs';
import Link from 'next/link';

import { client, linkResolver, hrefResolver } from '../prismic-configuration';

const BlogHome = ({ home, recipes }: any) => {
  console.warn(recipes);
  return (
    <>
      <div className="h-screen -mt-32 flex items-center justify-center">
        <div>
          <img src={home.data.image.url} alt="avatar" />
          <h1 className="text-6xl">{RichText.asText(home.data.headline)}</h1>
          <p className="text-2xl">{RichText.asText(home.data.description)}</p>
        </div>
      </div>

      <ul>
        {recipes?.results.map((recipe: any) => (
          <li key={recipe.uid}>
            <Link href={hrefResolver(recipe)} as={linkResolver(recipe)} passHref>
              <a className="text-lg">{RichText.render(recipe.data.title)}</a>
            </Link>
            <span className="text-xs">{Date(recipe.data.date).toString()}</span>
          </li>
        ))}
      </ul>
    </>
  );
};

export async function getServerSideProps({ res }: any) {
  // @ts-ignore
  const home = await client.getSingle('blog_home');
  const recipes = await client.query(Prismic.Predicates.at('document.type', 'recipe'), {
    orderings: '[my.recipe.date desc]',
  });

  res.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate');
  return { props: { home, recipes } };
}

export default BlogHome;
