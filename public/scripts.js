const baseUrl = 'https://calendarific.com/api/v2/';

// prev const key = 'bb3fdb0db093abb333c1fac7ac8d11449da7124e';

const key = '521152d012dab37431bb6614b20ec47d12fb3cbd';

let url;

const countryDropdown = document.getElementById("countryDropdown");
const searchForm = document.querySelector('form');
const dateBody = document.getElementById("main");
searchForm.addEventListener('submit', fetchHolidays);



preFetch();

// FETCHES
function preFetch(){

    url = baseUrl + "countries" + "?api_key=" + key;
    
    fetch(url)
    .then(function(result){
        return result.json();
    }).then(function(json) {
        populateCountries(json);
    });
}

function fetchHolidays(e){
    e.preventDefault();
    
    // https://calendarific.com/api/v2/holidays?&api_key=bb3fdb0db093abb333c1fac7ac8d11449da7124e&country=AD&year=2020
    
        // get today's date
        let date = new Date();

        let todayDay = new Date().getDay();
        let todayMonth = new Date().getMonth() + 1;
        console.log(date);


    let year = new Date().getFullYear();

    let countryCode = document.getElementById('countryDropdown').value;
    url = baseUrl + "holidays" + "?&api_key=" + key + "&country=" + countryCode + "&year=" + year;

    fetch(url)
    .then(function(result){
        return result.json();
    }).then(function(json) {
        displayHolidayData(json);
    });
}

// ACTIONS
function populateCountries(json){

    let countries = json.response.countries;
        
    for(let country of countries){
        let cName = country.country_name;
        let cHolidays = country.total_holidays;
        let iso = country["iso-3166"];
        let cOpt = document.createElement('option');
        cOpt.value = iso;
        cOpt.innerText = cName + " | " + cHolidays;
        countryDropdown.appendChild(cOpt);
    }
}

function displayHolidayData(json){
    while(dateBody.firstChild){
        dateBody.removeChild(dateBody.firstChild);
    }
    // Today's month and day
    let todaysDay = new Date().getDate();
    let todaysMonth = new Date().getMonth() + 1;
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    // Array of holidays:
    let holidays = json.response.holidays;

    let futureHolidayArray = [];
    let pastHolidayArray = [];
    let todayHoliday = [];

    for(day of holidays){
        let d = day.date.datetime;
        if(d.month < todaysMonth){                                      // All past holidays before today's month
            pastHolidayArray.push(day);
        }else if(d.month == todaysMonth){
            if(d.day < todaysDay && d.month == todaysMonth){            // All previous holidays this month before today
                pastHolidayArray.push(day);
            }else if(d.month == todaysMonth && d.day > todaysDay){      // Today's month, future holidays
                futureHolidayArray.push(day);
            }else{
                todayHoliday = day;
            }
        }else{
            futureHolidayArray.push(day);
        }
    }

    // populate the holidays
    let prevHoliday = pastHolidayArray.pop();
    let [nextHoliday] = futureHolidayArray;

    if(todayHoliday != ""){
        let main = document.getElementById("main");
        let cardP = document.createElement('div');
        let cardBodyP = document.createElement('div');
        let headP = document.createElement('h5');
        let cardTextP = document.createElement('p');

        let cardT = document.createElement('div');
        let cardBodyT = document.createElement('div');
        let headT = document.createElement('h5');
        let cardTextT = document.createElement('p');
        
        let cardN = document.createElement('div');
        let cardBodyN = document.createElement('div');
        let headN = document.createElement('h5');
        let cardTextN = document.createElement('p');

        cardP.classList.add("card");
        cardBodyP.classList = "card-body";
        headP.classList = "card-title";
        cardTextP.classList = "card-text";

        cardT.classList = "card";
        cardBodyT.classList = "card-body";
        headT.classList = "card-title";
        cardTextT.classList = "card-text", "test";

        cardN.classList = "card";
        cardBodyN.classList = "card-body";
        headN.classList = "card-title";
        cardTextN.classList = "card-text";

        headP.textContent = "Previous Holiday:";
        headT.textContent = "Today:";
        headN.textContent = "Next Holiday:";

        cardTextP.innerHTML = `<p>${months[prevHoliday.date.datetime.month - 1]} ${prevHoliday.date.datetime.day}<p>${prevHoliday.name}</p><p>${prevHoliday.description}`;
        cardTextT.innerHTML = `<p>${months[todayHoliday.date.datetime.month - 1]} ${todayHoliday.date.datetime.day}</p><p>${todayHoliday.name}</p><p>${todayHoliday.description}`;
        cardTextN.innerHTML = `<p>${months[nextHoliday.date.datetime.month - 1]} ${nextHoliday.date.datetime.day}<p>${nextHoliday.name}</p><p>${nextHoliday.description}`;

        main.appendChild(cardP);
        cardP.appendChild(cardBodyP);
        cardBodyP.appendChild(headP);
        cardBodyP.appendChild(cardTextP);

        main.appendChild(cardT);
        cardT.appendChild(cardBodyT);
        cardBodyT.appendChild(headT);
        cardBodyT.appendChild(cardTextT);

        main.appendChild(cardN);
        cardN.appendChild(cardBodyN);
        cardBodyN.appendChild(headN);
        cardBodyN.appendChild(cardTextN);
        
    }else{
        let main = document.getElementById("main");
        let cardP = document.createElement('div');
        let cardBodyP = document.createElement('div');
        let headP = document.createElement('h5');
        let cardTextP = document.createElement('p');

        let cardT = document.createElement('div');
        let cardBodyT = document.createElement('div');
        let headT = document.createElement('h5');
        let cardTextT = document.createElement('p');
        
        let cardN = document.createElement('div');
        let cardBodyN = document.createElement('div');
        let headN = document.createElement('h5');
        let cardTextN = document.createElement('p');

        cardP.classList.add("card");
        cardBodyP.classList = "card-body";
        headP.classList = "card-title";
        cardTextP.classList = "card-text";

        cardT.classList = "card";
        cardBodyT.classList = "card-body";
        headT.classList = "card-title";
        cardTextT.classList = "card-text";

        cardN.classList = "card";
        cardBodyN.classList = "card-body";
        headN.classList = "card-title";
        cardTextN.classList = "card-text";

        headP.textContent = "Previous Holiday:";
        headT.textContent = "Today:";
        headN.textContent = "Next Holiday:";

        cardTextP.innerHTML = `<p>${months[prevHoliday.date.datetime.month - 1]} ${prevHoliday.date.datetime.day}<p>${prevHoliday.name}</p><p>${prevHoliday.description}`;
        cardTextT.innerHTML = `<p>${months[todaysMonth - 1]} ${todaysDay}</p><p>No holidays today!</p>`;
        cardTextN.innerHTML = `<p>${months[nextHoliday.date.datetime.month - 1]} ${nextHoliday.date.datetime.day}<p>${nextHoliday.name}</p><p>${nextHoliday.description}`;

        main.appendChild(cardP);
        cardP.appendChild(cardBodyP);
        cardBodyP.appendChild(headP);
        cardBodyP.appendChild(cardTextP);

        main.appendChild(cardT);
        cardT.appendChild(cardBodyT);
        cardBodyT.appendChild(headT);
        cardBodyT.appendChild(cardTextT);

        main.appendChild(cardN);
        cardN.appendChild(cardBodyN);
        cardBodyN.appendChild(headN);
        cardBodyN.appendChild(cardTextN);
    }
}