import { Progress } from '@features';
import { SmallCardTwo } from '@features/small-card';
import { Button, Icon, PageHeader, Modal } from '@shared';
import React, { useEffect, useState } from 'react';
import { fnoRadio } from '../../form/input-configuration';
import "./css/fno.scss";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { fnoSchema } from '../../form/validation';
import { handleFormSubmission } from '../../form/form-util';
import { retrievingData, storingData } from '../../shared/utils/common-function';
import { useNavigate } from 'react-router-dom';
import { FnoUpload, RiskDisclosure } from '../../features/fno-modal';

export const Fno = () => {
  const [btnStatus, setBtnStatus] = useState("invalid");
  const [riskModal, setRiskModal] = useState(false);
  const [uploadModal, setUploadModal] = useState(false);
  const navigate = useNavigate()

  const {
    handleSubmit,
    formState: { isValid },
    setValue,
    watch,
    reset
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(fnoSchema),
  });
  const fnoType = watch("fnoType")
  useEffect(() => {
    let fnoData = retrievingData("fno");
    reset(fnoData)
  }, []);
  useEffect(() => {
    setBtnStatus(isValid ? "valid" : "invalid");
  }, [isValid]);

  const fnoSet = (event) => {
    setValue(fnoRadio?.name, event.target.value, { shouldValidate: true });
  };

  const onSubmit = async (formData) => {
    storingData(`fno`, formData)
    setBtnStatus("loading");
    try {
      await handleFormSubmission();
      setRiskModal(true);
    } catch (error) {
    } finally {
      setBtnStatus(isValid ? "valid" : "invalid");
    }
  }

  const backNavigate = () => {
    navigate('/signature')
  }

  const skip = () => {
    navigate('/selfie')

  }

  return (
    <>
      <Progress title="Segment Activation" on={7} upto={9} />
      <div className='page-container'>

        {/* <Icon name="back" size={22} color="black" ariaLabel="back icon" onClick={backNavigate} /> */}
        <div className='form-container'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <PageHeader title={"Activate Futures & Options"} subtitle={"Upload any one income proof. You can complete this step later"} backNavigate={backNavigate} />
            <div className="grid  lg:grid-cols-2  grid-cols-1 gap-4 mb-7">
              <div className='fno-card bg-green-200/10 border border-solid border-green/20'>
                <Icon name="design-checked" size={17} ariaLabel="design-checked icon" />
                <p><span className='font-medium'> Equity and Mutual Funds</span> are activated by default.
                </p>
              </div>
              <div className='fno-card bg-yellow-600/10 border border-solid border-yellow-600/20'>
                <Icon name="users" size={18} ariaLabel="users icon" />
                <p><span className='font-medium'> 50 Lakh</span>  users activated derivatives segment with us
                </p>
              </div>
            </div>
            <div className='custom-radio-container'>
              {
                fnoRadio?.valueList.map((option, index) => (
                  <div className='custom-radio-wrapper' key={index}>
                    <input type="radio" className='custom-radio' name={fnoRadio?.name} value={option.id} id={option.id} onChange={fnoSet} checked={fnoType == option.id}
                    />
                    <label className='custom-radio-label' htmlFor={option.id}>{option.label}</label>
                  </div>
                ))
              }
            </div>

            <SmallCardTwo iconName={"sheild"} text={"Your information is safe and encrypted."} />
            <div className="grid  lg:grid-cols-2  grid-cols-1 gap-4">
              <Button status={"valid"} mode={"secondary"} onClick={skip}>ACTIVATE FNO LATER</Button>
              <Button type='submit' status={btnStatus}>Proceed</Button>
            </div>
          </form>
        </div>
      </div>
      <Modal isOpen={riskModal} onClose={() => setRiskModal(false)} style={{ maxWidth: "600px" }}
        title={"Risk Disclosure on Derivatives"} >
        <RiskDisclosure onSucces={() => {
          setRiskModal(false);
          setUploadModal(true);
        }} />
      </Modal >
      <Modal isOpen={uploadModal} onClose={() => setUploadModal(false)} style={{ maxWidth: "600px" }}
        title={"Upload bank statement"} subtitle={"Use .pdf files only (up to 10 MB)"} >
        <FnoUpload onSucces={() => {
          setUploadModal(false);
          navigate("/selfie")
        }} />
      </Modal >


    </>
  )
}
