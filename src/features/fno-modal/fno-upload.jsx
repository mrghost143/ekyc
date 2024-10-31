import { SmallCardTwo } from "@features/small-card";
import { Button } from "@shared";
import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { Icon } from "../../shared/icon/container-icon";
import { toast } from "react-toastify";

export const FnoUpload = ({ onSucces }) => {
    const [fileStatus, setFileStatus] = useState("upload");
    const [fileData, setFileData] = useState("");
    const [fileName, setFileName] = useState("");
    const [btnStatus, setBtnStatus] = useState("invalid");
    const fileInputRef = useRef(null);

    useEffect(() => {

        let fnoData = localStorage.getItem("fnoUpload")

        if (fnoData) {
            setFileName(fnoData)
            setFileStatus("show")
            setBtnStatus("valid")
        }

    }, [])

    const onChange = (e) => {
        e.preventDefault();
        let files;
        if (e.dataTransfer) {
            files = e.dataTransfer.files;
        } else if (e.target) {
            files = e.target.files;
        }

        const reader = new FileReader();
        reader.onload = () => {
            setFileData(reader.result);
            setFileStatus("show");
            setBtnStatus("valid");
            setFileName(files[0].name);
            localStorage.setItem("fnoUpload", files[0].name); // Store base64 file data with file name as key
        };
        reader.readAsDataURL(files[0]);
    };
    const handleUploadAgain = () => {
        setFileStatus("upload");
        setBtnStatus("invalid");


        setTimeout(() => {
            fileInputRef.current.value = "";
            fileInputRef.current.click();
        }, 500);


    };


    const onSubmit = () => {
        if (btnStatus === "valid") {
            onSucces()
            toast.success("Document uploaded successfully")
        }
        else{
            toast.error("Please upload document")
        }
    }

    return (
        <>
            {fileStatus === "upload" ? (
                <div className="border border-dashed border-gray-200 w-full relative p-8 rounded-md mb-7">
                    <input
                        type="file"
                        className="absolute z-0 inset-0 opacity-0 cursor-pointer"
                        accept="image/png,image/jpeg,image/jpg,application/pdf"
                        ref={fileInputRef}
                        onChange={onChange}
                    />
                    <div className="flex justify-center items-center- gap-3">
                        <Icon
                            name="upload"
                            size={16}
                            color="#FF6700"
                            ariaLabel="upload icon"
                            className={"upload-icon"}
                        />
                        <div className="text-orange text-base leading-tight font-medium">
                            Upload bank statement
                        </div>
                    </div>
                </div>
            ) : (
                <div className="border border-solid border-gray-200 w-full relative p-8 rounded-md mb-7 flex  justify-between">
                    <div className="file-name flex items-center gap-3 text-green text-base leading-tight font-medium">
                        <Icon
                            name="file"
                            size={16}
                            color="#089e86"
                            ariaLabel="file icon"
                            className={"file-icon"}
                        />
                        {fileName}
                    </div>
                    <Icon
                        name="retry"
                        size={16}
                        color="#FF6700"
                        ariaLabel="retry icon"
                        className={"retry-icon"}
                        onClick={handleUploadAgain}
                    />
                </div>
            )}

            <SmallCardTwo
                className={"w-full"}
                iconName={"info"}
                text={"Ensure your file is not password protected"}
            />
            <Button status={btnStatus} onClick={onSubmit}>
                OKAY
            </Button>
        </>
    );
};
