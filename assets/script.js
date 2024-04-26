document.addEventListener('DOMContentLoaded', function () {
    const formE1 = document.getElementById('contactForm');
    const saveContactBtn = document.getElementById('saveContactBtn');

    saveContactBtn.addEventListener('click', function (event) {
        event.preventDefault(); // Prevent the default form submission behavior

        // Your code to handle saving the contact goes here
        // You can access form inputs like this:
        const firstName = document.getElementById('firstName').value;
        const surName = document.getElementById('surName').value;
        const lastName = document.getElementById('lastName').value;
        const label = document.getElementById('label').value;
        const email = document.getElementById('email').value;
        const dob = document.getElementById('dob').value;

        // Define the data object
        const data = {
            firstName: firstName,
            surName: surName,
            lastName: lastName,
            label: label,
            email: email,
            dob: dob
        };

        // Save to local JSON file
        saveContactToLocalJSON(data);
    });
});

function saveContactToLocalJSON(contactData) {
    // Check if localStorage is supported by the browser
    if (typeof(Storage) !== "undefined") {
        // Retrieve existing contacts or initialize an empty array
        let savedContacts = JSON.parse(localStorage.getItem('contacts')) || [];
        
        // Add the new contact to the array
        savedContacts.push(contactData);
        
        // Save the updated array back to localStorage
        localStorage.setItem('contacts', JSON.stringify(savedContacts));
        
        // Redirect to the view contacts page
        window.location.href = 'view_contacts.html';
    } else {
        console.error('LocalStorage is not supported in this browser.');
    }
}
