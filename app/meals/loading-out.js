import React from 'react';

import styles from './loading-out.module.css';

const MealsLoadingPage = () => {
    return (
        <p className={styles.loading}>
            Loading Meals...
        </p>
    );
};

export default MealsLoadingPage;