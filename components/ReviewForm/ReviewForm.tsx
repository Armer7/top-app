import { ReviewFormProps } from './ReviewForm.props';
import styles from './ReviewForm.module.css';
import CloseIcon from './close.svg';
import cn from 'classnames';
import { Button, Input, Rating, TextArea } from '../';
import { useForm, Controller } from 'react-hook-form';
import { IReviewForm, IReviewSentResponse } from './ReviewForm.interface';
import axios from 'axios';
import { API } from '../../helpers/api';
import { useState } from 'react';

export const ReviewForm = ({
  productId,
  isOpened,
  className,
  ...props
}: ReviewFormProps): JSX.Element => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors
  } = useForm<IReviewForm>();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const onSubmit = async (formData: IReviewForm) => {
    try {
      const { data } = await axios.post<IReviewSentResponse>(
        API.review.createDemo,
        { ...formData, productId }
      );
      if (data.message) {
        setIsSuccess(true);
        reset();
      } else {
        setError('Что-то пошло не так');
      }
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={cn(styles.reviewForm, className)} {...props}>
        <Input
          {...register('name', {
            required: { value: true, message: 'Заполните имя' },
          })}
          error={errors.name}
          placeholder={'Имя'}
          tabIndex={isOpened ? 0 : -1}
          aria-invalid={!!errors.name}
        />
        <Input
          {...register('title', {
            required: { value: true, message: 'Заполните заголовок' },
          })}
          className={styles.title}
          error={errors.title}
          placeholder={'Заголовок отзыва'}
          tabIndex={isOpened ? 0 : -1}
          aria-invalid={!!errors.title}
        />
        <div className={styles.rating}>
          <span>Оценка:</span>
          <Controller
            control={control}
            name={'rating'}
            rules={{
              required: { value: true, message: 'Укажите рейтинг' },
            }}
            render={({ field }) => (
              <Rating
                rating={field.value}
                ref={field.ref}
                isEditable={true}
                setRating={field.onChange}
                errors={errors}
                tabIndex={isOpened ? 0 : -1}
              />
            )}
          />
        </div>
        <TextArea
          {...register('description', {
            required: { value: true, message: 'Заполните отзыв' },
          })}
          className={styles.description}
          error={errors.description}
          placeholder={'Текст отзыва'}
          tabIndex={isOpened ? 0 : -1}
          aria-label="Текст отзыва"
          aria-invalid={!!errors.description}
        />
        <div className={styles.submit}>
          <Button
            appearance={'primary'}
            tabIndex={isOpened ? 0 : -1}
            onClick={() => clearErrors()}
          >
            Отправить
          </Button>
          <span className={styles.info}>
            * Перед публикацией отзыв пройдет предварительную модерацию и
            проверку
          </span>
        </div>
      </div>
      {isSuccess && (
        <div className={cn(styles.success, styles.panel)} role="alert">
          <div className={styles.successTitle}>Ваш отзыв отправлен</div>
          <div>Спасибо, ваш отзыв будет опубликован после проверки</div>
          <button
            className={styles.close}
            onClick={() => setIsSuccess(false)}
            aria-label="закрыть оповещение"
          >
            <CloseIcon />
          </button>
        </div>
      )}
      {error && (
        <div className={cn(styles.error, styles.panel)} role="alert">
          Что-то пошло не так, попробуйте обновить страницу
          <button
            className={styles.close}
            onClick={() => setError(undefined)}
            aria-label="закрыть оповещение"
          >
            <CloseIcon />
          </button>
        </div>
      )}
    </form>
  );
};
