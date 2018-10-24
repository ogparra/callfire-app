require('dotenv').config();

console.log("Login: " + process.env.login);
console.log("Password: " + process.env.password);

// The header that the user sends looks like this:
// This is used to authenticate to the Callfire API
// Authorization: Basic login:password
const login = process.env.login;
const password = process.env.password;

const CallfireClient = require('callfire-api-client-js');
const client = new CallfireClient(login, password);


client.ready(() => {
    client.texts.sendTexts({
      // default message for recipients w/o TextRecipient.message field
      defaultMessage: 'Hello, this is the default message that all text recipients' +
                      ' will recieve',
      body: [
        {
          phoneNumber: '13109560176',
          attributes: {
            custom_external_id: 30005044,
            custom_name: 'Oscar'
          },
          message: 'Hello, ${custom_name}!'
        },
      ]
    })
      .then((response) => {
        console.log(response.obj);
      })
      .catch((err) => {
        console.log('request error ' + err.data);
      });
  },
  (clientError) => {
    console.log('client error ' + clientError);
  }
);





