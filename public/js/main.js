const submitBtn = document.getElementById("submitBtn");
const cityName = document.getElementById("cityName");
const city_name = document.getElementById("city_name");

const temp = document.getElementById("temp");
const temp_status = document.getElementById("temp_status");

const datahide = document.querySelector('.middle_layer')

const getInfo = async (event) => {
    event.preventDefault()
    const cityVal = cityName.value;
    if (cityVal === "") {
        city_name.innerText = "Please Enter a Valid cityName"
        datahide.classList.add("data_hide")
    } else {
        try {
            const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&appid=9c97c6b217ae25662a3a8b669e117fb5&units=metric`)
            const data = await res.json();

            const arrData = [data]

            temp.innerHTML = `<p>${arrData[0].main.temp}<sup>o </sup> C </p>`
            // temp_status.innerText = arrData[0].weather[0].main;

            city_name.innerText = arrData[0].name+","+arrData[0].sys.country;

            const tempMood = arrData[0].weather[0].main;
            if(tempMood == "Clear"){
                temp_status.innerHTML =`<i class="fa-solid fa-sun" style='color: #eccc68'></i>`
            }else if(tempMood == "Clouds"){
                temp_status.innerHTML =` <i class="fa-solid fa-cloud" style='color: #f1f2f6'></i>`
            }else if(tempMood === "Rain"){
                temp_status.innerHTML =` <i class="fa-solid fa-cloud-rain" style='color:#a4b0be' ></i>`
            }else{
                temp_status.innerHTML =` <i class="fa-solid fa-cloud" style='color: #f1f2f6'></i>`
            }

            datahide.classList.remove("data_hide")
        } catch (error) {
            city_name.innerText = "Please Enter a valid cityName"
            datahide.classList.add("data_hide")
        }
    }
}

submitBtn.addEventListener("click",getInfo);