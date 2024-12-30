const loadPhone = async (searchText) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json();
    const phone = data.data;
    //console.log(phone)
    displayphone(phone)

}
  
const displayphone = phone => {
    //console.log(phone);
       

    const phoneContainer = document.getElementById('phone-container')

    //clear phone container cards before adding new cards
    phoneContainer.textContent ='';
    // display show all button if there are more than 12 phone
    const showAllContainer = document.getElementById('show-all-container')
    showAllContainer.classList.add('hidden')
    if(phone.length===0){
    
      phoneContainer.innerHTML=`<p class="text-center text-blue-800 bg-gray-100 p-4 m-4  ">No data available,please retry.</p>`;

    }
    else{

    
       if (phone.length > 12)
      {
      showAllContainer.classList.remove('hidden')
      }
    
       

    //display only  first 12 phone
    phone = phone.slice(0,12)

    phone.forEach(phone => {
        console.log(phone)
        // creat a div

        const phonecard = document.createElement('div')
        phonecard.classList =`card bg-gray-100 p-4 shadow-xl`;

        // set inner html
        phonecard.innerHTML=`<figure class="px-10 pt-10">
              <img
                src="${phone.image}"
                alt="Shoes"
                class="rounded-xl" />
              </figure>
              <div class="card-body items-center text-center">
              <h2 class="card-title">${phone.phone_name
              }</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
              <div class="card-actions justify-center">
                <button onclick="handleShowDetail('${phone.slug}');show_details_modal.showModal()" class="btn btn-primary">Show Details</button>
              </div>
            </div>`

            // append child
            phoneContainer.appendChild(phonecard);
    });

  }

    // hide loading spinner
    toggleLoadingSpinner(false);
}


//
const handleShowDetail =async (id)=>{
  console.log('click',id)
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
  const data = await res.json();
  const phone =data.data;
  showPhoneDetails(phone)

}


const showPhoneDetails =(phone) =>{
  console.log(phone);
  const phonename =document.getElementById('phone-name');
  phonename.innerText = phone.name;


  const showDetailContainer = document.getElementById('show-deail-container');
  showDetailContainer.innerHTML=`
  <img src="${phone.image}"/>
  <p><span>Storage:</span>${phone?.mainFeatures?.storage}</p>
  <p><span>Storage:</span>${phone?.mainFeatures?.displaySize}</p>
  <p><span>Storage:</span>${phone?.mainFeatures?.chipSet}</p>
  
  `

  //show the modal
  show_details_modal.showModal()
}


// handle search

const handleSearch = ()=>{
  toggleLoadingSpinner(true);
  const searchFeild = document.getElementById('search-field');
  const searchText = searchFeild.value;
  console.log(searchText) ;
  loadPhone(searchText);

  if (searchText) {
    loadPhone(searchText);
} else {
    // Show a message if the search field is empty
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.innerHTML = '<p class="text-center text-blue-500">Please enter a search term.</p>';
   
}

  
}

//spinner

const toggleLoadingSpinner = (isLoading)=>{
  const loadingSpinner = document.getElementById('loading-spinner')
if(isLoading){
  loadingSpinner.classList.remove('hidden')
}
 else{
  loadingSpinner.classList.add('hidden')
 }
}
loadPhone();