import React from "react"
import { graphql } from "gatsby"
import Layout from '../components/layout'
import Img from 'gatsby-image'
import { Spring,config } from 'react-spring'
import { Card, CardBody, Button, CardTitle, CardText, CardImg, Row, Col, Container } from 'reactstrap';

const RECTANGLE = 'M0,0 L0,80 L300,80 L300,0 Z'

const styles = {
  container: {display: 'flex', alignItems: 'center', justifyContent: 'center',  willChange: 'background', },
  shape: { width: 300, height: 80, willChange: 'transform' },
  header: { position: 'absolute', left:'50%', transform: 'translate(-50%, -50%)', width: 300, textAlign:'center', fontSize: '5rem', zIndex: 5, willChange: 'top'},
  nav: { position: 'absolute', display: 'inline', textAlign:'center', fontSize: '1rem', willChange: 'opacity'},
  dez: { position: 'fixed', width: '200px', height: '200px', willChange: 'transform', }
}

const header = ({ toggle, color, scalex, scaley,scalez,shape, start, end, stop, rotation, top, opacity, navTop, svgTop }) => (
  
  <Container style={{ ...styles.container, height: '100%', background: `linear-gradient(to bottom, ${start} ${stop}, ${end} 100%)` }}>      
  <Row>
    <Col>
      <svg
        style={{ ...styles.shape, transform: `scale3d(${scalex}, ${scaley}, ${scalez}) rotate(${rotation})` ,top: `${svgTop}` }}
        version="1.1"
        viewBox="0 0 300 80">
        <g fill={color} fillRule="evenodd" >
          <path id="path-1" d={shape} />
        </g>
      </svg>
      <h1 onClick={toggle} className='anaglyph' style={{ ...styles.header, top: `${top}`}}>
        GUADY  
      </h1>
      </Col>

      </Row>
      <Row>
        <Col>
      <div id="nav-menu" style={{...styles.nav ,top:`${navTop}`, opacity: opacity}}>
        <ul style={{display: 'inline'}}>
          <li><a href='#' title='Gallary'>Gallary</a></li>
          <li><a style={{textShadow: '-1px 0 1px rgb(246,5,10) , 3px 0 1px rgb(30,242,241)'}} href='#' title='Sales'>Sales</a></li>
          <li><a href='#' title='Contact Me'>Contact Me</a></li>
        </ul>
      </div>
      </Col>
      </Row>
  </Container> 
)

const dez = ({ image, rotation, translate }) => (
  <div style={{...styles.dez, transform: `rotate(${rotation}) translate3d(${translate})`}}>
    <Img fluid={image} />  
  </div>
)


class Home extends React.Component {
  state = { toggle: true, width: 0, height: 0}
  updateWindowDimensions = this.updateWindowDimensions.bind(this)
  
  toggle = () => this.setState(state => ({ toggle: !state.toggle }))
  componentWillUnmount() {window.removeEventListener('resize', this.updateWindowDimensions);}
  updateWindowDimensions() {this.setState({ width: window.innerWidth, height: window.innerHeight });}
  
  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  render() {
    const toggle = this.state.toggle
    const width = this.state.width/300.0
    const height = this.state.height/80.0

    return (
      <Layout>
        <Spring 
        config={config.slow}
          from={{ 
            opacity: 0, 
            color: 'white',
            start: 'black',
            end: 'black', 
          }}
          to={{ 
            color: toggle ? 'black' : 'black',
            start: toggle ? 'white' : 'black',
            end: toggle ? 'white' : 'black',
            scalex: toggle ? 1 : 0,
            scaley: toggle ? 1 : 0,
            scalez: toggle ? 1 : 0,
            shape: RECTANGLE,
            stop: toggle ? '0%' : '50%',
            rotation: toggle ? '0deg' : '0deg',
            top: toggle ? '50%' : '7%',
            navTop: toggle ? '50%' : '11%',
            svgTop: toggle ? '50%' : '0%',
            opacity: toggle ? 0 : 1,
          }}
          toggle={this.toggle} // Additional props will be spread over the child
          children={header} // Render prop
        />
        <Spring config={config.molasses}
          from={{       
            rotation: '0deg',            
            translate:'200px,1000px,0px',   
            image: this.props.data.dez.childImageSharp.fluid,
          }}
          to={{ 
            rotation: '0deg',            
            translate: toggle ? '200px,-200px,0px' : '200px,1000px,0px',
          }}
          toggle={this.toggle} // Additional props will be spread over the child
          children={dez} // Render prop
        />

        <Spring config={config.molasses}
          from={{
            rotation: '90deg',            
            translate:'-300px,1000px,0px',
            image: this.props.data.hardhatDez.childImageSharp.fluid,
          }}
          to={{ 
            rotation: '90deg',            
            translate: toggle ? '-300px,1000px,0px' : '-300px,0px,0px',   
          }}
          toggle={this.toggle} // Additional props will be spread over the child
          children={dez} // Render prop 
        />

        <Container fluid>
        <Row>
        <Col sm="6">
          <Card>
            <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
            <CardBody>
              <CardTitle>Card Title</CardTitle>
              <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText>
              <CardText>
                <small className="text-muted">Last updated 3 mins ago</small>
              </CardText>
            </CardBody>
          </Card>
        </Col>
        <Col sm="6">
          <Card>
            <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
            <CardBody>
              <CardTitle>Card Title</CardTitle>
              <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText>
              <CardText>
                <small className="text-muted">Last updated 3 mins ago</small>
              </CardText>
            </CardBody>
          </Card>
        </Col>
        <Col sm="6">
          <Card>
            <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
            <CardBody>
              <CardTitle>Card Title</CardTitle>
              <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText>
              <CardText>
                <small className="text-muted">Last updated 3 mins ago</small>
              </CardText>
            </CardBody>
          </Card>
        </Col>

        <Col sm="6">
          <Card>
            <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
            <CardBody>
              <CardTitle>Card Title</CardTitle>
              <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText>
              <CardText>
                <small className="text-muted">Last updated 3 mins ago</small>
              </CardText>
            </CardBody>
          </Card>
        </Col>
        </Row>
      </Container>
      </Layout>
    )
  }
}

export default Home

export const query = graphql`
  query {
    dez: file(relativePath: { eq: "cleanup.png" }) {
      childImageSharp {
        # Specify the image processing specifications right in the query.
        # Makes it trivial to update as your page's design changes.
        fluid(maxWidth: 1000) {
          ...GatsbyImageSharpFluid_withWebp_noBase64
        }
      }
    }
    hardhatDez: file(relativePath: { eq: "hardhat-dez.png" }) {
      childImageSharp {
        # Specify the image processing specifications right in the query.
        # Makes it trivial to update as your page's design changes.
        fluid(maxWidth: 1000) {
          ...GatsbyImageSharpFluid_withWebp_noBase64
        }
      }
    }
  }
`