import React from 'react';

export interface ISceletonProps {
    amount: number,
    children: React.ReactElement
}

export default function Sceleton({ amount, children }: ISceletonProps) {
    const amountOfElements = [...Array(amount).keys()]

    return (
        <>
            {
                amountOfElements.map(number => {
                    return (
                        <div key={number}>
                            {children}
                        </div>

                    )
                })
            }

        </>
    );
}
