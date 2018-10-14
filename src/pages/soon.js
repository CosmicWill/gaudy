import React from 'react'

import Layout from '../components/layout'
import Header from '../components/header'

// returns a random integer from 0 to 9
// let count = () =>( Math.floor(Math.random() * 10));   

const theme = {
  dark: {
    background: 'black',
    color: 'white',
    headerBackground: 'black',
  },
  
  light:{
    background: 'white',
    color: 'black',
    headerBackground: 'white',
  },
  
  mixed: {
    background: 'white',
    color: 'white',
    headerBackground: 'black',
  }
  }
  ;

class SecondPage extends React.Component {
  state = { 
    count: 1 ,
    data: [
      "Some\nthing",
      "IS",
      "comming" ,
    ]
  
  };

  handleCount() {
    this.setState((prevState) => ({count: prevState.count+1}));
  }

  render(){
    return(
   <Layout>
    {/* <button 
    style={{ 
      margin: ' 0 auto',
      paddingTop: 0,
      position: 'fixed',
      height: '100%',
      width: '100%',
      backgroundColor: 'Transparent',
      backgroundRepeat:'no-repeat',
      border: 'none',
      cursor:'pointer',
      overflow: 'hidden',
      outline:'none',
    }} 
    onClick={(e) => this.handleCount(e)}>    </button> */}

        <Header siteTitle={"coming SOON"} width='55rem' height='25rem' theme={theme.dark}/>



  </Layout>
    )
  }
}
export default SecondPage
