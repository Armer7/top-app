import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { FieldErrors } from 'react-hook-form';
import { IReviewForm } from '../ReviewForm/ReviewForm.interface';

export interface RatingProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  isEditable?: boolean;
  rating: number;
  setRating?: (rating: number) => void;
  errors?: FieldErrors<IReviewForm>;
}
