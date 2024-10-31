import PropTypes from 'prop-types';
import React from 'react';
import { FcGoogle } from "react-icons/fc";
import { GoChevronLeft, GoMail } from "react-icons/go";
import { MdOutlineDownloadDone, MdOutlineRotateRight } from "react-icons/md";
import { BackSVG, CircleTickSVG, CloseSVG, CropSVG, CrownSVG, DeleteSVG,
     DesignCheckedSVG, DotSVG, DoubleTickSVG, EditSVG, FileSVG, GiftSVG, HeadSetSVG, 
     IdeaSVG, InfoSVG, IpoSVG, MFSVG, MTFSVG, NcdSVG, PlusSVG, ResearchSVG, RetrySVG, SGBSVG, SheildSVG, StarSVG, StockSVG,
    TelecallerSVG, TickSVG, UnTickSVG, UploadSVG, UsersSVG, 
    USStocksSVG} from './svg';
    import { BsQuestionCircle } from "react-icons/bs";


const icons = {
    // beer: FaBeer,
    // coffee: FaCoffee,
    mail: GoMail,
    google: FcGoogle,
    goChevronLeft: GoChevronLeft,
    telecaller: TelecallerSVG,
    close: CloseSVG,
    back: BackSVG,
    file: FileSVG,
    upload: UploadSVG,
    crop: CropSVG,
    complete: MdOutlineDownloadDone,
    rotate: MdOutlineRotateRight,
    headSet: HeadSetSVG,
    sheild: SheildSVG,
    delete: DeleteSVG,
    edit: EditSVG,
    info:InfoSVG,
    plus:PlusSVG,
    idea:IdeaSVG,
    "design-checked":DesignCheckedSVG,
    users:UsersSVG,
    retry:RetrySVG,
    dot:DotSVG,
    gift:GiftSVG,
    "double-tick":DoubleTickSVG,
    tick:TickSVG,
    untick:UnTickSVG,
    crown:CrownSVG,
    star:StarSVG,
    "circle-tick":CircleTickSVG,
    stock:StockSVG,
    ncd:NcdSVG,
    ipo:IpoSVG,
    "us-stock":USStocksSVG,
    research:ResearchSVG,
    mtf:MTFSVG,
    sgb:SGBSVG,
    mf:MFSVG,
    question:BsQuestionCircle
};

export const Icon = ({ name, size = 24, color = 'currentColor', stroke = "", ariaLabel, className = "", ...rest }) => {
    const IconComponent = icons[name];
    if (!IconComponent) {
        console.warn(`Icon "${name}" not found.`);
        return null;
    }

    return (
        <span
            role="icon"
            aria-label={ariaLabel}
            aria-hidden={!ariaLabel}
            {...rest}
            className={`${className} cursor-pointer `}
            style={{ display: "inline-flex", placeContent: "center", width: size, height: size, color, ...rest?.style }}
        >
            <IconComponent size={size} color={color} fill={color} stroke={stroke} />
        </span>
    );
};

Icon.propTypes = {
    name: PropTypes.oneOf(Object.keys(icons)).isRequired,
    size: PropTypes.number,
    color: PropTypes.string,
    ariaLabel: PropTypes.string,
    rest: PropTypes.object,
};

