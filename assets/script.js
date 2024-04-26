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
function exportLocalStorageToFile() {
    // Retrieve saved contacts from localStorage
    const savedContacts = JSON.parse(localStorage.getItem('contacts')) || [];

    // Convert contacts data to JSON string
    const jsonData = JSON.stringify(savedContacts, null, 2); // null and 2 are for formatting

    // Create a Blob object containing the JSON data
    const blob = new Blob([jsonData], { type: 'application/json' });

    // Create a temporary URL for the Blob
    const url = URL.createObjectURL(blob);

    // Create a temporary anchor element
    const a = document.createElement('a');
    a.href = url;
    a.download = 'contacts.json'; // Filename for the downloaded file

    // Append the anchor element to the document body
    document.body.appendChild(a);

    // Programmatically trigger a click event on the anchor element
    a.click();

    // Remove the anchor element from the document body
    document.body.removeChild(a);

    // Revoke the Blob URL to release resources
    URL.revokeObjectURL(url);
}
