import { CustomeSelect, Button } from '@shared';
import React, { useEffect, useState } from 'react';
import { bankDetailSelect } from '../input-configuration';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { IfscSchema } from '../validation';
import { storingData } from '../../shared/utils/common-function';
import { handleFormSubmission } from '../form-util';

export const IfscModal = ({ dyanmicIfsc }) => {
    const [btnStatus, setBtnStatus] = useState("invalid");
    const { handleSubmit, formState: { isValid, errors }, setValue, watch } = useForm({
        mode: "onChange",
        resolver: yupResolver(IfscSchema),
    });
    useEffect(() => {
        setBtnStatus(isValid ? "valid" : "invalid");
    }, [isValid]);

    const onSubmit = async (formData) => {

        setBtnStatus("loading");
        storingData("ifsc", formData)
        try {
            await handleFormSubmission();
            dyanmicIfsc("BKID0000189")
        } catch (error) {
        } finally {
            setBtnStatus(isValid ? "valid" : "invalid");
        }
    };
    return (
        <form className='w-full' onSubmit={handleSubmit(onSubmit)}>
            {bankDetailSelect.map(({ label, name, options }, key) =>
                <CustomeSelect options={options} label={label} name={name} error={errors[name]} setValue={setValue} selected={watch(name)} key={key} />
            )}
            <Button status={btnStatus} type="submit" disabled={btnStatus === "loading"}>
                GET IFSC
            </Button>
        </form>
    )
}
