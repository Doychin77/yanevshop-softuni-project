// Footer.js

import React from 'react';
import styles from './footer.module.css'; // Import the CSS module

const Footer = () => {
    return (
        <footer className={styles.footer}> {/* Apply the CSS module */}
            &copy; 2024 Yanev Shop. All rights reserved.
        </footer>
    );
}

export default Footer;
