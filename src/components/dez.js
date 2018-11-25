import React from 'react'
import { graphql, StaticQuery } from 'gatsby'
import Img from 'gatsby-image'


const dez = () => (
    <StaticQuery
        query={graphql`
        query {
        imageOne: file(relativePath: { eq: "cleanup.png" }) {
                childImageSharp {
                    fluid(maxWidth: 1000) {
                        ...GatsbyImageSharpFluid_withWebp_noBase64
                    }
                }
        }
        }`}
        render={data => (<Img fluid={data.imageOne.childImageSharp.fluid} />)}
    />
)

export default dez

