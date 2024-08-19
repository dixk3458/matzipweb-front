import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import CustomButton from '../CustomButton/CustomButton';
import styles from './RetryErrorBoundary.module.css';

function RetryErrorBoundary({ children }: PropsWithChildren) {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary
      onReset={reset}
      fallbackRender={({ resetErrorBoundary }) => (
        <section className={styles.errorContainer}>
          <p className={styles.errorMessage}>잠시 후 다시 시도해주세요.</p>
          <p className={styles.errorMessage}>
            요청 사항을 처리하는데 실패했습니다.
          </p>
          <div className={styles.errorButton}>
            <CustomButton
              label="다시 시도"
              size="medium"
              variant="outlined"
              onClick={resetErrorBoundary}
            />
          </div>
        </section>
      )}
    >
      {children}
    </ErrorBoundary>
  );
}

export default RetryErrorBoundary;
