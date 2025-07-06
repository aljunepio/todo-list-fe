import React from "react";
import styles from "./loadingStyle.module.scss";

interface LoadingProps {
  isSpin: boolean;
}

const Loading: React.FC<LoadingProps> = ({ isSpin }) => {
  if (!isSpin) return null;
  
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loader}>
        <div className={styles.spinner}></div>
        <div className={styles.loadingText}>Loading...</div>
      </div>
    </div>
  );
};

export default Loading;
