import React, { useEffect, useState } from 'react'
import { Progress } from '@features';
import { Button, Icon, PageHeader } from '@shared';
import { useNavigate } from 'react-router-dom';
import { handleFormSubmission } from '../../form/form-util';
import { FileUI } from '../../shared/components/file-feature';
import { toast } from 'react-toastify';

export const Selfie = () => {
  const navigate = useNavigate();
  const [btnStatus, setBtnStatus] = useState("invalid");
  const [showImage, setShowImage] = useState("");

  const backNavigate = () => {
    navigate('/fno')
  }

  useEffect(() => {
    let uploadedImage = localStorage.getItem("Selfie");
    if (uploadedImage) {
        setShowImage(uploadedImage);
        setBtnStatus("valid")
    }
}, []);



  const onSubmit = (e) => {
    e.preventDefault();

    if (btnStatus == "valid") {
        toast.success("Document uploaded successfully")
        navigate('/application-form')
    } else {
        toast.error("Please upload document")
    }
};


  return (
    < >
      <Progress title="Selfie Verification" on={8} upto={9} />
      <div className='page-container'>

        {/* <Icon name="back" size={22} color="black" ariaLabel="back icon" onClick={backNavigate} /> */}
        <div className='form-container'>
          <form onSubmit={onSubmit}>
            <PageHeader title={"Confirm Selfie"} subtitle={"Make sure your face is clearly visible"} backNavigate={backNavigate} />
            <FileUI
              setBtnStatus={setBtnStatus}
              name={"Selfie"}
              showImage={showImage}
            />
            {/* <div className="grid  lg:grid-cols-2  grid-cols-1 gap-4"> */}
              {/* <Button status={"valid"} mode={"secondary"}>CLICK AGAIN</Button> */}
              <Button type='submit' status={btnStatus}>Proceed</Button>
            {/* </div> */}
          </form>
        </div>
      </div>
    </>
  )
}
