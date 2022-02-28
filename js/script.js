const searchField = document.getElementById('search-field')
const searchResults = document.getElementById('search-results')
const phoneDetails = document.getElementById('phone-details')
document.getElementById('error-message').style.display = 'none'

const searchPhone = () => {

    const searchText = searchField.value;
    console.log(searchText);
    searchField.value = ''
    if (searchText == '') {
        // const display = document.getElementById('output').style.display = 'block'
        // const div = document.createElement('div')
        // div.innerHTML = `
        // <h3>Please Write something</h3>
        // `
        // display.appendChild(div)
        searchResults.textContent = ''
        document.getElementById('spinner').style.display = 'block'
    } else {
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
        fetch(url)
            .then(res => res.json())
            .then(data => displayPhoneResult(data.data))
        // .catch(error => displayError(error))
        console.log(url);
        document.getElementById('search-results').innerHTML = ''
    }
}
const displayError = error => {
    document.getElementById('error-message').style.display = 'block'
}
const displayPhoneResult = (phones) => {

    if (phones.length == 0) {
        alert('Not Found');
    }

    phones.forEach(phone => {
        console.log(phone);

        document.getElementById('spinner').style.display = 'none'

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


    document.getElementById('spinner').style.display = 'none'
}

const loadDetails = (id) => {
    console.log(id);
    fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
        .then(res => res.json())
        .then(data => displayPhone(data.data))
    document.getElementById('phone-details').innerHTML = ''
}

const displayPhone = singlePhone => {
    console.log(singlePhone);

    const div = document.createElement('div')
    div.innerHTML = `
                <div class=" d-flex justify-content-center">
                  <div class="card p-3 shadow"style="width: 18rem;">
                    <img src="${singlePhone.image}" class="card-img-top" alt="...">
                    <div class="card-body align-center">
                      <p class="card-title  text-center">Model: ${singlePhone.name}</p>
                      <p class="card-info text-center">ChipSet: ${singlePhone.mainFeatures.chipSet}</p>
                      <p class="card-info text-center">Memory: ${singlePhone.mainFeatures.memory}</p>
                      <p class="card-info text-center">Storage: ${singlePhone.mainFeatures.storage}</p>
                      <p class="card-info text-center">Display Size: ${singlePhone.mainFeatures.displaySize}</p>
                     
                      <p class="card-info text-center">Sensors: ${singlePhone.mainFeatures.sensors[0]},${singlePhone.mainFeatures.sensors[1]},${singlePhone.mainFeatures.sensors[2]},${singlePhone.mainFeatures.sensors[3]},${singlePhone.mainFeatures.sensors[4]},${singlePhone.mainFeatures.sensors[5]}</p>
                     
                      <p class="card-info text-center">Blootooth: ${singlePhone.others.Bluetooth}, GPS: ${singlePhone.others.GPS}, NFC: ${singlePhone.others.NFC}, Radio: ${singlePhone.others.Radio}, USB: ${singlePhone.others.USB}, WLAN: ${singlePhone.others.WLAN}</p>
                      
                      <p class="card-info text-center">Release Date: ${singlePhone.releaseDate}</p>
                      
                      </div>
                  </div>
                </div>
                `
    phoneDetails.appendChild(div)
}