import React from 'react';


export const PageAside = ({ title,imageSrc }) => {
  return (
    <>
      <h5 className='page-aside-title'>{title}</h5>
      <img src={imageSrc} loading='lazy' alt="emailverification" className='aside-img' />
    </>
  )
}
