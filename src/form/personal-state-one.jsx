import React, { useEffect, useState } from "react";
import {
  Button,
  CustomInput,
  CustomInputRadio,
  retrievingData,
  storingData,
} from "@shared";
import { personalRadioOne } from "./input-configuration";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { personalStageOneSchema } from "./validation";
import { handleFormSubmission } from "./form-util";

export const PersonalFormOne = ({ setPageStage }) => {
  const [btnStatus, setBtnStatus] = useState("invalid");
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
    setValue,
    reset,
    watch,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(personalStageOneSchema),
  });
  useEffect(() => {
    let personalData = retrievingData("personal1");
    reset(personalData);
  }, []);
  useEffect(() => {
    setBtnStatus(isValid ? "valid" : "invalid");
  }, [isValid]);

  const onSubmit = async (formData) => {
    storingData("personal1", formData);
    setBtnStatus("loading");
    try {
      await handleFormSubmission();
      setPageStage(2);
    } catch (error) {
    } finally {
      setBtnStatus(isValid ? "valid" : "invalid");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CustomInput
        label={"Father/Spouse Name"}
        placeholder={"Enter father/spouse name"}
        {...register("fatherName")}
        error={errors["fatherName"]}
      />
      {personalRadioOne.map(({ label, name, valueList }, key) => (
        <CustomInputRadio
          label={label}
          name={name}
          valueList={valueList}
          setValue={setValue}
          error={errors[name]}
          selected={watch(name)}
          key={key}
        />
      ))}
      <Button type="submit" status={btnStatus}>
        Proceed
      </Button>
    </form>
  );
};
