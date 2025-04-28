import React from "react";
import styles from "./loadingStyle.module.scss";

interface LoadingProps {
  isSpin: boolean;
}

const Loading: React.FC<LoadingProps> = () => {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loader}></div>
    </div>
  );
};

export default Loading;
