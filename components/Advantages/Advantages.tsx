import { AdvantagesProps } from './Advantages.props';
import styles from './Advantages.module.css';
import CheckIcon from './check.svg';
import { Htag } from '../';
import { P } from '../';

export const Advantages = (advantages: AdvantagesProps): JSX.Element => {
  return (
    <div className={styles.advantage}>
      <CheckIcon />
      <Htag className={styles.title} tag={'h3'}>
        {advantages.title}
      </Htag>
      <hr className={styles.vLines} />
      <P size={'lg'}>{advantages.description}</P>
    </div>
  );
};
