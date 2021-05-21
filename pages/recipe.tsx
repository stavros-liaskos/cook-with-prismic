import Link from 'next/link';
import { RichText, Date } from 'prismic-reactjs';

import { client } from '../prismic-configuration';

const Recipe = ({ recipe }: any) => (
  <div>
    <Link href="/">
      <a>Back to blog list</a>
    </Link>
    {RichText.render(recipe.data.title)}
    <span>{Date(recipe.data.date).toString()}</span>
    {RichText.render(recipe.data.ingredients)}
    {RichText.render(recipe.data.description)}
  </div>
);

export async function getServerSideProps({ query, res }: any) {
  // @ts-ignore
  const recipe = await client.getByUID('recipe', query.uid);

  res.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate');
  return { props: { recipe } };
}

export default Recipe;
