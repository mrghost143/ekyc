import React, { useEffect, useState } from 'react';
import { Button, CustomeSelect, CustomInputRadio, retrievingData, storingData } from '@shared';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { personalStageTwoSchema } from './validation';
import { personalRadioTwo, personalSelectTwo } from './input-configuration';
import { handleFormSubmission } from './form-util';
import { toast } from 'react-toastify';


export const PersonalFormTwo = () => {
    const navigate = useNavigate()

    const [btnStatus, setBtnStatus] = useState("invalid");
    const { handleSubmit, formState: { isValid, errors }, setValue, reset, watch } = useForm({
        mode: "onChange",
        resolver: yupResolver(personalStageTwoSchema),
    });
    useEffect(() => {
        let personalData = retrievingData("personal2");
        reset(personalData)
    }, [])
    useEffect(() => {
        setBtnStatus(isValid ? "valid" : "invalid");
    }, [isValid]);

    const onSubmit = async (formData) => {
        storingData("personal2", formData)
        setBtnStatus("loading");
        try {
            await handleFormSubmission();
            toast.success("Form submitted successFully")
            const { isNominee } = formData;
            if (isNominee == "now") {
                navigate("/nominee")
            } else {
                navigate("/bank-details")
            }
        } catch (error) {
        } finally {
            setBtnStatus(isValid ? "valid" : "invalid");
        }
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>

            {personalSelectTwo.map(({ label, name, options }) => <CustomeSelect options={options} label={label} name={name} error={errors[name]} setValue={setValue} selected={watch(name)} />
            )}

            {personalRadioTwo.map(({ label, name, valueList }) => (
                <CustomInputRadio label={label} name={name} valueList={valueList} setValue={setValue} error={errors[name]} selected={watch(name)}
                />
            ))}
            <Button type='submit' status={btnStatus} >Proceed</Button>
        </form>
    )
}
