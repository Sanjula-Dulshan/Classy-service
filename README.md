# Group-ID: SER005
## Project name: Classy Service
## Group Details

**Member Details :** 
| Name | Student ID | Username |
|--|--|--|
| Member 01 | IT20253530 | Sanjula Dulshan I.G. |
| Member 02 | IT20140120 | P.P. Yasantha Mihiran |
| Member 03 | IT20265892 | H.A.D.Lakshan |
| Member 04| IT20240042 | W.H. Dilsha Thathsarani |

## Project Description
Classy service is a portal which connect different types of service providers to the service seekers. It has variety of services. Service providers can easily register to the system and find their buyers. People who seek for a particular service are able to search and find the best service provider according to the reviews or price. They can purchase the service through the system. All purchase and service histories will be available on their profiles.

## Technologies
* [MongoDB](https://www.mongodb.com/) - MongoDB is a source-available cross-platform document-oriented database program. Classified as a NoSQL database program, MongoDB uses JSON-like documents with optional schemas. 
* [Express.js](https://expressjs.com/) - Express.js, or simply Express, is a back end web application framework for Node.js, released as free and open-source software under the MIT License. It is designed for building web applications and APIs. It has been called the de facto standard server framework for Node.js.
* [React.js](https://reactjs.org/) - React is a free and open-source front-end JavaScript library for building user interfaces based on UI components.
* [Node.js](https://nodejs.org/en/) - Node.js is an open-source, cross-platform, back-end JavaScript runtime environment that runs on the V8 engine and executes JavaScript code outside a web browser.



## How to get started with your app

### Prerequisites
1. Must have an Installed [Node.js](https://nodejs.org/en/) to your local machine
2. Must have a [MongoDB](https://www.mongodb.com/) Account
3. Must have a [Cloudanary](https://www.cloudimage.io/en/home) Account

### Procedure of setting up prerequisites and run the project

1. Clone the repo
   ```sh
   git clone https://github.com/Sanjula-Dulshan/Classy-service
   ```
3. Install NPM packages
   ```sh
     cd backend
     npm install
   ```
    ```sh
     cd frontend 
     npm install
   ```
4. Create `.env` file inside the backend folder and Enter Following Keys
   ```.env
      PORT = 8070
      MONGODB_URI = 
      
      CLOUD_NAME = 
      CLOUD_API_KEY = 
      CLOUD_API_SECRET = 
      
      ACTIVATION_TOKEN_SECRET = %Y/7jNMP;b_46Ja^L^^huX4:{Wax2WEbV?Ug6@$.Fuet)Qg4L7
      ACCESS_TOKEN_SECRET = %Y/7jNMP;b_46Ja^L^^huX4:{Wax2W
      REFRESH_TOKEN_SECRET = zDK:8wmFLU`tL>!.NLSh{GmGU`B%??)+M)cRP5q(Yw=P

 
   ```
 5. To Run the backend
      ```sh
        npm start
       ```
    
 6. To Run the frontend
      ```sh
        npm start
       ```
  
  Local Server Running on http://localhost:8070 <br/>
  Local Default Client Runnig on http://localhost:3000
