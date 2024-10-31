import { Button, Icon, PageHeader } from "@shared";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleFormSubmission } from "../../form/form-util";
import { PackCard } from "../../shared/components";
import { retrievingData, storingData } from "../../shared/utils/common-function";
import { PackInfoList } from "../../shared/utils";
import { toast } from "react-toastify";

export const RetailPack = () => {

    const [selectedPackIndex, setSelectedPackIndex] = useState(false);
    const [btnStatus, setBtnStatus] = useState("invalid");
    const navigate = useNavigate();

    useEffect(() => {
        setBtnStatus(selectedPackIndex !== false ? "valid" : "invalid");
    }, [selectedPackIndex]);


    useEffect(() => {
        let PackIndex = retrievingData("pack");
        setSelectedPackIndex(PackIndex)
    }, [])


    const onSubmit = async (e) => {
        e.preventDefault();
        if (btnStatus === "valid") {
            setBtnStatus("loading");
            storingData("pack", selectedPackIndex)

            try {
                await handleFormSubmission();
                toast.success("Pack selected successfully")
                navigate("/congratulation")
            } catch (error) {
            } finally {
                setBtnStatus(selectedPackIndex !== false ? "valid" : "invalid");
            }
        }
        else {
            toast.error("Please select pack")
        }
    }

    const backNavigate = () => {
        navigate('/application-form')
    }

    const skip = () => {
        navigate("/congratulation")

    }

    return (
        <>
            <div className="page-container">
                {/* <Icon name="back" size={22} color="black" ariaLabel="back icon" onClick={backNavigate} /> */}
                <div className="form-container">
                    <form onSubmit={onSubmit}>
                        <PageHeader
                            title={"Upgrade your plan"}
                            subtitle={
                                "Save big on brokerage by upgrading your subscription plan"
                            }
                            backNavigate={backNavigate}
                        />
                        <div className="grid  lg:grid-cols-2  grid-cols-1 gap-2 mb-7">
                            {PackInfoList.map((item, key) =>
                            (<div className="px-2 flex flex-col" key={key}>
                                <PackCard data={item} setSelectedPackIndex={setSelectedPackIndex} selectedPackIndex={selectedPackIndex} index={key} />
                            </div>)

                            )}
                        </div>
                        <div className="grid  lg:grid-cols-2  grid-cols-1 gap-4">
                            <Button status={"valid"} mode={"secondary"} onClick={skip}>
                                SKIP FOR NOW
                            </Button>
                            <Button type="submit" status={btnStatus}>
                                UPGRADE NOW
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};
