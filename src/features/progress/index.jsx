import React from 'react'
import "./progress.scss"
import { useNavigate } from 'react-router-dom';
export const Progress = ({ title = "Email Verification", on = 3, upto = 10 }) => {
    const TotalStep = Array.from({ length: upto }, (_, index) => index + 1);
    const navigate = useNavigate()
    const indexNavigate = {
        1: "email",
        2:"digilocker",
        3:"personal",
        4:"nominee",
        5:"bank-details",
        6:"signature",
        7:"fno",
        8:"selfie",
        9:"application-form"
    }

    const progressNavigate = (index) => {
    navigate(`/${indexNavigate[index+1]}`)

}
return (
    <div className='progress-container'>
        <div className='progress-header'><h4> {title} </h4> <span>Step {on}/{upto}</span></div>
        <ul className='progress-bar'>
            {TotalStep.map((item, index) => <li key={index} className={`${item == on ? "in-progress" : ""}  ${item < on ? "completed" : ""} progress-item cursor-pointer`} onClick={() => progressNavigate(index)}></li>)}
        </ul>
    </div >
)
}
