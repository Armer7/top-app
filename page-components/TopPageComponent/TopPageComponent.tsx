import { TopPageComponentProps } from './TopPageComponent.props';
import { Advantages, HhData, Htag, Product, Sort, Tag } from '../../components';
import styles from './TopPageComponent.module.css';
import { TopLevelCategory } from '../../interfaces/page.interface';
import { SortEnum } from '../../components/Sort/Sort.props';
import { useEffect, useReducer } from 'react';
import { sortReducer } from './sort.reducer';
import { declOfNum } from '../../helpers/helpers';
import { useReducedMotion } from 'framer-motion';

export const TopPageComponent = ({
  page,
  products,
  firstCategory,
}: TopPageComponentProps): JSX.Element => {
  const [{ products: sortedProducts, sort }, dispathSort] = useReducer(
    sortReducer,
    {
      products,
      sort: SortEnum.Rating,
    }
  );
  const shouldReduceMotion = useReducedMotion();

  const setSort = (sort: SortEnum) => {
    dispathSort({ type: sort });
  };

  useEffect(() => {
    dispathSort({ type: 'reset', initialState: products });
  }, [products]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <Htag tag={'h1'}>{page.title}</Htag>
        {products && (
          <Tag
            color={'grey'}
            size={'md'}
            aria-label={
              products.length +
              declOfNum(products.length, ['элемент', 'элемента', 'элементов'])
            }
          >
            {products.length}
          </Tag>
        )}
        <Sort sort={sort} setSort={setSort} />
      </div>
      <div role="list">
        {sortedProducts &&
          sortedProducts.map((p) => (
            <Product
              role="listItem"
              layout={shouldReduceMotion ? false : true}
              key={p._id}
              product={p}
            />
          ))}
      </div>
      <div className={styles.hhTitle}>
        <Htag tag={'h2'}>Вакансии - {page.category}</Htag>

        <Tag color={'red'} size={'md'}>
          hh.ru
        </Tag>
      </div>
      {firstCategory === TopLevelCategory.Courses && page.hh && (
        <HhData {...page.hh} />
      )}

      {page.advantages && page.advantages.length > 0 && (
        <>
          <Htag tag={'h2'}>Преимущества</Htag>
          {page.advantages.map((advantage) => (
            <Advantages {...advantage} key={advantage._id} />
          ))}
        </>
      )}
      {page.seoText && (
        <div
          className={styles.seo}
          dangerouslySetInnerHTML={{ __html: page.seoText }}
        />
      )}
      <Htag tag={'h2'}>Получаемые навыки</Htag>
      {page.tags.map((tag) => (
        <Tag color={'primary'} key={tag}>
          {tag}
        </Tag>
      ))}
    </div>
  );
};
