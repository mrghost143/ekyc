import React, { useEffect, useState } from 'react';

import { Button, PageHeader, Icon, CustomInput, Modal } from '@shared';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { OTPForm } from '@features';
import { emailSchema } from './validation';
import { handleFormSubmission } from './form-util';
import { retrievingData, storingData } from '../shared/utils/common-function';
import { toast } from 'react-toastify';

export const EmailVerification = (prop) => {
    const { setPageStatus } = prop;
    const navigate = useNavigate()
    const [otpModal, setOtpModal] = useState(false);
    const [btnStatus, setBtnStatus] = useState("invalid");


    const { register, handleSubmit, formState: { isValid, errors }, watch, setValue, reset } = useForm({
        mode: "onChange",
        resolver: yupResolver(emailSchema),
    });
    const emailId = watch("email");

    useEffect(() => {
        let emailData = retrievingData("email");
        reset(emailData)
    }, [])

    useEffect(() => {
        setBtnStatus(isValid ? "valid" : "invalid");
    }, [isValid]);

    const onSubmit = async (formData) => {
        storingData("email", formData)
        setBtnStatus("loading");
        try {
            await handleFormSubmission();
            toast.success("Your OTP is 1234")
            setOtpModal(true)
        } catch (error) {
            
        } finally {
            setBtnStatus(isValid ? "valid" : "invalid");
        }
    };


    const backNavigate = () => {
        setPageStatus(1)
    }

    return (
        <>
            {/* <div><Icon name="back" size={22} color="black" ariaLabel="back icon" onClick={backNavigate} /></div> */}
            <div className='form-container'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <PageHeader title={"Enter your email address"} subtitle={"We will share an OTP on this email for verification"}  backNavigate={backNavigate}/>
                    <CustomInput
                        label={"Enter Email ID"}
                        placeholder={"Eg: name123@gmail.com"}
                        {...register("email")}
                        error={errors["email"]}
                    />
                    <Button status={btnStatus} type="submit" disabled={btnStatus === "loading"}>Proceed</Button>
                </form >
                <Modal isOpen={otpModal} onClose={() => setOtpModal(false)} title={"Enter Otp"} subtitle={<> A one-time password has been sent to your email <br /> {emailId}&nbsp;<button className='text-orange font-medium' onClick={() => setOtpModal(false)}>Change</button>  </>} >
                    <OTPForm targetPage="/digilocker" />
                </Modal>
            </div >
        </>
    )
}
