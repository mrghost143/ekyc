import { Progress } from '@features';
import { Icon, PageHeader } from '@shared';
import React from 'react';
import { Bank } from '../../form/bank';
import { useNavigate } from 'react-router-dom';

export const BankDetails = () => {
  const navigate = useNavigate();
  const backNavigate =()=>{
    navigate('/personal')
}
  return (
    < >
      <Progress title="Bank Details" on={5} upto={9}  />
      <div className='page-container'>

        {/* <Icon name="back" size={22} color="black" ariaLabel="back icon" onClick={backNavigate} /> */}
        <div className='form-container'>
            <PageHeader title={"Verify your bank account"} subtitle={"Bank account is mandatory to add funds to your demat account"} backNavigate={backNavigate} />
            <Bank/>
        </div>
      </div>
    </ >
  )
}
