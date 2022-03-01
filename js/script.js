// Common Global Variable
const searchField = document.getElementById('search-field')
const searchResults = document.getElementById('search-results')
const phoneDetails = document.getElementById('phone-details')
document.getElementById('no-result').style.display = 'none'
document.getElementById('spinner').style.display = 'none'

// For Search All Phone 
const searchPhone = () => {
    const searchText = searchField.value;
    console.log(searchText);
    searchField.value = '' //remove search field value

    // check the input field is null
    if (searchText == '') {
        searchResults.textContent = ''
        document.getElementById('no-result').style.display = 'none'
        document.getElementById('no-input').style.display = 'block'
        document.getElementById('phone-details').innerHTML = ""

    } else {
        // if the input field is not null then check the url with searchText 
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
        //fetch url
        fetch(url)
            .then(res => res.json())
            .then(data => displayPhoneResult(data.data.slice(0, 20))) //show 20 result
        console.log(url);
        document.getElementById('spinner').style.display = 'block'
        document.getElementById('search-results').innerHTML = ''
    }
}
//  display all phone 
const displayPhoneResult = (phones) => {
    // check the searching value have or not 
    if (phones.length == 0) {
        document.getElementById('no-result').style.display = 'block'
        document.getElementById('no-input').style.display = 'none'
        document.getElementById('spinner').style.display = 'none'
    }
    // display phone 
    phones.forEach(phone => {
        console.log(phone);
        document.getElementById('no-result').style.display = 'none'
        document.getElementById('spinner').style.display = 'none'
        document.getElementById('no-input').style.display = 'none'
        // set all phone information 
        const div = document.createElement('div')
        div.innerHTML = `
                <div class="col">
                  <div class="card p-3 shadow">
                    <img src="${phone.image}" class="card-img-top" alt="...">
                    <div class="card-body align-center">
                      <h5 class="card-title  text-center">${phone.phone_name}</h5>
                      <h5 class="card-info text-center">${phone.brand}</h5>
                      <button onclick="loadDetails('${phone.slug}')" class="btn btn-success d-flex justify-content-center text-center mx-auto">Details</button>
                      
                      </div>
                  </div>
                </div>
                `
        searchResults.appendChild(div)

    })

    document.getElementById('phone-details').innerHTML = ''
}

// load single phone id 
const loadDetails = (id) => {
    console.log(id);
    // fetch phone id data 
    fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
        .then(res => res.json())
        .then(data => displayPhone(data.data))
    document.getElementById('phone-details').innerHTML = ''
}

// display single phone details 
const displayPhone = singlePhone => {
    console.log(singlePhone);
    // check the realease date property 
    if (singlePhone.releaseDate == "") {
        singlePhone.releaseDate = "No Release Date Found";
    }
    // check the others property 
    if (singlePhone.others != undefined) {

    }
    else {
        // set others property 
        others = new Object();

        others.Bluetooth = "Not Found",
            others.GPS = "Not Found",
            others.NFC = "Not Found",
            others.Radio = "Not Found",
            others.USB = "Not Found",
            others.WLAN = "Not Found"

        singlePhone.others = others;
    }
    // check the undefine property 
    if (singlePhone.mainFeatures.chipSet == undefined) {
        singlePhone.mainFeatures.chipSet = "Not Found"
    }
    if (singlePhone.mainFeatures.memory == undefined) {
        singlePhone.mainFeatures.memory = "Not Found"
    }

    // set single all details 
    const div = document.createElement('div')
    div.innerHTML = `
                <div class=" d-flex justify-content-center">
                  <div class="card p-3 g-4 shadow" style="width: 30rem;">
                  <img src="${singlePhone.image}" class="card-img-top w-100 " alt="..."> 
                  
                  
                    <div class="card-body align-center">
                      <p class="card-title  text-center"><strong>Model:</strong> ${singlePhone.name}</p>
                      
                      <p class="card-info text-center"> <strong>Release Date:</strong>
                      ${singlePhone.releaseDate}</p>  

                      <h5 class='text-center'>Main Features: </h5> 
                      <p class="card-info text-center"><strong>ChipSet:</strong> ${singlePhone.mainFeatures.chipSet}</p>
                      <p class="card-info text-center"><strong>Memory:</strong> ${singlePhone.mainFeatures.memory}</p>
                      <p class="card-info text-center"><strong>Storage:</strong> ${singlePhone.mainFeatures.storage}</p>
                      <p class="card-info text-center"><strong>Display Size:</strong> ${singlePhone.mainFeatures.displaySize}</p>

                      <h5 class='text-center'>Sensors: </h5> 
                      <p class="card-info text-center">${singlePhone.mainFeatures.sensors}</p>

                      <h5 class='text-center'>Other: </h5><strong>
                      <p class="card-info text-center"> Blootooth: </strong>${singlePhone.others.Bluetooth},<strong> GPS:</strong> ${singlePhone.others.GPS},<strong> NFC:</strong> ${singlePhone.others.NFC},<strong> Radio: </strong>${singlePhone.others.Radio},<strong> USB:</strong> ${singlePhone.others.USB},<strong> WLAN:</strong> ${singlePhone.others.WLAN}</p>
                      
                        
                      </div>
                  </div>
                
                </div>
                `
    phoneDetails.appendChild(div)
}