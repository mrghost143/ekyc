import React, { useEffect, useState } from "react";
import {
    Button,
    CustomInput,
    CustomInputRadio,
    retrievingData,
    storingData,
    CustomeSelect,
    CustomDateWrapper,
    PageHeader,
} from "@shared";
import {
    guardianProofTypeOption,
    guardianRelationRadio,
    nomineeProofTypeGet,
    nomineeRelationRadio,
} from "./input-configuration";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { handleFormSubmission } from "./form-util";
import { nomineeSchema } from "./validation";
import {
    AadharCheck,
    IDInput,
    NameInput,
    NumberInput,
    panInputResist,
} from "../shared/utils/input-function";
import { getAge } from "../shared/utils/common-function";
import { useNavigate } from "react-router-dom";

export const NomineeAdd = ({ setPageStage, nomineeIndex, backNavigate }) => {
    const navigate = useNavigate();
    const [btnStatus, setBtnStatus] = useState("invalid");
    const {
        setFocus,
        register,
        handleSubmit,
        formState: { isValid, errors },
        setValue,
        reset,
        watch,
        trigger,
        getValues,
    } = useForm({
        mode: "onChange",
        resolver: yupResolver(nomineeSchema),
    });

    const nomineeDob = watch("nomineeDob");
    const guardianDob = watch("guardianDob");

    const nomineeProofTypeOption = nomineeProofTypeGet(
        nomineeDob?.length === 8 && getAge(nomineeDob) < 18
    );

    const nomineeIdentityType = watch(nomineeProofTypeOption?.name);

    const guardianIdentityType = watch(guardianProofTypeOption?.name);

    useEffect(() => {
        let nomineeData = retrievingData(`nominee${nomineeIndex}`);
        reset(nomineeData);
    }, []);
    useEffect(() => {
        setBtnStatus(isValid ? "valid" : "invalid");
    }, [isValid]);
    const onSubmit = async (formData) => {
        storingData(`nominee${nomineeIndex}`, formData);
        setBtnStatus("loading");
        try {
            await handleFormSubmission();
            setPageStage(1);
        } catch (error) {
        } finally {
            setBtnStatus(isValid ? "valid" : "invalid");
        }
    };
    const checkType = (identifier) => {
        if (identifier.includes("nominee")) {
            return "nominee";
        } else if (identifier.includes("guardian")) {
            return "guardian";
        }
        return null;
    };
    const reValidate = (e, toTriger) => {
        const type = checkType(e.target.name);
        const proofType = getValues(`${type}IndentityProof`);
        if (proofType === "pan") {
            panInputResist(e);
        } else if (proofType === "aadhaar") {
            AadharCheck(e);
        } else {
            IDInput(e);
        }

        setTimeout(() => {
            trigger(toTriger);
        }, 500);
    };

    const onNomineeProofTypeSelect = (value) => {
        if (value === "aadhaar") {
            setValue("nomineeIdNumber", "********", { shouldValidate: false });
        } else {
            setValue("nomineeIdNumber", "", { shouldValidate: false });
        }
        setFocus("nomineeIdNumber");
    };
    const onGuardianProofTypeSelect = (value) => {
        if (value === "aadhaar") {
            setValue("guardianIdNumber", "********", { shouldValidate: false });
        } else {
            setValue("guardianIdNumber", "", { shouldValidate: false });
        }
        setFocus("guardianIdNumber");
    };

    const skip = () => {
        navigate('/bank-details')
    }

    return (
        <div className="form-container">
            <PageHeader
                title={"Add Nominee(s)"}
                subtitle={
                    "Protect your investments by adding a nominee. You may do this step later as well."
                }
                backNavigate={backNavigate}
            />

            <form onSubmit={handleSubmit(onSubmit)}>
                <CustomInput
                    label={"Nominee Name"}
                    placeholder={"Enter nominee name"}
                    {...register("nomineeName")}
                    error={errors["nomineeName"]}
                    onInput={NameInput}
                />
                <CustomeSelect
                    options={nomineeProofTypeOption?.options}
                    label={nomineeProofTypeOption?.label}
                    name={nomineeProofTypeOption?.name}
                    error={errors[nomineeProofTypeOption?.name]}
                    setValue={setValue}
                    selected={nomineeIdentityType}
                    onSelect={onNomineeProofTypeSelect}
                />
                {nomineeIdentityType && (
                    <CustomInput
                        label={"Nominee ID Number"}
                        placeholder={"Enter Nominee ID Number"}
                        {...register("nomineeIdNumber")}
                        error={errors["nomineeIdNumber"]}
                        onInput={(e) => reValidate(e, "guardianIdNumber")}
                    />
                )}
                <CustomDateWrapper
                    label={"Nominee Date of Birth"}
                    name={"nomineeDob"}
                    setValue={setValue}
                    date={nomineeDob}
                    error={errors["nomineeDob"]}
                />
                <CustomInput
                    label={"Percentage"}
                    placeholder={"Enter percentage"}
                    {...register("percentage")}
                    error={errors["percentage"]}
                    maxLength={3}
                    onInput={NumberInput}
                />
                <CustomInputRadio
                    label={nomineeRelationRadio?.label}
                    name={nomineeRelationRadio?.name}
                    valueList={nomineeRelationRadio?.valueList}
                    setValue={setValue}
                    error={errors[nomineeRelationRadio?.name]}
                    selected={watch(nomineeRelationRadio?.name)}
                />

                {nomineeDob?.length === 8 && getAge(nomineeDob) < 18 && (
                    <>
                        <PageHeader
                            title={"Guardian Details"}
                            subtitle={
                                "Since the nominee is below 18 years, you will need to add guardian details"
                            }
                        />
                        <CustomInput
                            label={"Guardian Name"}
                            placeholder={"Enter guardian name"}
                            {...register("guardianName")}
                            error={errors["guardianName"]}
                        />
                        <CustomeSelect
                            options={guardianProofTypeOption?.options}
                            label={guardianProofTypeOption?.label}
                            name={guardianProofTypeOption?.name}
                            error={errors[guardianProofTypeOption?.name]}
                            setValue={setValue}
                            selected={guardianIdentityType}
                            onSelect={onGuardianProofTypeSelect}
                        />
                        {guardianIdentityType && (
                            <CustomInput
                                label={"Guardian ID Number"}
                                placeholder={"Enter Guardian ID Number"}
                                {...register("guardianIdNumber")}
                                error={errors["guardianIdNumber"]}
                                onInput={(e) => reValidate(e, "nomineeIdNumber")}
                            />
                        )}

                        <CustomDateWrapper
                            label={"Guardian Date of Birth"}
                            name={"guardianDob"}
                            setValue={setValue}
                            date={guardianDob}
                            error={errors["guardianDob"]}
                        />

                        <CustomInputRadio
                            label={guardianRelationRadio?.label}
                            name={guardianRelationRadio?.name}
                            valueList={guardianRelationRadio?.valueList}
                            setValue={setValue}
                            error={errors[guardianRelationRadio?.name]}
                            selected={watch(guardianRelationRadio?.name)}
                        />
                    </>
                )}
                <div className="grid  lg:grid-cols-2  grid-cols-1 gap-4">
                    <Button type="button" status={"valid"} mode={"secondary"} onClick={skip}>
                        SKIP FOR NOW
                    </Button>
                    <Button type="submit" status={btnStatus}>
                        PROCEED
                    </Button>
                </div>
            </form>
        </div>
    );
};
