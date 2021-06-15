import { Button, Htag, P, Tag } from '../components';

export default function Home(): JSX.Element {
  return (
    <>
      <Htag tag="h1">Text1</Htag>
      <Button appearance={'primary'} arrow={'right'}>
        button
      </Button>
      <Button appearance={'ghost'} arrow={'right'}>
        button
      </Button>
      <P size={'lg'}>large</P>
      <P>middle</P>
      <P size={'sm'}>Small</P>
      <Tag> Ghost </Tag>
      <Tag size={'md'} color={'red'}>
        Red
      </Tag>
      <Tag color={'green'}>Green</Tag>
      <Tag color={'primary'}>Primary</Tag>
    </>
  );
}
