import React from 'react';
import Link from "next/link";
import Image from "next/image";

import logoImg from '@/assets/logo.png';
import styles from './main-header.module.css';
import MainHeaderBackground from "@/components/main-header/main-header-background";
import NavLink from "@/components/main-header/nav-link";

const MainHeader = () => {
    return (
        <>
            <MainHeaderBackground />
            <header className={styles.header}>
                <Link className={styles.logo} href="/">
                    <Image src={logoImg} alt="A plate with food on it" priority/>
                    NextLevel Food
                </Link>

                <nav className={styles.nav}>
                    <ul>
                        <li><NavLink href='/meals'>Browse Meals</NavLink></li>
                        <li><NavLink href='/community'>Foodies Community</NavLink></li>
                    </ul>
                </nav>
            </header>
        </>
    );
};

export default MainHeader;