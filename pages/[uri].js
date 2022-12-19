import Head from 'next/head'
import { client } from '../lib/apollo';
import { gql } from "@apollo/client";
import { useEffect } from 'react';

export default function SlugPage({ post }) {
useEffect(()=>{
  location = `https://www.infolate.com/${post?.slug}`
},[])
  return (
    <div>
      <Head>
        <title>{post?.title}</title>
        <meta property="og:title" content={post?.title} />
        <meta property="og:description" content={post?.title} />
        <meta property="og:image" content={post?.featuredImage?.node?.sourceUrl} />
        <meta property="og:url" content={`https://gujaratimedia.vercel.app/${post?.slug}`} />
        <meta property="og:type" content="articals" />
        <link rel="icon" href="favicon.ico"></link>
      </Head>
      {/* <main>
          <div className="siteHeader">
            <h1 className="title">
                {post.title}
            </h1>
            <p>✍️  &nbsp;&nbsp;{`${post.author.node.firstName} ${post.author.node.lastName}`} | 🗓️ &nbsp;&nbsp;{ new Date(post.date).toLocaleDateString() }</p>
          </div>
            <article dangerouslySetInnerHTML={{__html: post?.content}}>   
            </article>
      </main> */}
    </div>
  )
}
const GET_POST = gql`
    query GetPostByURI($id: ID!) {
      post(id: $id, idType: URI) {
        title
        excerpt
        slug
        content
        uri
        featuredImage {
          node {
              sourceUrl
          }
      }
        date
        author {
          node {
            firstName
            lastName
          }
        }
      }
    }
  `

export async function getStaticProps({ params }){
  //  the params argument for this function corresponds to the dynamic URL segments
  //  we included in our page-based route. So, in this case, the `params` object will have
  //  a property named `uri` that contains that route segment when a user hits the page
  
  
  const response = await client.query({
      query: GET_POST,
      variables: {
        id: params.uri
      }
    })

  
    const post = response?.data?.post
    return {
      props: {
        post
      }
    }
  }

export async function getStaticPaths(){
    const paths = []
    return {
        paths,
        fallback: 'blocking'
    }
}
