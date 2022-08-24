import * as React from 'react';
import List from '@mui/material/List';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box'
import Pagination from '@mui/material/Pagination';
import Header from '../../components/Header'
import JobListItem from  '../../components/JobListItem'

interface Job {
    jobTitle: string,
    companyName: string,
    jobDescription: string,
    postedDate: string,
    postingDate: string
}

interface jobProps {
    jobs: Job[]
}

export default function Jobs(props : jobProps){
    const [allJobs, setAllJobs] = React.useState(props.jobs); //this state have the copy of the jobs array to mutate and keep the orinal array if the sort is turned off
    const [sortedByCompanyName, setSortedByCompanyName] = React.useState(false); // this state indicate if sort by company name is turned on or off
    const [sortedByDays, setsortedByDays] = React.useState(false); // this state indicate if sort by published in the last 7 days is turned on or off
    const [page, setPage] = React.useState(1); // this state will indicate in wich page is loaded

    function orderByCompanyName(){
        // this function will sort all the jobs by the company name in ascending order

        if(sortedByCompanyName){// the list will come back to the original state, if the "setsortedByDays" is true, using the origin jobs prop
            setAllJobs(props.jobs)
        } else{
            // the reason of the jobs copy is:
            // React rerenders the component when props or state changed. 
            // But setAllJobs doesn't consider sorted as a new array because it was mutated so the reference was not changed. 
            // For React it is still the same array you passed at first time. You need to return new array and then pass it to setAllJobs.

            const jobsCopy = [...allJobs]
            const sortedJobs = jobsCopy.sort((a, b) => (a.companyName > b.companyName ? 1 : -1))
            setAllJobs(sortedJobs)
        }

        // seting the sorted state to know if the sort is turned on or off
        setSortedByCompanyName(!sortedByCompanyName)
    }

    function orderBySevenDays(){
        // this function will display only the jobs published in the last 7 days
        if(sortedByDays){
            setAllJobs(props.jobs)
        }else{
            //i made the variable copy, for the same reason inside the function "orderByCompanyName"
            const jobsCopy = [...allJobs]
            const result = jobsCopy.filter(job => {
                // i know that exists a variable inside the job object called: postedDate, and i could just use split to know the job was published in the last 7 days
                // but i really wanted to show how i could resolve that problem if the postedDate does not existed.

                const today = new Date() //getting the date of today
                const jobDate = new Date(job.postingDate) //converting postingDate to a js date object
                const daysDifference = getDifferenceInDays(today, jobDate) //this function will calculate in how many days the job was published
    
                if(daysDifference < 7) return job //returning obly the jobs published in the last 7 days
            });
    
            setAllJobs(result) //updating the context to rerender html
        }


        setsortedByDays(!sortedByDays) // setting the sorted state to know if the sort is turned on or off
    }

    function getDifferenceInDays(today: Date, jobDate: Date) {
        // this function will calculate the difference in ms between the today and the job published day
        const diffInMs = Math.abs(today.getTime() - jobDate.getTime() );

        // and will convert the result to days
        return diffInMs / (1000 * 60 * 60 * 24);
    }

    function handlePagination(event: any){
        // this function will get the pagination of the clicked element and update the "page" state
        let clickedPage = Number(event.target.textContent) 
        setPage(clickedPage)
    }

    // returning the html of the list of jobs
    return (<>
        <Header jobsNumber={props.jobs.length}/>
        <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginTop: '2em', maxWidth: 400, margin: '1em auto 0em auto'}}>
            {/* when sort is turned on, the button will be contained, and if is off the button will be outlined */}
            {/* the button will now if the sort is turned on or off with the states: "sortedByDays" or "sortedByCompanyName" */}
            <Button sx={{width: '14em', marginBottom: '1em', fontSize: '0.8em'}} onClick={orderByCompanyName} variant={sortedByCompanyName ? 'contained' : 'outlined'}>Order by company Name</Button>
            <Button sx={{width: '14em', marginBottom: '1em', fontSize: '0.8em'}} onClick={orderBySevenDays} variant={sortedByDays ? 'contained' : 'outlined'}>Published in the last 7 days</Button>
        </Box>

        <List sx={{ width: '100%', maxWidth: 400, margin: 'auto', marginBottom: '1em'}}>
            {/* this will take the state: "allJobs" and populate the list with the component JobListItem */}
            {allJobs.map((job, index)=>{
                // checking in wich page the state is 
                // if the page is one, will only show the first 10 jobs
                // if the page is two, will only show the remaining jobs
                if(page === 1){
                    if(index > 9) return
                }else{
                    if(index < 9) return
                }

                // i checked the zippia site, and saw the days text change to green if the job was published in the last 7 days
                // so i made the same thing
                let color = ''
                let newTxt = ''
                if(Number(job.postedDate.split('d')[0]) < 7){
                    color = '#28a745'
                    newTxt = 'New '
                }

                // populating the list
                return <JobListItem key={index} index={index} job={job} color={color} newTxt={newTxt} />
            })}

            {/* pagination buttom, if the page is 1 will only show the first 10 */}
            {/* pagination buttom, if the page is 2 will only show the remaining jobs */}
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