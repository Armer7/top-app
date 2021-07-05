import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { SearchProps } from './Search.props';
import styles from './Search.module.css';
import cn from 'classnames';
import { Input } from '../';
import { Button } from '../';
import Glass from './glass.svg';
import { useRouter } from 'next/router';

export const Search = ({ className, ...props }: SearchProps): JSX.Element => {
  const [search, setSearch] = useState<string>('');
  const router = useRouter();

  const goSearch = () => {
    router.push({
      pathname: '/search',
      query: {
        q: search,
      },
    });
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      goSearch();
    }
  };

  return (
    <div className={cn(styles.search, className)} {...props}>
      <Input
        className={styles.imput}
        placeholder={'Поиск...'}
        value={search}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setSearch(e.target.value)
        }
        onKeyDown={handleKeyDown}
      />
      <Button
        className={styles.button}
        appearance={'primary'}
        onClick={goSearch}
      >
        <Glass />
      </Button>
    </div>
  );
};
