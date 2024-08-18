import React, { useState } from 'react';

export default function LoginSuccessful() {

  const [logdinuser] = useState(JSON.parse(localStorage.getItem('logdinuser')));
  
  return (
    <div className='mt-5 mb-5'>LoginSuccessful <b> {logdinuser?.email} </b></div>
  )
}
