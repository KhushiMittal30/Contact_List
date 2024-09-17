import React from 'react'
import { useRouteError } from 'react-router-dom'


const error_page = () => {
    const error= useRouteError();
    console.error(error);
  return (
    <div id='error-page'>
        <h1>Oops!!</h1>
     <p>Sorry, An expected error has occured !</p>
     <p>
        <i>{error.statusText || error.message}</i>
     </p>   
    </div>
  )
}

export default error_page


