const apiUrl = 'http://localhost:3000/api/items';

document.addEventListener('DOMContentLoaded', () => {
    loadItems();
    document.getElementById('itemForm').addEventListener('submit', addItem);
});

async function loadItems() {
    const response = await fetch(apiUrl);
    const items = await response.json();
    const itemsList = document.getElementById('itemsList');
    itemsList.innerHTML = '';

    items.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item.name;
        itemsList.appendChild(li);
    });
}

async function addItem(event) {
    event.preventDefault();
    const itemName = document.getElementById('itemName').value;

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: itemName })
    });

    if (response.ok) {
        document.getElementById('itemName').value = '';
        loadItems();
    } else {
        console.error('Failed to add item');
    }
}

async function sendEmail() {
            const response = await fetch('http://localhost:3000/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    to: 'shivigupta31121988@gmail.com',
                    subject: 'Test Email from Browser',
                    text: 'This is a test email sent from a browser!'
                })
            });

            const result = await response.text();
            alert(result);
        }