import { useState } from 'react';

import styles from './app.module.css';
import data from './data.json';

export const App = () => {
  const steps = data;

  const [activeIndex, setActiveIndex] = useState(0);

  const inFirstStep = activeIndex === 0;
  const inLastStep = activeIndex === steps.length - 1;

  const handleBackClick = () => {
    if (!inFirstStep) {
      setActiveIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleNextClick = () => {
    if (!inLastStep) {
      setActiveIndex((prevIndex) => prevIndex + 1);
    } else {
      setActiveIndex(0);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>Инструкция по готовке пельменей</h1>
        <div className={styles.steps}>
          <div className={styles['steps-content']}>{steps[activeIndex].content}</div>
          <ul className={styles['steps-list']}>
            {steps.map(({ id, title }, index) => (
              <li
                className={`${styles['steps-item']} ${index < activeIndex ? styles.done : ''} ${index === activeIndex ? styles.active : ''}`}
                key={id}
              >
                <button
                  className={styles['steps-item-button']}
                  onClick={() => setActiveIndex(index)}
                >
                  {index + 1}
                </button>
                {title}
              </li>
            ))}
          </ul>
          <div className={styles['buttons-container']}>
            <button
              className={styles.button}
              disabled={inFirstStep}
              onClick={handleBackClick}
            >
              Назад
            </button>
            <button className={styles.button} onClick={handleNextClick}>
              {activeIndex < steps.length - 1 ? 'Далее' : 'Начать с начала'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
