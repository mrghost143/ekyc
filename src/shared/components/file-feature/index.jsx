import React, { useState, useRef } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import "./file.scss";
import { Icon } from "../../icon/container-icon";
import { useEffect } from "react";

export const FileUI = ({ setBtnStatus, name, showImage = "" }) => {
  const cropperRef = useRef(null);
  const fileInputRef = useRef(null);
  const [image, setImage] = useState("");
  const [fileStatus, setFileStatus] = useState("upload");
  useEffect(() => {
    if (showImage !== "") {
      setImage(showImage);
      setFileStatus("show");
    }
  }, [showImage]);
  useEffect(() => {
    if (image) {
      localStorage.setItem(name, image);
    }
  }, [image]);

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
      setImage(reader.result);
      setFileStatus("show");
      setBtnStatus("valid");
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

  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      setImage(cropperRef.current.cropper.getCroppedCanvas().toDataURL());
      setFileStatus("show");
      setBtnStatus("valid");
    }
  };

  const rotateImage = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      cropperRef.current.cropper.rotate(90); // Rotate 90 degrees clockwise
    }
  };
  return (
    <>
      <div className="file">
        {fileStatus === "upload" && (
          <div className="upload">
            <input
              type="file"
              name="upload-file"
              className="upload-input"
              onChange={onChange}
              accept="image/png,image/jpeg,image/jpg"
              ref={fileInputRef} // Attach ref here
            />
            <Icon
              name="file"
              size={50}
              color="#002953"
              ariaLabel="google icon"
              className={"upload-icon"}
            />
            <div className="upload-info">
              <div className="upload-title">Upload {name}</div>
              <div className="file-subtitle">
                Use .jpeg, jpg, or .png files only (up to 10 mb)
              </div>
            </div>
          </div>
        )}
        {fileStatus === "edit" && (
          <Cropper
            // style={{ maxHeight:"150px", width: "100%" }}
            initialAspectRatio={1}
            className="img"
            preview=".img-preview"
            src={image}
            ref={cropperRef}
            viewMode={0}
            guides={true}
            minCropBoxHeight={10}
            minCropBoxWidth={10}
            background={false}
            responsive={true}
            checkOrientation={false}
          />
        )}
        {fileStatus === "show" && (
          <div className="show">
            <div className="img-wrapper">
              <img src={image} className="img" />
            </div>
            <div className="file-subtitle">{name} preview</div>
          </div>
        )}
      </div>
      {fileStatus === "show" && (
        <div className="img-option">
          <button
            className="text-orange"
            type="button"
            onClick={handleUploadAgain}
          >
            Upload again
            <Icon
              name="upload"
              size={13}
              color="#FF6700"
              ariaLabel="upload icon"
            />
          </button>
          <button
            className="text-black-500"
            type="button"
            onClick={() => {
              setFileStatus("edit");
              setBtnStatus("invalid");
            }}
          >
            Edit
            <Icon name="crop" size={13} color="#1A1A1A" ariaLabel="edit icon" />
          </button>
        </div>
      )}
      {fileStatus === "edit" && (
        <div className="img-option">
          <button className="text-orange" type="button" onClick={getCropData}>
            Done
            <Icon
              name="complete"
              size={15}
              color="#FF6700"
              ariaLabel="upload icon"
            />
          </button>
          <button
            className="text-black-500"
            type="button"
            onClick={rotateImage}
          >
            Rotate
            <Icon
              name="rotate"
              size={15}
              color="#1A1A1A"
              ariaLabel="edit icon"
            />
          </button>
        </div>
      )}
    </>
  );
};
