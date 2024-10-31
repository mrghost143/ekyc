import React, { useState } from "react";
import { Progress } from "@features";
import { Button, Icon, PageHeader } from "@shared";
import { useNavigate } from "react-router-dom";
import { PersonalFormTwo, PersonalFormOne } from "@form";

export const PersonalDetails = () => {
  const navigate = useNavigate();
  const [pageStage, setPageStage] = useState(1);

  const backNavigate = () => {
    if (pageStage == 1) {
      navigate("/digilocker");
    } else {
      setPageStage(1);
    }
  };
  return (
    <>
      <Progress title="Personal Details" on={3} upto={9} />
      <div className="page-container">
        {/* <Icon
          name="back"
          size={22}
          color="black"
          ariaLabel="back icon"
          onClick={backNavigate}
        /> */}
        <div className="form-container">
          <PageHeader
            title={"Help us know you better"}
            subtitle={
              "We need a few mandatory details to complete your profile"
            }
            backNavigate={backNavigate}
          />
          {pageStage === 1 ? (
            <PersonalFormOne setPageStage={setPageStage} />
          ) : (
            <PersonalFormTwo />
          )}
        </div>
      </div>
    </>
  );
};
