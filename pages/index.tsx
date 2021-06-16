import { Button, Htag, P, Rating, Tag } from '../components';
import React, { useState } from 'react';

export default function Home(): JSX.Element {
  const [rating, setRating] = useState<number>(4);
  return (
    <>
      <Htag tag="h1">Headers</Htag>
      <Button appearance={'primary'} arrow={'right'}>
        button
      </Button>
      <Button appearance={'ghost'} arrow={'down'}>
        button
      </Button>
      <P size={'lg'}>Ghost</P>
      <P>middle</P>
      <P size={'sm'}>Small</P>
      <Tag> Ghost </Tag>
      <Tag size={'md'} color={'red'}>
        Red
      </Tag>
      <Tag color={'green'}>Green</Tag>
      <Tag color={'primary'}>Primary</Tag>
      <Rating rating={rating} isEditable={true} setRating={setRating} />
    </>
  );
}
