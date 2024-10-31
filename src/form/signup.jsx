import { OTPForm } from '@features';
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, CustomInput, Modal } from '@shared';
import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { CharInput, PhoneNumberInput } from '@shared';
import { toast } from 'react-toastify';
import { encodeMobile } from '../shared/utils/common-function';
import { handleFormSubmission } from './form-util';
import { SignUpInput } from './input-configuration';
import { LoginFormSchema } from './validation';

export const SignUpForm = () => {
    const [otpModal, setOtpModal] = useState(false);
    const [btnStatus, setBtnStatus] = useState("invalid");

    const { register, handleSubmit, formState: { isValid, errors }, setValue, watch } = useForm({
        mode: "onChange",
        resolver: yupResolver(LoginFormSchema),
    });

    const phoneNumber = watch("phoneNo");

    useEffect(() => {
        setBtnStatus(isValid ? "valid" : "invalid");
    }, [isValid]);

    const onSubmit = async () => {
        setBtnStatus("loading");
        try {
            await handleFormSubmission();
            toast.success("Your OTP is 1234")
            setOtpModal(true);
        } catch (error) {

        } finally {
            setBtnStatus(isValid ? "valid" : "invalid");
        }
    };


    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                {SignUpInput.map(({ label, placeholder, required, name, maxLength }, index) => (
                    <CustomInput
                        key={index}
                        label={label}
                        onInput={name == "phoneNo" ? PhoneNumberInput : CharInput}
                        placeholder={placeholder}
                        isRequired={required}
                        {...register(name)}
                        error={errors[name]}
                        maxLength={maxLength}
                    />
                ))}
                <p className="text-gray mb-5 text-base text-center">
                    By entering the OTP you agree to our <span className="text-orange">Terms & Conditions</span>
                </p>
                <Button status={btnStatus} type="submit" disabled={btnStatus === "loading"}>
                    {"SIGN UP"}
                </Button>
            </form>
            <Modal isOpen={otpModal} onClose={() => setOtpModal(false)} title={"Enter Otp"} subtitle={<>A one-time password has been sent to your mobile number <br /> {encodeMobile(phoneNumber)}&nbsp;<button className='text-orange font-medium' onClick={() => setOtpModal(false)}>Change</button></>}>
                <OTPForm targetPage="/email" />
            </Modal>
        </>
    );
};
