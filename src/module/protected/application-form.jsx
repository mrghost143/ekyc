import React, { useState } from 'react'
import { Button, Icon, PageHeader } from '@shared';
import applicationForm from "../../assets/images/application-form-1.svg"
import { useNavigate } from 'react-router-dom';
import { handleFormSubmission } from '../../form/form-util';
import { toast } from 'react-toastify';
import { Progress } from '../../features/progress';

export const ApplicationForm = () => {
    const navigate = useNavigate();
    const [btnStatus, setBtnStatus] = useState("valid");

    const backNavigate = () => {
        navigate('/selfie')
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        setBtnStatus("loading");
        try {
            await handleFormSubmission();
            toast.success("Form submmitted successfully")
            navigate('/retail-pack')
        } catch (error) {
        }
        finally {
            setBtnStatus("valid");
        }
    }

    return (
        <>
            <Progress title="Application form" on={9} upto={9} />
            <div className='page-container'>
                {/* <Icon name="back" size={22} color="black" ariaLabel="back icon" onClick={backNavigate} /> */}
                <div className='form-container'>
                    <form onSubmit={onSubmit}>
                        <PageHeader title={"Preview Application Form"} backNavigate={backNavigate} />
                        <div className='mb-7'>
                            <img src={applicationForm} alt="applicationForm" className='w-full' style={{ minHeight: "500px", objectFit: "contain" }} />
                        </div>
                        <Button type='submit' status={btnStatus}>Proceed</Button>
                    </form>
                </div>
            </div>
        </>
    )
}
