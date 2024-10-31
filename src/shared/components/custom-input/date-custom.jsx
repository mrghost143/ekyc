import { useEffect } from 'react';
import "./date.scss"
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { stringToDOB } from '../../utils/common-function';

export const CustomDate = (prop) => {
    const { date="", seperator = "-", onSubmit, minYear = 90, maxYear = 0 ,error,index=""} = prop;
    const onlyNumber = (e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, "");
    };
    const schema = Yup.object().shape({
        day: Yup.string().required().min("2", "Please Enter Valid Date").matches(/^[0-3]{1}[0-9]{1}$/),
        month: Yup.string().required().matches(/^[0-1]{1}[0-9]{1}$/),
        year: Yup.string().required().matches(/^[1-2]{1}[0-9]{3}$/),
        dob: Yup.string().required("DOB is Required Feild")
    });
    const {
        register,
        setValue,
        setFocus,
        getValues,
        watch,
    } = useForm({
        resolver: yupResolver(schema),
        mode: "all",
    });
    const dob = watch("dob")
    useEffect(() => {
        if (date === undefined || date === null || date === "") {
            setValue("dob", "")
        } else if (date && date.length === 8 && new Date(stringToDOB(date)).isValidDate()) {
                const { day, month, year } = new Date(stringToDOB(date)).dateFormat();
                setValue("dob", `${year}-${month}-${day}`)
            } 
    }, [date]);

    useEffect(() => {
        if (dob) {
            const [year = "", month = "", day = ""] = dob.split("-");
            setValue("day", day)
            setValue("month", month)
            setValue("year", year);
            onSubmit(`${day}${month}${year}`,index)
        }
    }, [dob])
    const dayInput = (e) => {
        onlyNumber(e);
        const { value } = e.target
        const { length } = value;
        if (value > 31) {
            setValue("day", `31`)
            setFocus("month")
        }
        if (value > 3 && length === 1) {
            setValue("day", `0${value}`)
            setFocus("month")
        }
        if (length === 2) {
            if (Number(value) === 0) {
                setValue("day", "01")
            }
            setFocus("month")
        }
    }
    const monthInput = (e) => {
        onlyNumber(e)
        const { value } = e.target
        const { length } = value;
        if (value > 12) {
            setValue("month", `12`)
            setFocus("year")
        }
        if (value > 1 && length === 1) {
            setValue("month", `0${value}`)
            setFocus("year")
        }
        if (length === 2) {
            if (Number(value) === 0) {
                setValue("month", "01")
            }
            setFocus("year")
        }
    }
    const yearInput = (e) => {
        onlyNumber(e);
        const { value } = e.target;
        const length = value.length;

        if (length === 1) {
            const firstLetter = parseInt(value.substring(0, 1));
            if (![1, 2].includes(firstLetter)) {
                e.target.value = "";
            }
        }

        if (length === 2) {
            const firstLetter = parseInt(value.substring(0, 1));
            const secondLetter = parseInt(value.substring(1, 2));
            if (![1, 2].includes(firstLetter)) {
                e.target.value = "";
            }
            if (firstLetter === 1 && secondLetter !== 9) {
                e.target.value = firstLetter;
            }
            if (firstLetter === 2 && secondLetter !== 0) {
                e.target.value = firstLetter;
            }
        }

        if (length === 4) {
            const yearEntered = parseInt(value);
            const currentYear = new Date().getFullYear();
            const maxYearReq = currentYear - Number(maxYear);
            const minYearReq = currentYear - Number(minYear);
            if (yearEntered > maxYearReq) {
                e.target.value = `${maxYearReq}`;
            }
            if (yearEntered < minYearReq) {
                e.target.value = `${minYearReq}`;
            }
        }
    }

    const dayBlur = (e) => {
        const { value } = e.target
        const { length } = value;
        if (length === 1 && value < 10) {
            setValue("day", `0${value}`)
            setFocus("month")
        }
        if (length === 2) {
            setFocus("month")
        }
        if(value !==""){
            e.target.nextSibling.classList.add("active");
            e.target.nextSibling.classList.remove("inactive");
        }else{
            e.target.nextSibling.classList.add("inactive");
            e.target.nextSibling.classList.remove("active");
        }
    }
    const monthBlur = (e) => {
        const { value } = e.target
        const { length } = value;
        if (length === 1 && value < 10) {
            setValue("month", `0${value}`)
            setFocus("year")
        }
        if (length === 2) {
            setFocus("year")
        }
        if(value !==""){
            e.target.nextSibling.classList.add("active");
            e.target.nextSibling.classList.remove("inactive");
        }else{
            e.target.nextSibling.classList.add("inactive");
            e.target.nextSibling.classList.remove("active");
        }
    }
    const checkValidDate = () => {
        const { day = "", month = "", year = "" } = getValues();
        if (year === "" && month === "" && day === "") {
            setValue("dob", "");
            onSubmit("",index)

        } else {
            setValue("dob", `${year}-${month}-${day}`);
            onSubmit(`${day}${month}${year}`,index)
        }
    }
 
    return (
        <div className={`dateCustom dateForm ${error ? "error" : ""}`} >
            <div className="custom-field-container d-none">
                <input type="text" maxLength={10}
                    placeholder="empty"  {...register("dob")}  readOnly/>
            </div>

            <input
                type="text"
                placeholder='DD'
                className={`dateCustom-day custom-field`}
                {...register("day")}
                maxLength={2}
                pattern="[0-9]*"
                inputMode="numeric"
                onInput={dayInput}
                onBlur={dayBlur}
                onKeyUp={checkValidDate}
                autoComplete={"off"}
            />
            <input
                type="text"
                disabled
                defaultValue={seperator}
                className='dateCustom-dash custom-field'
            />
            <input
                type="text"
                placeholder='MM'
                maxLength={2}
                pattern="[0-9]*"
                inputMode="numeric"
                className={`dateCustom-month custom-field`}
                {...register("month")}
                onInput={monthInput}
                onBlur={monthBlur}
                onKeyUp={checkValidDate}
                autoComplete={"off"}

            />
            <input
                type="text"
                disabled
                defaultValue={seperator}
                className=' dateCustom-dash custom-field'
            />
            <input
                type="text"
                placeholder='YYYY'
                maxLength={4}
                pattern="[0-9]*"
                inputMode="numeric"
                {...register("year")}
                className={`dateCustom-year custom-field`}
                onInput={yearInput}
                onKeyUp={checkValidDate}
                onBlur={checkValidDate}
                autoComplete={"off"}

            />
        </div>

    )
}

