import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider';


function Header (props){
    return (
        <Box>
            <Box sx={{width: '100vw', height: '7vh', backgroundColor: '#2c2c2c', display: 'grid', placeItems: 'center'}}> 
                <img src="https://static.zippia.com/ui-router/images/header/logo_white.svg" alt="Zippia Official Logo"></img>
            </Box>

            <Box sx={{width: '100vw', height: '12vh', display: 'grid', placeItems: 'center', color: '#333', letterSpacing: '0.2em'}}>
                <h2>JOBS NEAR ME - {props.jobsNumber} JOBS</h2>
                
            </Box>
            <Divider/>
        </Box>
    )
}

export default Header