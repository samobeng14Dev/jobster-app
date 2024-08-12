import React from 'react'
import { Link } from 'react-router-dom'
import img from '../assets/images/not-found.svg'
import Wrapper from '../assets/wrappers/ErrorPage'

const Error=()=> {
  return (
    <Wrapper className='full-page'>
      <div>
        <img src={img} alt="error" className="img" />
        <h3>Oops! Page Not Found</h3>
        <p>Sorry, the page you tried cannot be found</p>
        <Link to="/" className="btn">back home</Link>
      </div>

    </Wrapper>
  )
}

export default Error
