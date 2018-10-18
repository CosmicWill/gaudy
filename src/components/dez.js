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
        render={data => (
            <div style={{
                position: 'absolute',
                bottom: '10px',
                right: '10px',
                width: '200px',
                height: '200px',
            }}>
            <Img fluid={data.imageOne.childImageSharp.fluid} />
            </div>
        )}
    />
)

export default dez

