import express, { Request, Response, NextFunction } from 'express';
const axios = require('axios').default;

const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Timezones by location application is running on port ${port}.`);
});

  interface LocationWithTimezone {
    location: string;
    timezoneName: string;
    timezoneAbbr: string;
    utcOffset: any; //Why is this interface only for return data? , how to add dynamicdata sets
  };

  interface postLoginreqresIN {
    token: string;
  };

  interface User {
    name: string
    age: string
  }

  // not working interface...
  interface loginResult {
    token: string
  }

  //how to define below functio as constant
  //function  getLocationsWithTimezones (request: Request, response: Response, next: NextFunction) {
  const getLocationsWithTimezones = (request: Request, response: Response, next: NextFunction) => {
    let varb = 'test';
    let locations: LocationWithTimezone[] = [
      {
        location: 'Germany',
        timezoneName: 'Central European Time',
        timezoneAbbr: 'CET',
        utcOffset: varb
      },
      {
        location: 'China',
        timezoneName: 'China Standard Time',
        timezoneAbbr: 'CST',
        utcOffset: 8
      },
      {
        location: 'Argentina',
        timezoneName: 'Argentina Time',
        timezoneAbbr: 'ART',
        utcOffset: -3
      },
      {
        location: 'Japan',
        timezoneName: 'Japan Standard Time',
        timezoneAbbr: 'JST',
        utcOffset: 9
      }
    ];
  
    response.status(200).json(locations);
  };
  // how define return type for this function? and inteface
  async function getUsers(request: Request, response: Response, next: NextFunction)/*: Promise<User[]>*/ {
    let resp: loginResult = await axios.post('https://reqres.in/api/login', {
      email: 'eve.holt@reqres.in',
      password: 'cityslicka'
    })
    .then(function (response) {// what is this warning?
      console.log(response.data.token);
      return response.data;
    })
    .catch(function (error) {
      console.log(error.response.data);
      return error.response.data;
    });
    return response.status(200).json(resp);
  }
  try {
  app.get('/timezones', getLocationsWithTimezones);
  app.post('/login', getUsers);
  }
  catch (e) {
    //give wrong host URL but this is not coming to cacthc blcok
    console.log("Failed request.", e);
  }