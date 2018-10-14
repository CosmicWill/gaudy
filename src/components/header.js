import React from 'react'
import { Link } from 'gatsby'

const flexBox = { 
  margin: '0 auto',             
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: "center",
}

const threeD = {
  margin: '30px auto 0',
  display: 'block',
  width: '400px',
  height: '400px',
  filter: 'saturate(.75)',
  perspective: '400px',
  transform: 'rotateY(5deg)',
  zIndex: '2',
  backgroundColor: 'cyan',
  backgroundBlendMode: 'lighten',
  backgroundSize: 'cover',
}


const Header = ({ siteTitle, to='/' , theme, height}) => (
  <div
    style={{
      width:'100%',
      height:'100%',
      background: theme.background,
      ...flexBox,
    }}
    className=''
  >
    <div
      style={{
        background: theme.headerBackground,
        width: '19rem',
        height: '5rem',
        ...flexBox,
      }}
    >
      <h1
        style={{ 
          fontSize: '5rem',
          ...flexBox,
        }}
      >
        <Link
          className='anaglyph'
          to={to}
          style={{
            display: 'flex',
            color: theme.color,
            textDecoration: 'none',
            textAlign: "center",
            width:'100%',
            height:'100%', 
          }}
        >
          {siteTitle}
        </Link>
      </h1>
    </div>
  </div>
)

export default Header
