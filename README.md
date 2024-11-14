[Deployment](https://131-insight.vercel.app/)

## How to use and build on Insight

First, create your own branch:
```bash
git checkout -b {name}
```
First, run the development server:

```bash
npm install

npm run dev
```

Create a .env file with your mongo db user
```bash
MONGODB_URI='mongodb+srv://{user}:{pass}.mongodb.net/?retryWrites=true&w=majority&appName=TA-Data';
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Structure
Structure of app can be seen in app/page.tsx and u can look at layout for style things like fonts.
We have a ui folder which holds components that we reuse for consistency. withing components folder,
we have our actual pages defined in structure of page name as the folder, and the actual code named page.tsx
within it. KEEP THIS STYLE.

![arch](https://github.com/AnanthSankaralingam/131-Insight/blob/main/Screenshot%202024-11-07%20164701.png)

## TODOs
### urgent
1. finalize db for prod, storing data over time instead of individual entries. for example, entries should 
be linked by some unique identifier so that we can see how they change over time.
2. create visualizations based on the db data. start with POC static graphs but its only important to get time vs X and topic vs X right now. 
3. slack integration - written feedback should be sent to slack too.

### non urgent
1. auth - TAs should have an account. for now, they just add their name in the form or anonymous.
2. expanded metrics and values for data points.

### super non urgent
1. AI enhancement of data
2. filtering for graphs.
