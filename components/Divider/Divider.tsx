import { DividerProps } from './Divider.props';
import styles from './Divider.module.css';
import cn from 'classnames';

export const Divider = ({ className, ...props }: DividerProps): JSX.Element => {
  return <hr className={cn(styles.divider, className)} {...props} />;
};
