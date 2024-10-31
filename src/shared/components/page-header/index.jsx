import React from 'react'
import "./page-header.scss"
import { Icon } from '../../icon/container-icon'
export const PageHeader = ({ title, subtitle, backNavigate }) => {

  const onInfoClick = () => {
    const asidetag = document.querySelector(".aside-wrapper");
    asidetag.classList.add("active");
    const body = document.querySelector("body");
    body.classList.add("overflow-hidden");

  }
  return (
    <div className='mb-10 flex  gap-5 page-header-wrapper'>
      {backNavigate && <Icon name="back" size={22} color="black" ariaLabel="back icon" onClick={backNavigate} />}
      <div className="page-header">
        <h3 className='page-title'>
          {title}
        </h3>
        {subtitle && <p className='page-subtitle'>
          {subtitle}
        </p>}
      </div>


      <Icon name="question" size={22} color="black" ariaLabel="page-info-icon" onClick={onInfoClick} className='ml-auto page-info-icon' />
    </div>
  )
}

