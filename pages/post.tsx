import Link from 'next/link';
import { RichText, Date } from 'prismic-reactjs';

import { client } from '../prismic-configuration';

const Post = ({ post }: any) => (
        <div>
    <Link href="/">
      <span>Back to blog list</span>
    </Link>
    {RichText.render(post.data.title)}
    <span>{Date(post.data.date).toString()}</span>
    {RichText.render(post.data.post_body)}
  </div>
);

export async function getServerSideProps({ query, res }: any) {
  // @ts-ignore
  const post = await client.getByUID('post', query.uid);

  res.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate');
  return { props: { post } };
}

export default Post;
