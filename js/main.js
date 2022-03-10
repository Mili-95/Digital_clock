var clock = document.querySelector(".clockTime");
var timeMonths = document.querySelector(".timeMonths");
var timeDays = document.querySelector(".days");
var timezone = document.querySelector('.time-zone');
var filterMode = document.querySelector(" .filter");
var speakMode = document.querySelector(".speaker");

//weather api key
var API_KEY =`49cc8c821cd2aff9af04c9f98c36eb74`;


//api json part
getWeatherData()
function getWeatherData () {
    navigator.geolocation.getCurrentPosition((success) => {
        
        let {latitude, longitude } = success.coords;

        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`).then(res => res.json()).then(data => {

        console.log(data)
        showWeatherData(data);
        })

    })
}

//showing value through html
function showWeatherData (data){
    let {temp} = data.current;
    let {icon} = data.current.weather[0];
    timezone.innerText = data.timezone;

	document.querySelector(".icon").src = " http://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".temp").innerText = temp + "°c";
}

//days
var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

//months
var months = ["Jan", "Feb", "Mar", "Apr", "May", "June",
"July", "Aug", "Sept", "Oct", "Nov", "Dec"
];

//display currenttime
var currentTime = setInterval(function(){
	var date = new Date();
	// var hours = date.getHours();
	var hours = (12 - (date.getHours()));
	var minutes = date.getMinutes();
	var seconds = date.getSeconds();
	var ampm = (date.getHours()) < 12 ? 'AM' : 'PM';

    var todayDate = date.getDate();
    var day = date.getDay();
    var month = date.getMonth();


	//convert military time to standard time
    if (hours < 0) {
		hours = hours * -1;
	} else if (hours == 00) {
		hours = 12;
	} else {
		hours = hours;
	}
    
	clock.textContent = addZero(hours) + ":" + addZero(minutes) + ":" + addZero(seconds) + "" + ampm;
    timeMonths.textContent = (months[month]) + "/" + (todayDate);
    timeDays.textContent = (days[day]);
},1000);

function addZero(time){
    return (time < 10) ? "0" + time : time;

}

//color filter change
function filterChange(){
    document.documentElement.classList.toggle("dark");
}

//speak time
function speakTime(){
    //the SpeechSynthesisUtterance is a web speech api represent
    let utterance = new SpeechSynthesisUtterance(`${clock.innerText}`);
    speechSynthesis.speak(utterance);//speak method of speechSynthesis
}

//event listner
filterMode.addEventListener("click", filterChange);
speakMode.addEventListener("click", speakTime);