import { PProps } from './P.props';
import styles from './P.module.css';
import cn from 'classnames';

export const P = ({
  size = 'md',
  children,
  className,
  ...props
}: PProps): JSX.Element => {
  return (
    <p
      className={cn(styles.p, className, {
        [styles.small]: size === 'sm',
        [styles.middle]: size === 'md',
        [styles.large]: size === 'lg',
      })}
      {...props}
    >
      {children}
    </p>
  );
};
