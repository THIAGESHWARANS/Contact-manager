const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Function to read the contents of the contacts.json file
function readContactsFile(callback) {
    fs.readFile('contacts.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            callback(err, null);
            return;
        }
        const contacts = JSON.parse(data);
        callback(null, contacts);
    });
}

// Endpoint to save contact data
app.post('/save-contact', (req, res) => {
    const contact = req.body;
    readContactsFile((err, contacts) => {
        if (err) {
            res.status(500).json({ message: 'An error occurred while saving the contact.' });
            return;
        }
        contacts.push(contact);
        fs.writeFile('contacts.json', JSON.stringify(contacts, null, 2), err => {
            if (err) {
                console.error(err);
                res.status(500).json({ message: 'An error occurred while saving the contact.' });
                return;
            }
            res.json({ message: 'Contact saved successfully.' });
        });
    });
});

// Endpoint to update contact data
app.post('/update-contact', (req, res) => {
    const updatedContact = req.body;
    readContactsFile((err, contacts) => {
        if (err) {
            res.status(500).json({ message: 'An error occurred while updating the contact.' });
            return;
        }
        const index = contacts.findIndex(contact => contact.id === updatedContact.id);
        if (index === -1) {
            res.status(404).json({ message: 'Contact not found.' });
            return;
        }
        contacts[index] = updatedContact;
        fs.writeFile('contacts.json', JSON.stringify(contacts, null, 2), err => {
            if (err) {
                console.error(err);
                res.status(500).json({ message: 'An error occurred while updating the contact.' });
                return;
            }
            res.json({ message: 'Contact updated successfully.' });
        });
    });
});

// Serve static files
app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
