import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box'
import Pagination from '@mui/material/Pagination';
import Header from '../components/Header'

export default function Jobs({jobs}){
    console.log(jobs[0]);
    const [allJobs, setAllJobs] = React.useState(jobs);
    const [sortedByCompanyName, setSortedByCompanyName] = React.useState(false);
    const [sortedByDays, setsortedByDays] = React.useState(false);
    const [page, setPage] = React.useState(1);

    function orderByCompanyName(){
        // React rerenders the component when props or state changed. 
        // But setAllJobs doesn't consider sorted as a new array because it was mutated so the reference was not changed. 
        // For React it is still the same array you passed at first time. You need to return new array and then pass it to setAllJobs.
        if(sortedByCompanyName){
            setAllJobs(jobs)
        } else{
            const jobsCopy = [...allJobs]
            const sortedJobs = jobsCopy.sort((a, b) => (a.companyName > b.companyName ? 1 : -1))
            setAllJobs(sortedJobs)
        }

        setSortedByCompanyName(!sortedByCompanyName)
    }

    function orderBySevenDays(){
        if(sortedByDays){
            setAllJobs(jobs)
        }else{
            const jobsCopy = [...allJobs]
            const result = jobsCopy.filter(job => {
                const today = new Date()
                const jobDate = new Date(job.postingDate)
                const daysDifference = getDifferenceInDays(today, jobDate)
    
                if(daysDifference < 7) return job
            });
    
            setAllJobs(result)
        }


        setsortedByDays(!sortedByDays)
    }

    function getDifferenceInDays(date1, date2) {
        const diffInMs = Math.abs(date2 - date1);
        return diffInMs / (1000 * 60 * 60 * 24);
    }

    function handlePagination(event){
        let clickedPage = Number(event.target.textContent) 
        setPage(clickedPage)
    }

    return (<>
        <Header jobsNumber={jobs.length}/>
        <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginTop: '2em', maxWidth: 400, margin: '1em auto 0em auto'}}>
            <Button sx={{width: '14em', marginBottom: '1em', fontSize: '0.8em'}} onClick={orderByCompanyName} variant={sortedByCompanyName ? 'contained' : 'outlined'}>Order by company Name</Button>
            <Button sx={{width: '14em', marginBottom: '1em', fontSize: '0.8em'}} onClick={orderBySevenDays} variant={sortedByDays ? 'contained' : 'outlined'}>Published in the last 7 days</Button>
        </Box>

        <List sx={{ width: '100%', maxWidth: 400, margin: 'auto', marginBottom: '1em'}}>
            {allJobs.map((job, index)=>{
                if(page === 1){
                    if(index > 9) return
                }else{
                    if(index < 9) return
                }

                let color = ''
                let newTxt = ''
                if(Number(job.postedDate.split('d')[0]) < 7){
                    color = '#28a745'
                    newTxt = 'New '
                }


                return(
                    <ListItem alignItems="flex-start" sx={{border: '1px solid #d8dee2', borderRadius: '0.5em', marginBottom: '1em'}}>
                         <ListItemText >
                                <Box sx={{fontWeight: 'bold', fontSize: '1.2em', marginBottom: '0.6em'}}>{job.jobTitle}</Box>
                                <Box sx={{color: '#333', fontSize: '1em', marginBottom: '0.6em'}}>{job.companyName}</Box>
                                <Box sx={{color:'#6c757d', fontSize: '0.95em', marginBottom: '0.6em'}}>{job.jobDescription.replace(/<[^>]+>/g, '').slice(0, 250).concat('...')}</Box>
                                <Box sx={{color, fontSize: '0.9em', marginBottom: '0.6em'}}>{newTxt + job.postedDate}</Box>
                         </ListItemText>
                    </ListItem>
                    
                )
            })}

            <Box sx={{display: 'grid', placeItems: 'center'}}>
                <Pagination onClick={(event)=>{handlePagination(event)}} count={2} variant="outlined" shape="rounded" />
            </Box>
        </List>
    </>)
}

// server side rendering
export async function getServerSideProps(){
    let payload = {
        "companySkills": true,
        "dismissedListingHashes": [],
        "fetchJobDesc": true,
        "jobTitle": "Business Analyst",
        "locations": [],
        "numJobs": 20,
        "previousListingHashes": []
    }

    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload),
    }
    const req = await fetch('https://www.zippia.com/api/jobs/', options)
    const data = await req.json()

    return {
        props: {jobs: data.jobs}
    }
}