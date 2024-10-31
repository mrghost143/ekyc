import React, { useEffect, useMemo, useState } from 'react';
import { InfoCard } from "@features";
import { PageAside } from "@shared";
import asideInfo from "./aside-info.json";
import { Congratulation, Digilocker, Selfie } from '../../module/protected';

export const RegularAside = React.memo(({ page = "email" }) => {
    const [asideData, setAsideData] = useState({ title: "", imageSrc: "" });

    // Memoize title data
    const asideTitles = useMemo(() => ({
        email: "Email Verification",
        digilocker:"Verify Documents",
        personal:"Add Personal Details",
        nominee:"Add Nominee Details",
        "bank-details":"Bank Verification",
        "bank-upload":"Bank Upload",
        signature: "Signature Verification",
        fno:"Activate F&O",
        selfie:"Capture Selfie",
        "application-form":"Application Form",
        "retail-pack":"Pack Upgrade",
        congratulation:"Congratulation"
    }), []);

    useEffect(() => {
        const loadAsideData = async () => {
            try {
                const images = {
                    email: () => import("@assets/images/aside/email.svg"),
                    digilocker: () => import("@assets/images/aside/digilocker.svg"),
                    personal: () => import("@assets/images/aside/personal.svg"),
                    nominee: () => import("@assets/images/aside/nominee.svg"),
                    "bank-details": () => import("@assets/images/aside/bank.svg"),
                    "bank-upload": () => import("@assets/images/aside/cheque.svg"),
                    signature: () => import("@assets/images/aside/signature.svg"),
                    fno: () => import("@assets/images/aside/fno.svg"),
                    selfie:() => import("@assets/images/aside/selfie.svg"),
                    "application-form":() => import("@assets/images/aside/application-form.svg"),
                    "retail-pack":() => import("@assets/images/aside/pack.svg"),
                    congratulation:() => import("@assets/images/aside/congratulation.svg"),

                };

                if (images[page]) {
                    const module = await images[page]();
                    setAsideData({
                        title: asideTitles[page],
                        imageSrc: module.default
                    });
                }
            } catch (error) {
                console.error("Error loading image:", error);
                setAsideData({
                    title: "",
                    imageSrc: ""// Fallback image in case of error
                });
            }
        };

        loadAsideData();
    }, [page, asideTitles]);

    // Memoize info card items to avoid recalculating them unnecessarily
    const infoCardItems = useMemo(() => asideInfo[page], [page]);

    return (
        <>
            {asideData.imageSrc && (
                <PageAside title={asideData.title} imageSrc={asideData.imageSrc} />
            )}
            <InfoCard items={infoCardItems} />
        </>
    );
});
