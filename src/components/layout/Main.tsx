import React from 'react';
import { Link } from 'react-router-dom';
import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';

export interface IMainProps {
    children: React.ReactElement
}

export default function Main({children}: IMainProps) {
    return (
        <>
            <Header />
            {children}
            <Footer>
                <Link to={'/'} className="header__logo">
                    <h1 className="logo-text"><strong>netflix</strong>roulette</h1>
                </Link>
            </Footer>
        </>
    );
}
