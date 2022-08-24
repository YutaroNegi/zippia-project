Goal:
Creating a simple web website to show some jobs from API.

Technologies:
Required: Node.js, React
Nice to have: Next.js, Server Side Rendering, TypeScript

Details:
* Create a website with Node.js, this website just needs one page, URL: /test/jobs/
* On this page, connect to an API service URL where you will get a json with a list of jobs https://www.zippia.com/api/jobs/ with following parameters:
POST https://www.zippia.com/api/jobs/
Request payload:
{
"companySkills": true,
"dismissedListingHashes": [],
"fetchJobDesc": true,
"jobTitle": "Business Analyst",
"locations": [],
"numJobs": 20,
"previousListingHashes": []
}

* List the first 10 jobs with cards, you should display the job title (jobTitle), the job company (companyName), and the job description (shortDesc).
* Add a button that will offer the jobs by company name.
* Add a button that will display only the jobs published in the last 7 days.
* Display the jobs as a list or as a carousel (slider).
* Try to add some styles to the elements of the jobs.
* Try to make it responsive (supports desktops, mobile phones and tablets).
* If possible, please do SSR (Server Side Rendering) for the first screen.
* Try to add as many comments as you could explaining your code.
* This should take no longer than 4 hours to do
* You have 48 hours (not include the weekends) to return your code to this email, doing as much as you can.
* Please deploy your code to https://vercel.com/, and then send the page URL to us.
* If you are busy and don't have enough time please contact me and we can postpone the test to another moment.
* If you have any questions feel free to ask.
* You can take as design reference: https://www.zippia.com/developer-jobs/jobs/

Send the document to crocha@zippia.com