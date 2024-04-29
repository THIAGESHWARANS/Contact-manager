document.addEventListener('DOMContentLoaded', function () {
    const savedContacts = JSON.parse(localStorage.getItem('contacts')) || [];
    const contactsList = document.getElementById('contactsList');

   
    savedContacts.forEach((contact, index) => {
        const contactDiv = document.createElement('div');
        contactDiv.classList.add('contact');
        contactDiv.innerHTML = `
            <h2>${contact.firstName} ${contact.lastName}</h2>
            <p><strong>Label:</strong> ${contact.label}</p>
            <p><strong>Email:</strong> ${contact.email}</p>
            <p><strong>Date of Birth:</strong> ${contact.dob}</p>
            <button class="deleteBtn" data-index="${index}">Delete</button>
        `;
        contactsList.appendChild(contactDiv);
    });


    const deleteButtons = document.querySelectorAll('.deleteBtn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function () {
            const index = parseInt(this.getAttribute('data-index'));
            savedContacts.splice(index, 1);
            localStorage.setItem('contacts', JSON.stringify(savedContacts)); 
            this.parentElement.remove();
        });
    });
});
