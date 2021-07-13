import { SortEnum, SortProps } from './Sort.props';
import styles from './Sort.module.css';
import cn from 'classnames';
import SortIcon from './sort.svg';

export const Sort = ({
  sort,
  setSort,
  className,
  ...props
}: SortProps): JSX.Element => {
  return (
    <div className={cn(styles.sort, className)} {...props}>
      <div className={styles.sortName} id={'sort'}>
        Сортировка
      </div>
      <button
        id={'rating'}
        className={cn({
          [styles.active]: sort == SortEnum.Rating,
        })}
        onClick={() => setSort(SortEnum.Rating)}
        aria-selected={sort == SortEnum.Rating}
        aria-labelledby="sort rating"
      >
        <SortIcon className={styles.sortIcon} />
        По рейтингу
      </button>
      <button
        id={'price'}
        className={cn({
          [styles.active]: sort == SortEnum.Price,
        })}
        onClick={() => setSort(SortEnum.Price)}
        aria-selected={sort == SortEnum.Price}
        aria-labelledby="sort price"
      >
        <SortIcon className={styles.sortIcon} />
        По цене
      </button>
    </div>
  );
};
