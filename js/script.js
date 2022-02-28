const searchPhone = () => {
    const searchField = document.getElementById('search-field')
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
        document.getElementById('spinner').style.display = 'block'
    } else {
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
        fetch(url)
            .then(res => res.json())
            .then(data => displayPhoneResult(data.data))
        // .catch(error => displayError(error))
        console.log(url);
    }
}
const displayPhoneResult = (phones) => {
    phones.forEach(phone => {
        console.log(phone);
        const searchResults = document.getElementById('search-results')
        // searchResults.textContent = ''
        // if (phone[0].length == 0) {
        //     alert('added some search')
        // }
        // document.getElementById('spinner').style.display = 'none'


        const div = document.createElement('div')
        div.innerHTML = `
        <div class="col">
          <div class="card p-3">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body align-center">
              <h5 class="card-title  text-center">${phone.phone_name}</h5>
              <h5 class="card-info text-center">${phone.brand}</h5>
              <button onclick="loadPhoto()" class="btn btn-success d-flex justify-content-center text-center mx-auto">Details</button>
              
              </div>
          </div>
        </div>
        `

        searchResults.appendChild(div)

    })
    document.getElementById('spinner').style.display = 'none'
}