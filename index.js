const activeCases = document.getElementById('activeCases');
const newCases = document.getElementById('newCases');
const recoveredCases = document.getElementById('recoveredCases');
const totalCases = document.getElementById('totalCases');
const totalDeath = document.getElementById('totalDeath');
const totalTests = document.getElementById('totalTests');

function changeData (formOne, formTwo, formThree, formFour, formFive, formSix) {
    activeCases.innerHTML = formOne
    newCases.innerHTML = formTwo
    recoveredCases.innerHTML = formThree
    totalCases.innerHTML = formFour
    totalDeath.innerHTML = formFive
    totalTests.innerHTML = formSix
}

//function get covid data from map countries with API
function getCovidData(getCountry) {
    fetch(`https://covid-193.p.rapidapi.com/statistics?country=${getCountry}`, {
        "method": "GET",
        "headers": {
            "X-RapidAPI-Key": `<API_KEY>`,
            "X-RapidAPI-Host": "covid-193.p.rapidapi.com"
        }
    })
   .then(
        response => response.json()
    )
   .then(data => {
        console.log(data);
        let activeCases = Number(data.response[0].cases.active);
        let newCases = Number(data.response[0].cases.new);
        let recoveredCases = Number(data.response[0].cases.recovered);
        let totalCases = Number(data.response[0].cases.total);
        let totalDeath = Number(data.response[0].deaths.total);
        let totalTests = Number(data.response[0].tests.total);
        changeData(activeCases, newCases, recoveredCases, totalCases, totalDeath, totalTests);
    })
   .catch(err => {
        console.error(alert('Country not found!'));
    });
}

document.getElementById('getData').addEventListener('click', function (event) {
    event.preventDefault();
    // get country name from input search
    let searchCountry = document.getElementById('searchCountry').value;
    // send data to server
    getCovidData(searchCountry);
});