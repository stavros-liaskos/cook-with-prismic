import Link from 'next/link';
import { RichText } from 'prismic-reactjs';
import { Fragment } from 'react';

import { client } from '../prismic-configuration';
import htmlSerializer from '../utils/html-serializer';
const stats = ['prep time', 'cook time', 'additional time', 'total time'];
const mock = [1, 23, 41, 53];

const Recipe = ({ recipe }: any) => {
  return (
    <Fragment>
      <Link href="/">
        <a>Back to blog list</a>
      </Link>
      <div className="border-2 border-black m-32">
        <span className="bg-blue-300 table mb-2 p-2 text-white">
          {'yield: 4 servings'.toUpperCase()}
        </span>

        <RichText render={recipe.data.title} htmlSerializer={htmlSerializer} />

        <div className="flex ml-4 mb-8">
          {stats.map((stat: string, key: number) => (
            <div key={key} className={`${key !== 3 ? 'border-r-2' : ''} mr-4 pr-4`}>
              <p className="text-gray-400">{stat}</p>
              <p className="text-gray-400">{mock[key]} minutes</p>
            </div>
          ))}
        </div>

        <h3 className="text-3xl mb-4">Ingredients</h3>
        <RichText render={recipe.data.ingredients} htmlSerializer={htmlSerializer} />
        <h3 className="text-3xl mb-4">Instructions</h3>
        <RichText render={recipe.data.description} htmlSerializer={htmlSerializer} />
      </div>
    </Fragment>
  );
};

export async function getServerSideProps({ query, res }: any) {
  // @ts-ignore
  const recipe = await client.getByUID('recipe', query.uid);

  res.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate');
  return { props: { recipe } };
}

export default Recipe;
