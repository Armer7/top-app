import { RatingProps } from './Rating.props';
import styles from './Rating.module.css';
import cn from 'classnames';
import {
  useEffect,
  useState,
  KeyboardEvent,
  forwardRef,
  ForwardedRef,
  useRef,
} from 'react';
import StarIcon from './star.svg';

export const Rating = forwardRef(
  (
    {
      isEditable = false,
      rating,
      setRating,
      errors,
      tabIndex,
      ...props
    }: RatingProps,
    ref: ForwardedRef<HTMLDivElement>
  ): JSX.Element => {
    const [ratingArray, setRatingArray] = useState<JSX.Element[]>(
      new Array(5).fill(<></>)
    );
    const ratingArrayRef = useRef<(HTMLSpanElement | null)[]>([]);

    useEffect(() => {
      constructRating(rating);
    }, [rating, tabIndex]);

    useEffect(() => {
     if (!errors?.name && !errors?.title && !errors?.description && errors?.rating  && ratingArrayRef.current[0]?.tabIndex === 0) {
       ratingArrayRef.current[0]?.focus();
     }
    }, [errors?.rating]);


    const computeFocus = (r: number, i: number): number => {
      if (!isEditable) {
        return -1;
      }
      if (!r && i === 0) {
        return tabIndex ?? 0;
      }
      if (r === i + 1) {
        return tabIndex ?? 0;
      }
      return -1;
    };

    const constructRating = (currentRating: number) => {
      const updateArray = ratingArray.map((r: JSX.Element, i: number) => {
        return (
          <span
            className={cn(styles.star, {
              [styles.filled]: i < currentRating,
              [styles.editable]: isEditable,
            })}
            onMouseEnter={() => changeDisplay(i + 1)}
            onMouseLeave={() => changeDisplay(rating)}
            onClick={() => onClick(i + 1)}
            tabIndex={computeFocus(rating, i)}
            onKeyDown={handleKey}
            ref={(r) => ratingArrayRef.current?.push(r)}
            role={isEditable ? 'slider' : ''}
            aria-valuenow={rating}
            aria-valuemax={5}
            aria-valuemin={1}
            aria-label={isEditable ? 'укажите рейтинг' : 'рейтинг' + rating}
            aria-invalid={!!errors?.rating}
          >
            <StarIcon />
          </span>
        );
      });
      setRatingArray(updateArray);
    };

    const changeDisplay = (i: number) => {
      if (!isEditable) {
        return;
      }
      constructRating(i);
    };
    const onClick = (i: number) => {
      if (!isEditable || !setRating) {
        return;
      }
      setRating(i);
    };

    const handleKey = (e: KeyboardEvent) => {
      if (!isEditable || !setRating) {
        return;
      }
      if (e.code === 'ArrowRight' || e.code === 'ArrowUp') {
        e.preventDefault();
        if (!rating) {
          setRating(1);
        } else {
          setRating(rating < 5 ? rating + 1 : 5);
        }
        ratingArrayRef.current[rating]?.focus();
      }
      if (e.code === 'ArrowLeft' || e.code === 'ArrowDown') {
        e.preventDefault();
        setRating(rating > 1 ? rating - 1 : 1);
        ratingArrayRef.current[rating - 2]?.focus();
      }
    };

    return (
      <div
        className={cn(styles.ratingWrapper, {
          [styles.error]: errors?.rating,
        })}
        {...props}
        ref={ref}
      >
        {ratingArray.map((r, i) => (
          <span key={i}>{r}</span>
        ))}
        {errors?.rating && (
          <span role="alert" className={styles.errorMessage}>
            {errors.rating.message}
          </span>
        )}
      </div>
    );
  }
);
