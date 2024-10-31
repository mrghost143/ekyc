import React, { useRef } from 'react'
import SignatureCanvas from "react-signature-canvas";

export const SignDraw = ({ setBtnStatus, btnStatus,signCanvas }) => {

    const SignAgain = () => {
        signCanvas.current?.clear();
        setBtnStatus("invalid")
    }

    // const image = signCanvas.current.toDataURL("image/png");


    return (

        <div className='sign-wrapper'>
            <div className="file sign">
                <div className="sign-canvas">
                    <SignatureCanvas
                        ref={signCanvas}
                        penColor="#002356"
                        clearOnResize={false}
                        onBegin={() => {
                            setBtnStatus("valid");
                        }}
                    />
                </div>

            </div>
            {btnStatus == "valid" ? <span className="sign-again" onClick={SignAgain}>Try again</span> : <span className="sign-placeholder">SIGN HERE</span>
            }
        </div>
    )
}
