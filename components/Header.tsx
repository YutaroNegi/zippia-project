import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider';
import Image from 'next/image'

interface Props {
    jobsNumber: number
}

function Header (props : Props){
    // hiding the page title if the site is outisde /test/jobs
    let display : string = 'grid'
    if(props.jobsNumber == 0) display = 'none'

    return (
        <Box>
            <Box sx={{width: '100vw', height: '7vh', backgroundColor: '#2c2c2c', display: 'grid', placeItems: 'center'}}> 
                <Image width="160" height="36" src="https://static.zippia.com/ui-router/images/header/logo_white.svg" alt="Zippia Official Logo"/>
            </Box>

            <Box sx={{width: '100vw', height: '12vh', display: {display}, placeItems: 'center', color: '#333', letterSpacing: '0.2em'}}>
                <h2>JOBS NEAR ME - {props.jobsNumber} JOBS</h2>
                
            </Box>
            <Divider/>
        </Box>
    )
}

export default Header