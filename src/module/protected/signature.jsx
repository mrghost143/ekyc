import React, { useRef, useState } from 'react';
import { Progress } from '@features';
import { Button, Icon, PageHeader } from '@shared';
import { FileUI } from '../../shared/components/file-feature';
import { CheckPermission } from '../../shared/components/check-permission';
import { SignDraw } from '../../shared/components/signature-draw';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const Signature = () => {
  const [btnStatus, setBtnStatus] = useState("invalid");
  const [isChecked, setIsChecked] = useState(true);
  const [signType, setSignType] = useState("sign");
  const [showImage, setShowImage] = useState("");

  const navigate = useNavigate()
  const signCanvas = useRef({});

  const signTypeChange = () => {
    setBtnStatus("invalid");
    setShowImage("")
    signType == "sign" ? setSignType("upload") : setSignType("sign")
  }

  useEffect(() => {

    let uploadedImage = localStorage.getItem("Signature");
    if (uploadedImage) {
      setSignType("upload");
      setBtnStatus("valid")
      setShowImage(uploadedImage)
    }
  }, [])

  const onSubmit = (e) => {
    e.preventDefault();

    if (btnStatus == "valid") {
      if (signType === "sign") {
        const image = signCanvas.current.toDataURL("image/png");
        setShowImage(image)
        setSignType("upload")
      } else {
        toast.success("Document uploaded successfully")
        navigate("/fno")
      }
    } else {
      toast.error("Please upload document")
    }


  }

  const backNavigate = () => {
    navigate('/bank-upload')
  }

  return (
    < >
      <Progress title="Personal Details" on={6} upto={9} />
      <div className='page-container'>

        {/* <Icon name="back" size={22} color="black" ariaLabel="back icon" onClick={backNavigate} /> */}
        <div className='form-container'>
          <form onSubmit={onSubmit}>
            <PageHeader title={"Sign inside the box or upload signature"} subtitle={"Please make sure it matches your PAN signature"}  backNavigate={backNavigate}/>
            {signType == "sign" ? <SignDraw setBtnStatus={setBtnStatus} btnStatus={btnStatus} signCanvas={signCanvas} /> : <FileUI setBtnStatus={setBtnStatus} name={"Signature"} showImage={showImage} />}
            <CheckPermission setIsChecked={setIsChecked} isChecked={isChecked} label={"I am not a politically exposed person"} />
            <div className="grid  lg:grid-cols-2  grid-cols-1 gap-4">
              <Button type='button' status={"valid"} mode={"secondary"} onClick={signTypeChange}> {signType == "upload" ? "DRAW" : "Upload"} SIGNATURE</Button>
              <Button type='submit' status={btnStatus}  >{signType == "sign" ? "Proceed" : "Confirm"}</Button>
            </div>
          </form>
        </div>
      </div>
    </ >
  )
}
