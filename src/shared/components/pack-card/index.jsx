import React, { useState } from 'react'
import { Icon } from '../../icon/container-icon';
import "./pack-card.scss";

export const PackCard = ({ data, setSelectedPackIndex, selectedPackIndex, index }) => {

    const {
        primaryColor,
        secondaryColor,
        tagIcon,
        cardTitle,
        title,
        titleIconName,
        image,
        packDetails,
        amcDetails,
        price,
        priceSubText,
    } = data;

    const active = selectedPackIndex === index



    return (
        <>
            <div
                className={`pack-card-tag`}
                style={{ borderColor: primaryColor, backgroundColor: secondaryColor }}
            >
                <Icon
                    name={tagIcon}
                    size={9}
                    ariaLabel={`${tagIcon} icon`}
                />
                <span className={`text-${primaryColor}`} style={{ color: primaryColor }}>
                    {cardTitle}
                </span>
            </div>

            <div
                className={`pack-card cursor-pointer`} style={{ backgroundColor: active && secondaryColor,borderColor:active&& primaryColor }} onClick={() => setSelectedPackIndex(index)} >
                <div className={`pack-card-heading bg-${primaryColor}`} style={{ backgroundColor: primaryColor }}>
                    <Icon name={titleIconName} size={35} ariaLabel="gift icon" />
                    <span className="pack-card-title">
                        {title}                        </span>
                </div>
                <img
                    src={image}
                    alt={title}
                    className="pack-card-img"
                    height={86}
                    width={144}
                />
                <div className="pack-card-details">
                    {packDetails.map(({ icon, title, subTitle }, key) => (
                        <div className="pack-card-details-wrapper" key={key}>
                            <Icon
                                name={icon}
                                size={12}
                                ariaLabel={`${icon}icon`}
                            />
                            <div>
                                <span className="pack-card-details-title">
                                    {title}
                                </span>
                                <h5 className="pack-card-details-subtitle">
                                    {subTitle}
                                </h5>
                            </div>
                        </div>))}
                </div>
                <div className="pack-card-amcdetails">
                    <Icon
                        name={`${amcDetails.icon}`}
                        size={12}
                        ariaLabel={`${amcDetails.icon} icon`}
                    />
                    <div className="pack-card-amcdetails-wrapper">
                        <span className="pack-card-amcdetails-title">
                            {amcDetails.title}
                        </span>
                        <h5 className="pack-card-amcdetails-subtitle">
                            {amcDetails.subTitle}
                        </h5>
                    </div>
                </div>
                <div className="pack-card-price-wrapper" style={{ color: primaryColor }}>
                    <span className="pack-card-price">
                        {price}
                    </span>
                    <span className="pack-card-price-text">
                        {priceSubText}
                    </span>
                </div>
            </div>
        </>
    )
}
