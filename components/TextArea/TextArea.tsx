import { TextAreaProps } from './TextArea.props';
import styles from './TextArea.module.css';
import cn from 'classnames';
import { ForwardedRef, forwardRef } from 'react';

export const TextArea = forwardRef(
  (
    { error, className, ...props }: TextAreaProps,
    ref: ForwardedRef<HTMLTextAreaElement>
  ): JSX.Element => {
    return (
      <div className={cn(styles.textAreaWrapper, className)}>
        <textarea
          className={cn(styles.textArea, {
            [styles.error]: error,
          })}
          ref={ref}
          {...props}
        />
        {error && (
          <span role="alert" className={styles.errorMessage}>
            {error.message}
          </span>
        )}
      </div>
    );
  }
);
