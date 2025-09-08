import React from 'react'
import Hero from '../components/About/Hero'
import StoriesArticlesGallery from '../components/Stories/Articles'
import { Helmet } from 'react-helmet-async'

const heroBg ="https://res.cloudinary.com/dvadtratp/image/upload/v1747327033/bestpointgh/tlimnbsaqc9mweziayjl.png"
function Stories() {
  return (
    <div>
      <Helmet>
        <title>News – Tips, Articles, Stories & News from Best Point
</title>
<meta name='description' content='Stay updated with the latest news and announcements from Best Point. Explore stories on financial services, community initiatives, and business growth.' />
      </Helmet>
      <Hero image={heroBg} text1={"News"}/>
      <StoriesArticlesGallery />
    </div>
  )
}

export default Stories
