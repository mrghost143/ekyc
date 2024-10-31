import React from 'react';
import { Button } from "@shared";

export const RiskDisclosure = ({ onSucces }) => {
    const riskList = [
        "9 out of 10 individual traders in equity Futures and Options segment, incurred net losses.",
        "On an average, loss makers registered net trading loss close to 50,000.",
        "Over and above the net trading losses incurred, loss makers expended an additional 28% of net trading losses as transaction costs.",
        "Those making net trading profits, incurred between 15% to 50% of such profits as transaction cost."
    ];

    return (
        <>
            <ul className='flex flex-col gap-7 list-disc ml-8 mb-7'>
                {riskList.map((item) => <li className='text-base leading-tight text-black'>{item}</li>)}
            </ul>
            <div className='text-base bg-blue-200 p-4 leading-tight mb-7 rounded-lg'>
                SEBI study dated January 25, 2023 on “Analysis of Profit and Loss of Individual
                Traders dealing in equity Futures and Options (F&O) Segment”, wherein Aggregate
                Level findings are based on annual Profit/Loss incurred by individual traders
                in equity F&O during FY 2021-22.
            </div>
            <Button status="valid" onClick={onSucces}>OKAY</Button>
        </>
    )
}
