import React, { useEffect, useState } from "react";
import { Progress } from "@features";
import { Button, PageHeader, Icon } from "@shared";
import { FileUI } from "../../shared/components/file-feature";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const BankUpload = () => {
    const navigate = useNavigate();
    const [showImage, setShowImage] = useState("");

    const [btnStatus, setBtnStatus] = useState("invalid");

    useEffect(() => {
        let uploadedImage = localStorage.getItem("Cancelled cheque");
        if (uploadedImage) {
            setShowImage(uploadedImage);
            setBtnStatus("valid")
        }
    }, []);
    const onSubmit = (e) => {
        e.preventDefault();

        if (btnStatus == "valid") {
            toast.success("Document uploaded successfully")
            navigate("/signature");
        } else {
            toast.error("Please upload document")
        }
    };

    const backNavigate = () => {
        navigate('/bank-details')
    }

    return (
        <>
            <Progress title="Bank Details" on={5} upto={9} />
            <div className="page-container">
                {/* <Icon name="back" size={22} color="black" ariaLabel="back icon" onClick={backNavigate} /> */}
                <div className="form-container">
                    <form onSubmit={onSubmit}>
                        <PageHeader
                            title={"Verify bank account manually"}
                            subtitle={"Upload cancelled cheque to verify your bank details"}

                            backNavigate={backNavigate}
                        />
                        <FileUI
                            setBtnStatus={setBtnStatus}
                            name={"Cancelled cheque"}
                            showImage={showImage}
                        />
                        <Button type="submit" status={btnStatus}>
                            Proceed
                        </Button>
                    </form>
                </div>
            </div>
        </>
    );
};
