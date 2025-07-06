import React from "react";
import styles from "./emptyState.module.scss";

interface EmptyStateProps {
  errorMessage?: string;
  isLoading?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({ errorMessage='sampleError', isLoading = false }) => {
  if (isLoading) {
    return null; // Don't show empty state while loading
  }

  if (errorMessage) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.errorIcon}>⚠️</div>
        <h3 className={styles.errorTitle}>Error</h3>
        <p className={styles.errorMessage}>{errorMessage}</p>
      </div>
    );
  }

  return (
    <div className={styles.emptyState}>
      <div className={styles.emptyIcon}>📝</div>
      <h3 className={styles.emptyTitle}>No tasks to display</h3>
      <p className={styles.emptyMessage}>
        You don't have any tasks yet. Add a new task to get started!
      </p>
    </div>
  );
};

export default EmptyState; 