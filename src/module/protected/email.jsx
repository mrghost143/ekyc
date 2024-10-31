import React, { useState } from 'react'
import { EmailSocial, EmailVerification } from '@form';
import { Progress } from '@features';


export const EmailPage = () => {
    const [pageStatus, setPageStatus] = useState(`1`);


    return (
        <>
            <Progress title="Email Verification" on={1} upto={9} />
            <div className='page-container'>
                {
                    pageStatus == 1 ? <EmailSocial setPageStatus={setPageStatus} /> : <EmailVerification setPageStatus={setPageStatus} />

                }
            </div>
        </>
    )
}
