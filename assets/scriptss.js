function saveContact() {
    var firstName = document.getElementById('firstName').value;
    var surName = document.getElementById('surName').value;
    var lastName = document.getElementById('lastName').value;
    var label = document.getElementById('label').value;
    var email = document.getElementById('email').value;
    var dob = document.getElementById('dob').value;

    var contact = {
        "firstName": firstName,
        "surName": surName,
        "lastName": lastName,
        "label": label,
        "email": email,
        "dob": dob
    };

    // Check if contacts already exist
    var contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    contacts.push(contact);

    // Save to localStorage
    localStorage.setItem('contacts', JSON.stringify(contacts));

    // Save to JSON file
    saveToFile(contacts);

    // Optional: Notify the user
    alert("Contact saved successfully!");
}

function saveToFile(data) {
    var jsonData = JSON.stringify(data);
    var blob = new Blob([jsonData], { type: "application/json" });
    var url = URL.createObjectURL(blob);

    var a = document.createElement('a');
    a.download = 'contacts.json';
    a.href = url;
    a.textContent = 'Download contacts';
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}