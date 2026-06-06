let api_key = "a85e06d2a31c43d9bc4135230263005"
let base_url = "https://api.weatherapi.com/v1/current.json?key=" + api_key

fetch(base_url + "&q=london").then(res=>res.json()).then(console.log)

