import React from 'react'
import "./info-card.scss"
export const InfoCard = (props) => {
    const { items = [], ...rest } = props

    return items?.length > 0 && <ul className='info-card'>
        {items.map((item, index) => <li key={index}>{item}</li>)}

    </ul>



    // {items?.length > 0 &&   <ul className='info-card'>
    //     {items.map((item,index)=><li key={index}>{item}</li>)}

    // </ul>}
    // (items?.length ? 0 ?<>
    //     <ul className='info-card'>
    //         {items.map((item, index) => <li key={index}>{item}</li>)}

    //     </ul> </>:null)



}

