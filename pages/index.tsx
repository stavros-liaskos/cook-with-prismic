import Prismic from 'prismic-javascript';
import { RichText, Date } from 'prismic-reactjs';
import Link from 'next/link';

import { client } from '../prismic-configuration';
import { linkResolver, hrefResolver } from '../utils/linkResolver';
import htmlSerializer from '../utils/html-serializer';

const BlogHome = ({ home, recipes }: any) => {
  return (
    <>
      <div className="h-screen -mt-32 flex items-center justify-center">
        <div>
          <img src={home.data.image.url} alt="avatar" />

          <RichText render={home.data.headline} htmlSerializer={htmlSerializer} />
          <p className="text-2xl">{RichText.asText(home.data.description)}</p>
        </div>
      </div>

      <ul>
        {recipes?.results.map((recipe: any) => (
          <li key={recipe.uid}>
            <span className="text-xs">
              {Intl.DateTimeFormat('en-US', {
                year: 'numeric',
                month: 'short',
                day: '2-digit',
              }).format(Date(recipe.data.date))}
            </span>
            <Link href={hrefResolver(recipe)} as={linkResolver(recipe)} passHref>
              <a className="text-lg">{RichText.render(recipe.data.title)}</a>
            </Link>
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
