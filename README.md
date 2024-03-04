### Client information

## Getting IP and location details using 'IPdata' API

DOM and BOM are essentials of the JavaScript, operating them iss the purpose of 
creating the JS in the first place. When we are introduced to DOM&BOM we 
learn how versatile data and its control is available for us in regards to
the client information. Yet some of the obvious data is not there. I am talking
about the client's IP adress and the location data.

To many individuals, an IP address is simply a designation for a device connected to the internet. However, for developers creating applications, it holds significant value. Over time, vast amounts of data have been amassed regarding nearly every internet-connected device. By utilizing ipdata’s API, developers gain access to extensive location-based data, enriching user experiences.

Yet, obtaining an IP address is a prerequisite to leveraging ipdata's wealth of information. This article explores how to retrieve IP addresses using JavaScript, whether within a web browser or within a server-side application.


Consequently, you need to depend on a web service to furnish this information. You have the option to develop your own service integrated into your server-side application, or you can opt for a third-party solution to fetch your user's IP address. ipdata's web service serves as an ideal resolution for this issue. The only requirement is obtaining an API key [sign up for free](https://dashboard.ipdata.co/sign-up.html). <br>
For instance:

```javascript

function json(url) {
  return fetch(url).then(res => res.json());
}

let apiKey = 'your_api_key'; 
json(`https://api.ipdata.co?api-key=${apiKey}`).then(data => {
  console.log(data.ip);
  console.log(data.city);
  console.log(data.country_code);
});

```

Whenever we say ```.then()``` we must never forget ```.catch()```:

```javascript
function json(url) {
  return fetch(url)
  .then(res => res.json())
  .catch( () => {
    console.log(`ERROR: NO API reply recieved`);
  });
}

```
Now we have a feed back message in case of any API issues, which we can switch for any required action.

For more information on ```Promisses``` please see [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) web docs page.

Click [here](https://y-fedorenko.github.io/client-info/) to see my version of using an API to get client's IP and location data.<br>
The entire source code for this simple web page can be found [here](https://github.com/y-fedorenko/client-info/blob/main/src/scripts/script.js).