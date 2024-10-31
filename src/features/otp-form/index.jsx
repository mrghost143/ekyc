import React, { useEffect, useState } from "react";
import secureLock from "@assets/images/secure-lock.svg";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "./otp-form.scss";
import { Button, NumberInput } from "@shared";
import { OTPSchema } from "@form/validation";
import { handleFormSubmission } from "../../form/form-util";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export const OTPForm = (props) => {
  const navigate = useNavigate();
  const { targetPage } = props;
  const [btnStatus, setBtnStatus] = useState("invalid");
  const [progress, setProgress] = useState(30);
  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid },
    setFocus,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(OTPSchema),
  });
  useEffect(() => {
    setBtnStatus(isValid ? "valid" : "invalid");
  }, [isValid]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (progress > 0) {
        setProgress(progress - 1);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [progress]);
  const handleInput = (e, index) => {
    NumberInput(e);
    const value = e.target.value;
    if (value && index !== 4) {
      setFocus(`otp${index + 1}`);
    }
  };

  const handleKeyDown = (e, index) => {
    const value = e.target.value;
    if (e.key === "Backspace" && !value && index !== 1) {
      setFocus(`otp${index - 1}`);
    }
  };

  const onResend = () => {
    setProgress(30);
  };
  const formatProgress = (progress) =>
    `00:${progress < 10 ? `0${progress}` : progress} secs`;

  const onSubmit = async ({ otp1, otp2, otp3, otp4 }) => {
    let otp = `${otp1}${otp2}${otp3}${otp4}`;
    setBtnStatus("loading"); // Set the button status to loading
    try {
      await handleFormSubmission(otp == "1234");
      toast.success("OTP validate successfully");
      navigate(targetPage);
    } catch (error) {
      toast.error("Incorrect OTP");
      setFocus("otp1");
      reset({
        otp1: "",
        otp2: "",
        otp3: "",
        otp4: "",
      });
    } finally {
      setBtnStatus(isValid ? "valid" : "invalid"); // Reset the button status
    }
  };
  return (
    <>
      <img src={secureLock} alt="secureLock" className="my-5" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="otp-form">
          {[...Array(4)].map((_, index) => (
            <div className="input-field-wrapper" key={index}>
              <input
                type="text"
                className="input-field"
                pattern="[0-9]*"
                inputMode="numeric"
                maxLength={1}
                onInput={(e) => handleInput(e, index + 1)}
                onKeyDown={(e) => handleKeyDown(e, index + 1)}
                placeholder=""
                {...register(`otp${index + 1}`)}
                autoFocus={index === 0}
              />
            </div>
          ))}
        </div>
        <div className="flex items-end flex-col mb-5 gap-2 text-gray">
          <button
            className={`${
              progress == 0 ? "text-orange" : ""
            } text-base font-medium`}
            disabled={progress !== 0}
            type="button"
            onClick={onResend}
          >
            Resend OTP{" "}
          </button>
          <p className="text-sm">{formatProgress(progress)}</p>
        </div>
        <Button
          status={btnStatus}
          type="submit"
          disabled={btnStatus === "loading"}
        >
          Proceed
        </Button>
      </form>
    </>
  );
};
