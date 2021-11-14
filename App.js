window.addEventListener("load", () => {
    let long;
    let lat;

    let tempretureDegree = document.querySelector('.tempreture-degree');
    let tempretureLocation = document.querySelector('.tempreture-location');
    let tempretureDescription = document.querySelector('.tempreture-description');

    let death = document.querySelector('.death-count');
    let recovered = document.querySelector('.recovered-count');
    let date = document.querySelector('.date-updated');

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=45028a535ec41a756e2d679a2331062b`;

            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    const {temp} = data.main;
                    const {name} = data;
                    const {description} = data.weather[0];

                    // set dom elements from the api

                    tempretureDegree.textContent = Math.floor(parseInt(temp)-273.15);
                    tempretureLocation.textContent = name;
                    tempretureDescription.textContent = description;
                });

                const api2 = `https://covid19.mathdro.id/api/countries/India`;
                fetch(api2)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);

                    const value1 = data.deaths.value;
                    death.textContent = value1;

                    const {value} = data.recovered;
                    recovered.textContent = value;

                    const {lastUpdate} = data;
                    date.textContent = lastUpdate.substring(0,10);
                });
        });
    }
});