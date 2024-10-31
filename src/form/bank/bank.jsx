import { yupResolver } from "@hookform/resolvers/yup";
import { Button, CustomInput, Modal } from '@shared';
import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { SmallCardOne, SmallCardTwo } from '@features/small-card';
import { CharInput, NumberInput } from "@shared/utils/input-function";
import { useNavigate } from "react-router-dom";
import { retrievingData, storingData } from "@shared/utils/common-function";
import { BankFormSchema } from "../validation";
import { handleFormSubmission } from "../form-util";
import { BankDetailsInput } from "../input-configuration";
import { IfscModal } from "./ifsc-modal";
import { toast } from "react-toastify";


export const Bank = () => {
    const navigate = useNavigate();
    const [ifscModal, setIfscModal] = useState(false);
    const [btnStatus, setBtnStatus] = useState("invalid");

    const { register,handleSubmit, formState: { isValid, errors }, reset, setValue } = useForm({
        mode: "onChange",
        resolver: yupResolver(BankFormSchema),
    });

    useEffect(() => {
        setBtnStatus(isValid ? "valid" : "invalid");
    }, [isValid]);

    useEffect(() => {
        let bankData = retrievingData("bank");
        reset(bankData)

    }, [])


    const onSubmit = async (formData) => {
        setBtnStatus("loading");
        storingData("bank", formData)

        try {
            await handleFormSubmission();
            toast.success("Form submitted successfully")
            navigate("/bank-upload")
        } catch (error) {
        } finally {
            setBtnStatus(isValid ? "valid" : "invalid");
        }
    };


    const dyanmicIfsc = (ifscCode) => {
        setValue("ifscCode", ifscCode, { shouldValidate: true })
        setIfscModal(false)
        toast.success("IFSC fetched successfully")
    }
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                {
                    BankDetailsInput.map(({ label, placeholder, name, maxLength }, index) => (
                        <CustomInput
                            key={index}
                            label={label}
                            placeholder={placeholder}
                            {...register(name)}
                            error={errors[name]}
                            maxLength={maxLength}
                            onInput={name == "bankNumber" ? NumberInput : CharInput}
                        />
                    ))}
                <SmallCardOne className="mb-5" iconName={"idea"} text={<> Don’t know your IFSC? <button type='button' className='text-orange font-medium' onClick={() => setIfscModal(true)}>Click here</button></>} />
                <SmallCardTwo iconName={"info"} text={<>We will credit <span className='font-medium'>₹1</span> to your bank account for verification</>} />
                <Button type='submit' status={btnStatus}>Proceed</Button>

            </form>
            <Modal isOpen={ifscModal} onClose={() => setIfscModal(false)}
                title={"IFSC Finder"} subtitle={<>Enter your bank name and branch location to find your IFSC code.</>}>
                <IfscModal dyanmicIfsc={dyanmicIfsc} />
            </Modal>
        </>
    )
}
