import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box'

interface Job {
    jobTitle: string,
    companyName: string,
    jobDescription: string,
    postedDate: string
}

interface Props {
    index: number,
    job: Job,
    color: string,
    newTxt: string
}

// i made the list item in new file, so the code looks clear and eaiser for maintenance

function JobsListItem (props : Props){
    const color: string = props.color
    return (
        <ListItem key={props.index} alignItems="flex-start" sx={{border: '1px solid #d8dee2', borderRadius: '0.5em', marginBottom: '1em'}}>
            <ListItemText >
                <Box sx={{fontWeight: 'bold', fontSize: '1.2em', marginBottom: '0.6em'}}>{props.job.jobTitle}</Box>
                <Box sx={{color: '#333', fontSize: '1em', marginBottom: '0.6em'}}>{props.job.companyName}</Box>
                <Box sx={{color:'#6c757d', fontSize: '0.95em', marginBottom: '0.6em'}}>{props.job.jobDescription.replace(/<[^>]+>/g, '').slice(0, 250).concat('...')}</Box>
                <Box sx={{fontSize: '0.9em', marginBottom: '0.6em', color: {color}}}>{props.newTxt + props.job.postedDate}</Box>
            </ListItemText>
        </ListItem>
    )
}

export default JobsListItem