import { Progress } from '@features';
import { Button, Icon, PageHeader, CheckPermission } from '@shared';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import digilocker from "@assets/images/digilocker.svg"
import { useEffect } from 'react';
import { handleFormSubmission } from '../../form/form-util';
import { toast } from 'react-toastify';


export const Digilocker = () => {
    const navigate = useNavigate();
    const [btnStatus, setBtnStatus] = useState("disable");
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {

        if (isChecked) {
            setBtnStatus("valid")
        } else {
            setBtnStatus("disable")
        }
    }, [isChecked])


    const onSubmit = async () => {
        setBtnStatus("loading");
        try {
            await handleFormSubmission();
            toast.success("Form submitted successFully")
            navigate("/personal");
        } catch (error) {
        } finally {
            setBtnStatus(isChecked ? "valid" : "disable");
        }
    }

    const backNavigate = () => {
        navigate('/email')
    }

    return (
        < >
            <Progress title="Document Verification" on={2} upto={9} />
            <div className='page-container'>

                {/* <Icon name="back" size={22} color="black" ariaLabel="back icon" onClick={backNavigate} /> */}
                <div className='form-container'>
                    <form>
                        <PageHeader title={"Verify your documents securely with DigiLocker"} subtitle={"You're just a few steps away, Avinash"} backNavigate={backNavigate} />
                        <img src={digilocker} alt="digilocker" className='mx-auto mt-3 mb-16 object-contain	' height={40} />
                        <CheckPermission setIsChecked={setIsChecked} isChecked={isChecked} label={<>I confirm that I am an Indian Citizen and my sole country of tax residency is India. Further, I have understood the information and requirement of this <a href="#" className='text-orange'>form</a>.</>} />
                        <Button type='button' status={btnStatus} onClick={onSubmit}>Proceed</Button>
                    </form>
                </div>
            </div>
        </ >
    )
}
