import React, { useState, forwardRef, useEffect } from 'react';
import Select from 'react-select';
import { CustomDate } from './date-custom';

export const CustomInput = forwardRef(({
    label,
    error,
    placeholder,
    type = "text",
    onBlur,
    isRequired = true,
    maxLength = 40,
    ...rest
}, ref) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => setIsFocused(true);

    const handleBlur = (e) => {
        setIsFocused(false);
        if (onBlur) onBlur(e);
    };

    return (
        <div className="input-field-container">
            <label className="input-field-label">
                {label} {isRequired && <span className="required-tag">*</span>}
            </label>
            <div className={`input-field-wrapper ${error ? "error" : isFocused ? 'focus' : ''}`}>
                <input
                    ref={ref}
                    type={type}
                    className={`input-field ${error ? 'input-error' : ''}`}
                    placeholder={placeholder}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    maxLength={maxLength}
                    {...rest}
                />
            </div>
            {error && <p className="input-field-message text-red-500">{error.message}</p>}
        </div>
    );
});

export const CustomInputRadio = ({
    label,
    name,
    error,
    type = "radio",
    isRequired = true,
    valueList,
    setValue,
    selected,
}) => {

    const onRadioClick = (e, name) => {
        setValue(name, e.target.value, { shouldValidate: true });
    }
    return (
        <div className="radio-container">
            <legend className="radio-label">
                {label} {isRequired && <span className="required-tag">*</span>}
            </legend>
            <div className={`radio-field-wrapper ${error ? "error" : ''}`}>
                {valueList?.map(({ id, value, label }, index) => (
                    <div key={index} className="radio-item">
                        <input
                            type={type}
                            id={id}
                            name={name}
                            value={value}
                            className='radio-field-input'
                            onChange={(e) => onRadioClick(e, name)}
                            checked={selected === value}
                        />
                        <label htmlFor={id} className='radio-field-label'>{label}</label>
                    </div>
                ))}
            </div>
            {error && <p className="input-field-message text-red-500">{error.message}</p>}
        </div >
    );
};

export const CustomeSelect = ({ options, label, selected, setValue, name, error, onSelect = () => { } }) => {
    const [selectedValue, setSelectedValue] = useState(null);

    useEffect(() => {
        if (selected) {
            let defaultSelect = options.find(option => option?.value === selected);
            setSelectedValue(defaultSelect)
        } else {
            setSelectedValue(null)
        }
    }, [selected])


    const onChange = (data) => {
        setValue(name, data.value, { shouldValidate: true });
        setSelectedValue(data);
        onSelect(data.value)
    }
    return (
        <div className="select-container">
            <label htmlFor="" className='select-label'>{label}{true && <span className="required-tag">*</span>}</label>
            <Select options={options} placeholder="Select"
                classNamePrefix="react-select" className={`${error ? "error" : ""} select-wrapper`}
                onChange={onChange} value={selectedValue} />
            {error && <p className="input-field-message text-red-500">{error.message}</p>}
        </div>
    )
}


export const CustomDateWrapper = ({ label, isRequired = true, name, setValue, date, error }) => {
    const onDateCallBack = (data) => {
        setValue(name, data, { shouldValidate: true })
    }
    return (
        <div className="date-container">
            <label htmlFor="" className='date-label'>{label}  {isRequired && <span className="required-tag">*</span>}</label>
            <CustomDate
                date={date}
                onSubmit={onDateCallBack}
                seperator="/"
                maxYear={0}
                error={error}
            />
            {error && <p className="input-field-message text-red-500">{error.message}</p>
            }
        </div>


    )
}