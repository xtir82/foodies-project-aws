import React, {Suspense} from 'react';

import styles from './page.module.css';
import Link from "next/link";
import MealsGrid from "@/components/meals/meals-grid";
import { getMeals } from '@/lib/meals.js'

export const metadata = {
    title: 'All Meals | NextLevel Food',
    description: 'Browse the delicious meals shared by our vibrant community',
};

const Meals = async () => {
    const meals = await getMeals();
    return <MealsGrid  meals={meals}/>;
};

const MealsPage = () => {

    return (
    <>
        <header className={styles.header}>
            <h1>Delicious meals, created <span className={styles.highlight}>by you</span></h1>
            <p>Choose your favorite recipe and cook it yourself. It is easy and fun!</p>
            <p className={styles.cta}>
                <Link href="/meals/share">Share Your Favorite Recipe</Link>
            </p>
        </header>
        <main className={styles.main}>
            <Suspense fallback={<p className={styles.loading}>Loading Meals...</p>}>
                <Meals />
            </Suspense>
        </main>
    </>
)};

export default MealsPage;