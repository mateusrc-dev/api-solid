# App created on the NodeJs trail

### This back-end application created in NodeJs consists of a gym application in which the user can create an account, authenticate, check-in to the nearby gym, search for nearby gyms or by name

### To create the user's proximity features to the gym, we create calculations using the user's location (latitude and longitude) and the gym's location (latitude and longitude) which is stored in the database

### There is also the possibility for an admin account to create a gym

### In this application we define the software design (functional requirements, business rules, non-functional requirements), as seen below:

# RFs (Functional requirements) - what the user will be able to do

- It must be possible to register;
- It must be possible to authenticate;
- It must be possible to obtain the profile of a logged in user;
- It must be possible to obtain the number of check-ins carried out by the logged in user;
- It must be possible for the user to obtain their check-in history;
- It must be possible for the user to search for nearby gyms (up to 10km);
- It must be possible for the user to search for gyms by name;
- It must be possible for the user to check-in at a gym;
- It must be possible to validate a user's check-in;
- It must be possible to register a gym;

# RNs (Business Rules) - conditions for functional requirements - if... then...

- The user must not be able to register with a duplicate email;
- The user cannot make 2 check-ins on the same day;
- The user cannot check in if they are not close (100m) to the gym;
- Check-in can only be validated up to 20 minutes after it is created;
- Check-in can only be validated by administrators;
- The gym can only be registered by administrators;

## RNFs (Non-Functional Requirements) - more technical requirements - end customer has no control

- The user's password must be encrypted;
- Application data must be persisted in a PostgreSQL database;
- All data lists must be paginated with 20 items per page;
- The user must be identified by a JWT (JSON Web Token);

### To create all these features we used some libs that were essential:

- fastify/cookie -> we will use a cookie to identify the user who is creating a diet
- dotenv -> let's use dotenv to read the .env file inside NodeJs
- fastify -> similar to express → brings traditional part used in building an API (dealing with routes, parameters, headers, responses in JSON, understands requests in JSON)
- zod -> to validate data as application environment variables, data sent as parameters in routes
- bcryptjs -> lib to create user password encryption
- dayjs -> lib to handle dates
- vitest/coverage-c8 -> shows how much of the repository files have been tested - shows how much the tests are covering the application's functionalities
- prism -> ORM to deal with the database - make queries
- supertest -> to create tests for the application’s features

### If you want to test the application on your machine, download the repository and run the command in the repository terminal: 'npm run dev'
### If you want to test the routes, use insomnia when the application is running (note which port it is running on)



    

