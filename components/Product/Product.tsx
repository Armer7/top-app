import { ProductProps } from './Product.props';
import styles from './Product.module.css';
import cn from 'classnames';
import { Button, Card, Divider, Rating, Review, ReviewForm, Tag } from '../';
import { declOfNum, priceRu } from '../../helpers/helpers';
import Image from 'next/image';
import { ForwardedRef, forwardRef, useRef, useState, MouseEvent } from 'react';
import { motion } from 'framer-motion';

export const Product = motion(
  forwardRef(
    (
      { product, className, ...props }: ProductProps,
      ref: ForwardedRef<HTMLDivElement>
    ): JSX.Element => {
      const [isReviewOpened, setIsReviewOpened] = useState<boolean>(false);
      const reviewRef = useRef<HTMLDivElement>(null);

      const scrollToReview = (e: MouseEvent) => {
        e.preventDefault();
        setIsReviewOpened(true);
        reviewRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
        reviewRef.current?.focus();
      };

      const variants = {
        visible: {
          opacity: 1,
          height: 'auto',
        },
        hidden: {
          opacity: 0,
          height: 0,
        },
      };

      return (
        <div className={className} {...props} ref={ref}>
          <Card className={styles.product}>
            <div className={styles.logo}>
              <Image
                src={process.env.NEXT_PUBLIC_DOMAIN + product.image}
                alt={product.title}
                width={70}
                height={70}
              />
            </div>
            <div className={styles.title}>{product.title}</div>
            <div className={styles.price}>
              <span className="visuallyHidden">цена</span>
              {priceRu(product.price)}

              {product.oldPrice && (
                <Tag className={styles.oldPrice} color={'green'}>
                  <span className="visuallyHidden">скидка</span>
                  {priceRu(product.price - product.oldPrice)}
                </Tag>
              )}
            </div>
            <div className={styles.credit}>
              <span className="visuallyHidden">кредит</span>
              {priceRu(product.credit)}

              <span className={styles.month}>/мес</span>
            </div>
            <div className={styles.rating}>
              <span className="visuallyHidden">
                {'рейтинг' + (product.reviewAvg ?? product.initialRating)}
              </span>
              {}
              <Rating rating={product.reviewAvg ?? product.initialRating} />
            </div>
            <div className={styles.tags}>
              {product.categories.map((category) => (
                <Tag className={styles.category} key={category} color={'ghost'}>
                  {category}
                </Tag>
              ))}
            </div>
            <div className={styles.priceTitle} aria-hidden={true}>
              цена
            </div>
            <div className={styles.creditTitle} aria-hidden={true}>
              кредит
            </div>
            <div className={styles.rateTitle}>
              <a href="#ref" onClick={(e: MouseEvent) => scrollToReview(e)}>
                {product.reviewCount}
                {declOfNum(product.reviewCount, ['отзыв', 'отзыва', 'отзывов'])}
              </a>
            </div>
            <Divider className={styles.hr} />
            <div className={styles.description}>{product.description}</div>
            <div className={styles.feature}>
              {product.characteristics.map((characteristic) => (
                <div
                  className={styles.characteristic}
                  key={characteristic.name}
                >
                  <span className={styles.characteristicName}>
                    {characteristic.name}
                  </span>
                  <span className={styles.characteristicDots}></span>
                  <span className={styles.characteristicValue}>
                    {characteristic.value}
                  </span>
                </div>
              ))}
            </div>
            <div className={styles.advBlock}>
              {product.advantages && (
                <div className={styles.advantages}>
                  <div className={styles.advTitle}>Преимущества</div>
                  <div>{product.advantages}</div>
                </div>
              )}
              {product.disadvantages && (
                <div className={styles.disadvantages}>
                  <div className={styles.advTitle}>Недостатки</div>
                  <div>{product.disadvantages}</div>
                </div>
              )}
            </div>
            <Divider className={cn(styles.hr, styles.hr2)} />
            <div className={styles.actions}>
              <Button appearance={'primary'}>Узнать подробнее</Button>
              <Button
                className={styles.reviewButton}
                appearance={'ghost'}
                arrow={isReviewOpened ? 'down' : 'right'}
                onClick={() => setIsReviewOpened(!isReviewOpened)}
                aria-expanded={isReviewOpened}
              >
                Читать отзывы
              </Button>
            </div>
          </Card>
          <motion.div
            variants={variants}
            initial={'hidden'}
            animate={isReviewOpened ? 'visible' : 'hidden'}
          >
            <Card
              color={'blue'}
              className={cn(styles.reviews, {
                [styles.opened]: isReviewOpened,
                [styles.closed]: !isReviewOpened,
              })}
              ref={reviewRef}
              tabIndex={isReviewOpened ? 0 : -1}
            >
              {product.reviews.map((r) => (
                <div key={r._id}>
                  <Review review={r} />
                  <Divider />
                </div>
              ))}
              <ReviewForm productId={product._id} isOpened={isReviewOpened} />
            </Card>
          </motion.div>
        </div>
      );
    }
  )
);
