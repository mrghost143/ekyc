import React, { useState } from 'react';
import { Progress } from '@features';
import { Icon } from '@shared';
import { useNavigate } from 'react-router-dom';
import { NomineeAdd } from '../../form/nominee-add';
import { NomineeFetch } from '../../form/nominee-fetch';
import "./css/nominee.scss";

export const NomineeDetails = () => {
  const navigate = useNavigate();
  const [pageStage, setPageStage] = useState(1);
  const [nomineeIndex, setNomineeIndex] = useState(1);
  const [totalPercent, setTotalPercent] = useState(0);
  const backNavigate = () => {
    navigate("/personal");
  };
  return (
    <>
      <Progress title="Add Nominee Details" on={4} upto={9} />
      <div className='page-container'>

        {/* <Icon name="back" size={22} color="black" ariaLabel="back icon" onClick={backNavigate} /> */}

        {pageStage === 1 ? (
          <NomineeFetch setNomineeIndex={setNomineeIndex} setPageStage={setPageStage} nomineeIndex={nomineeIndex} setTotalPercent={setTotalPercent} totalPercent={totalPercent}  backNavigate={backNavigate}/>
        ) : (
          <NomineeAdd setPageStage={setPageStage} nomineeIndex={nomineeIndex}  backNavigate={backNavigate}/>
        )}
      </div>
    </ >
  )
}
