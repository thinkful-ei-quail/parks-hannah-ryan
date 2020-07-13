/* eslint-disable strict */
'use strict';

// Get api key and base url
const apiKey = 'bPLplRxvm40eofqCHeEz2KRCLJAlz8KH2UzAGT6f';
const searchUrl = 'https://developer.nps.gov/api/v1/parks';

// display a list of national parks in an area
// reference url structure:
// https://developer.nps.gov/api/v1/parks?stateCode=CO&limit=10&api_key=bPLplRxvm40eofqCHeEz2KRCLJAlz8KH2UzAGT6f

// https://developer.nps.gov/api/v1/parks?key=bPLplRxvm40eofqCHeEz2KRCLJAlz8KH2UzAGT6f&q=CO&maxResults=10

function getParks (state, limit=10) {
  const params = {
    stateCode: state,
    limit,
    api_key: apiKey
  };
  const queryString = formatQueryParams(params);

  const url = searchUrl + '?' + queryString;
  

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      console.log(err.message);
    });

}

function formatQueryParams (params) {
  // takes in the user input and spits out the url
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
  return queryItems.join('&');
}

function displayResults(responseJson){
  // display results
  $('.display').empty();
  console.log(responseJson);

  for (let i = 0; i < responseJson.data.length; i++){
    // fullName
    // description
    // url
    $('.display').append(`
    <li>
    <h3>${responseJson.data[i].fullName}</h3>


    <p>${responseJson.data[i].description}</p>

    <a href="${responseJson.data[i].url}">Click here for more information</a>

    <address>
    ${responseJson.data[i].addresses[1].line1} <br>
    ${responseJson.data[i].addresses[1].city}, ${responseJson.data[i].addresses[1].stateCode} <br>
    ${responseJson.data[i].addresses[1].postalCode} <br>
    
    </address>
    </li>
    <br>
    `);   
  }

}

function watchForm () {
  $('form').submit(event => {
    event.preventDefault();
    const searchState = $('#js-search-state').val();
    const limit = $('#js-limit').val();
    getParks(searchState, limit);

  });
}

$(watchForm);