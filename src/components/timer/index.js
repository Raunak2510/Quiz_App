import React, { useState, useEffect } from 'react';

import styles from './timer.module.scss';

const Timer = () => {
    const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const targetTime = new Date().getTime() + 42 * 60 * 1000; // Example: 42 minutes from now

        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetTime - now;

            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            setTime({ hours, minutes, seconds });

            if (distance < 0) {
                clearInterval(interval);
                setTime({ hours: 0, minutes: 0, seconds: 0 });
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className={styles.timer}>
            <h3>Time Left</h3>
            <div className={styles.time}>
                <div>
                    <span>{time.hours.toString().padStart(2, '0')}</span>
                    <small>hours</small>
                </div>
                <div>
                    <span>{time.minutes.toString().padStart(2, '0')}</span>
                    <small>minutes</small>
                </div>
                <div>
                    <span>{time.seconds.toString().padStart(2, '0')}</span>
                    <small>seconds</small>
                </div>
            </div>
        </div>
    );
};

export default Timer;
