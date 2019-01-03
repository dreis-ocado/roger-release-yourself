import React from 'react'
import { Link } from 'gatsby'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import config from '../utils/siteConfig'
import Layout from '../components/Layout'
import Container from '../components/Container'
import PageBody from '../components/PageBody'

import PostLinks from '../components/PostLinks'

const PostTemplate = ({ data, pageContext }) => {
  const {
    title,
    body,
    mixcloudLink,
  } = data.contentfulPost
  const postNode = data.contentfulPost

  const previous = pageContext.prev
  const next = pageContext.next

  return (
    <Layout>
      <Helmet>
        <title>{`${title} - ${config.siteTitle}`}</title>
      </Helmet>
      <div className="box">
        <div className="mixcloud-player row 25%" data-mixcloud-play-button={mixcloudLink}>
              <div className="1u 12u$(medium) buttons">
                <span className="play-button fa fa-play-circle"></span>
              </div>
              <div className="11u$ 12u$(medium)">
                <div className="title"><h2>{title}</h2></div>
                <span className="owner">by Roger Sanchez</span>
              </div>
        </div>

        <div class="collapse transparent row">
						<h5>Show Tracklist</h5>
            <PageBody body={body} />
        </div>
      </div>

      <PostLinks previous={previous} next={next} />
    </Layout>

  )
}


export const query = graphql`
  query($slug: String!) {
    contentfulPost(slug: { eq: $slug }) {
      title
      slug
      mixcloudLink
      publishDate(formatString: "MMMM DD, YYYY")
      publishDateISO: publishDate(formatString: "YYYY-MM-DD")
      tags {
        title
        id
        slug
      }
      body {
        childMarkdownRemark {
          html
          excerpt(pruneLength: 320)
        }
      }
    }
  }
`

export default PostTemplate
