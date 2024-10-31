import { Button, Modal, PageHeader } from "@shared";
import React, { useEffect, useState } from 'react';
import { Icon } from '../shared/icon/container-icon';
import { retrievingData } from "../shared/utils/common-function";
import { SmallCardTwo } from "../features/small-card";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


export const NomineeFetch = ({ setPageStage, setNomineeIndex, setTotalPercent, totalPercent ,backNavigate}) => {
  const navigate = useNavigate();

  const [btnStatus, setBtnStatus] = useState("invalid");

  const [deleteModal, setDeleteModal] = useState({ modal: false, index: 3 });
  const [nomineeData, setNomineeData] = useState([{}]);
  useEffect(() => {
    renderNominee()
  }, []);

  useEffect(() => {
    setBtnStatus(totalPercent === 100 ? "valid" : "invalid");
  }, [totalPercent]);
  const deleteModalOpen = (index) => {
    setDeleteModal({ modal: true, index })
  }

  const addNominee = () => {
    setNomineeIndex(nomineeData.length + 1)
    setPageStage(2)
  }

  const editNominee = (index) => {
    setNomineeIndex(index + 1)
    setPageStage(2)
  }
  const renderNominee = () => {
    const nominees = ['nominee1', 'nominee2', 'nominee3'].map(retrievingData);
    const nomineeArray = nominees.filter(Boolean);

    setNomineeData(nomineeArray);
    setTotalPercent(nomineeArray.reduce((sum, item) => sum + parseInt(item.percentage, 10), 0));

    if (nomineeArray.length === 0) {
      setPageStage(2);
    }
  };





  const deleteNominee = () => {
    const index = deleteModal.index; // Convert to 0-based index
    const nomineeCount = nomineeData.length;
    const keys = ['nominee1', 'nominee2', 'nominee3'];
    localStorage.removeItem(keys[index]);
    for (let i = index; i < nomineeCount - 1; i++) {
      const nextKey = keys[i + 1];
      localStorage.setItem(keys[i], localStorage.getItem(nextKey));
    }
    if (nomineeCount > 1) {
      localStorage.removeItem(keys[nomineeCount - 1]);
    }
    renderNominee();
    setDeleteModal({ modal: false });
  };

  const onSubmit = (e) => {
    e.preventDefault()
    if (btnStatus === "valid") {
      toast.success("Form submitted successfully")
      navigate('/bank-details')
    }
    else{
      toast.error("Total nominee percentage should be 100%")
    }
  }


  const skip =()=>{
    navigate('/bank-details')
}



  return (
    <div className='form-container'>
      <PageHeader title={"Add Nominee(s)"} subtitle={"Review your nominee details"} backNavigate={backNavigate} />

      <form onSubmit={onSubmit}>
        {nomineeData.map((nominee, index) => {
          const { nomineeName, nomineeRelation, percentage } = nominee;

          return <div key={index} className='review-nominee-container'>
            <div className='review-nominee-wrapper'>
              <div>
                <p className='review-nominee-label'>Nominee {index + 1}</p>
                <p className='review-nominee-value'>{nomineeName}</p>
              </div>
              <div className='flex gap-5'>
                <Icon name="edit" size={20} ariaLabel="edit icon" onClick={() => editNominee(index)} />
                <Icon name="delete" size={20} ariaLabel="delete icon" onClick={() => deleteModalOpen(index)} />
              </div>
            </div>
            <div className='review-nominee-wrapper'>
              <div>
                <p className='review-nominee-label'>Relation</p>
                <p className='review-nominee-value'>{nomineeRelation}</p>
              </div>
              <div className='text-end'>
                <p className='review-nominee-label'>Percentage</p>
                <p className='review-nominee-value'>{percentage}</p>
              </div>
            </div>
          </div>

        }
        )}

        {/* <div className='review-nominee-info-box'> */}

        <SmallCardTwo iconName={"info"} text={"The total 'Percentage' of all nominees should be equal to 100%"} />
        {/* </div> */}

        {nomineeData.length < 3 && totalPercent < 100 && <button className='review-nominee-add-btn' type="button" onClick={addNominee}><Icon name="plus" size={10} ariaLabel="plus icon" /> ADD ANOTHER NOMINEE</button>}


        <div className="grid  lg:grid-cols-2  grid-cols-1 gap-4">
          <Button type="button" status={"valid"} mode={"secondary"}  onClick={skip}>
            SKIP FOR NOW
          </Button>

          <Button type="submit" status={btnStatus} >
            Proceed
          </Button>
        </div>
      </form>
      <Modal isOpen={deleteModal.modal} onClose={() => setDeleteModal({ modal: false, index: 3 })} title={"Are you sure you want to delete this nominee?"}
        subtitle={"Please ensure the total allocation across entered nominees is 100%."}
        style={{ minHeight: "unset" }}
      >
        <div className="w-full  mt-10 grid  lg:grid-cols-2  grid-cols-1 gap-4">
          <Button type="button" status={"valid"} mode={"secondary"} onClick={() => setDeleteModal({ modal: false, index: 3 })}  >
            CANCEL
          </Button>
          <Button type="button" status={"valid"} onClick={deleteNominee} >
            CONFIRM
          </Button>
        </div>

      </Modal>
    </div>
  )
}
