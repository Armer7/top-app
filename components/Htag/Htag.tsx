import { HtagProps } from './Htag.props';
import styles from './Htag.module.css';
import cn from 'classnames';

export const Htag = ({
  tag,
  children,
  className,
  ...props
}: HtagProps): JSX.Element => {
  switch (tag) {
    case 'h1':
      return (
        <h1 className={cn(styles.h1, className)} {...props}>
          {children}
        </h1>
      );
    case 'h2':
      return (
        <h2 className={cn(styles.h2, className)} {...props}>
          {children}
        </h2>
      );
    case 'h3':
      return (
        <h3 className={cn(styles.h3, className)} {...props}>
          {children}
        </h3>
      );
    default:
      return <></>;
  }
  /* Как вариант
 return (
    <>
      {tag == 'h1' && <h1>{children}</h1>}
      {tag == 'h2' && <h2>{children}</h2>}
      {tag == 'h3' && <h3>{children}</h3>}
    </>
  );*/
};
