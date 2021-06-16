import { FooterProps } from './Footer.props';
import styles from './Footer.module.css';
import cn from 'classnames';
import { format } from 'date-fns';

export const Footer = ({ className, ...props }: FooterProps): JSX.Element => {
  return (
    <footer className={cn(className, styles.footer)} {...props}>
      <div className={styles.copyright}>
        OwlTop © 2020 - {format(new Date(), 'yyyy')} Все права защищены
      </div>
      <a className={styles.terms} href={'#'} target={'_blank'}>
        Пользовательское соглашение
      </a>
      <a className={styles.policy} href={'#'} target={'_blank'}>
        Политика конфиденциальности
      </a>
    </footer>
  );
};
