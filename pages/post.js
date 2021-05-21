import React from 'react'
import Link from 'next/link'
import {RichText, Date} from 'prismic-reactjs'
import {client} from '../prismic-configuration'

const Post = ({post}) => (
    <div>
        <Link href="/">
            <a>Back to blog list</a>
        </Link>
        {RichText.render(post.data.title)}
        <span>{Date(post.data.date).toString()}</span>
        {RichText.render(post.data.post_body)}
    </div>
)

export async function getServerSideProps({query, res}) {
    const post = await client.getByUID('post', query.uid)

    res.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate')
    return {props: {post}}
}

export default Post