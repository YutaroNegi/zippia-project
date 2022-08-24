import Header from '../components/Header'
import Button from '@mui/material/Button';
import Link from 'next/link';

export default function Home() {
  // adding the props.jobsNumber = 0 to hide the page title
  // button will redirect to the /test/jobs
  return (<>
    <Header jobsNumber={0}/>
    <Button sx={{width: '14em', marginBottom: '1em', fontSize: '0.8em', marginLeft: 'auto', marginRight: 'auto', display: 'block', marginTop: '2em'}}  variant='contained'><Link href='/test/jobs'>Find jobs near me</Link></Button>
  </>)
}
