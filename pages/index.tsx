import { GetStaticProps } from 'next';
import {
  Button,
  Htag,
  Input,
  P,
  Rating,
  Search,
  Tag,
  TextArea,
} from '../components';
import React, { useState } from 'react';
import { withLayout } from '../Layout/Layout';
import axios from 'axios';
import { MenuItem } from '../interfaces/menu.interface';
import { API } from '../helpers/api';

function Home({ menu }: HomeProps): JSX.Element {
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
      <Input placeholder={'Имя'} />
      <br />
      <TextArea placeholder={'Ваш текст'} />
    </>
  );
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const firstCategory = 0;
  const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
    firstCategory,
  });
  return {
    props: {
      menu,
      firstCategory,
    },
  };
};

interface HomeProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: number;
}

export default withLayout(Home);
