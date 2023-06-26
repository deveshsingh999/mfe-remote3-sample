import React from 'react';
import styles from '../styles/home.module.css';

function Home({ pageData }: HomeProps) {
  const title = pageData?.title || '...';

  return (
    <>
      <h1 className={styles.headingText}>React App</h1>
      <div>Title: {title}</div>
    </>
  );
}

export default Home;

interface HomeProps {
  pageData?: any;
}
