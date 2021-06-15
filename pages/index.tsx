import { Button, Htag } from '../components';

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
    </>
  );
}
