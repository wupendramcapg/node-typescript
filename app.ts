import express, { Request, Response, NextFunction }  from 'express';
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
    country?: any; //Can be recieved or not.
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
    data?: any;
    status?: number;
    token: string
  }

class errorUser {
  error: string
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
        utcOffset: varb,
        country: 'IND'
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
//(req, resp, next)


/* const getUsers1 = (request: Request, response: Response, next: NextFunction) :loginResult => {
  let resp  = {token: 'hsy6s'};
  return resp;
}

function getUsers(request: Request, response: Response, next: NextFunction) :loginResult {
  let resp  = {token: 'hsy6s'};
  return resp;
} */

  async function getUsers_old(request: Request, response: Response, next: NextFunction): Promise<Response> {
    let resp: loginResult = await axios.post('https://reqres.in/api/login', {
      email: 'eve.holt@reqres.in',// get these from req of postaman
      passwords: 'cityslicka'
    })
    .then(function (response: any) {// what is this warning?
      console.log(response.data.token);
      //let = getUsers();
      //return 2;
      return response;
    })
    .catch(function (error: any) {
      console.log(error.response.data);
      error.response.data = error.response.data.error + " Custom";
      error.response.status = 400;
      return error.response;
    });


    console.log(resp);
    return response.status(resp.status).json(resp.data);
    //return resp;
  }
 
  try {
    app.use(function (err, req, res, next) {
      console.error(err.stack)
      res.status(500).send('Something broke!')
    })
    app.get('/timezones', getLocationsWithTimezones);
    app.post('/login', getUsers_old);
    
  }
  catch (e) {
    //give wrong host URL but this is not coming to cacthc blcok
    console.log("Failed request.", e);
  }