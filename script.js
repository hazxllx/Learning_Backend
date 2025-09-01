const BASE_URL = 'https://reqres.in/api';

// Create user
async function createUser() {
    // get input values
    const name = document.getElementById('createName').value;
    const job = document.getElementById('createJob').value;

    // send POST request
    const res = await fetch(`${BASE_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, job })
    });

    const data = await res.json();

    // show response
    document.getElementById('createOutput').textContent = JSON.stringify(data, null, 2);
}

// Get single user
async function getUser() {
    const id = document.getElementById('getUserId').value;

    // send GET request
    const res = await fetch(`${BASE_URL}/users/${id}`);
    const data = await res.json();

    // show response
    document.getElementById('getOutput').textContent = JSON.stringify(data, null, 2);
}

// Update (PUT or PATCH)
async function updateUser(method) {
    const id = document.getElementById('updateId').value;
    const name = document.getElementById('updateName').value;
    const job = document.getElementById('updateJob').value;

    // send PUT or PATCH request
    const res = await fetch(`${BASE_URL}/users/${id}`, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, job })
    });

    const data = await res.json();

    // show response
    document.getElementById('updateOutput').textContent = JSON.stringify(data, null, 2);
}

// Fetch all users
async function fetchAllUsers() {
    // send GET request
    const res = await fetch(`${BASE_URL}/users?page=1`);
    const data = await res.json();

    // show only the user list (data.data)
    document.getElementById('allOutput').textContent = JSON.stringify(data.data, null, 2);
}

// Delete user
async function deleteUser() {
    const id = document.getElementById('deleteId').value; // corrected ID name to match HTML

    // send DELETE request
    const res = await fetch(`${BASE_URL}/users/${id}`, {
        method: 'DELETE'
    });

    // show status message only (204 means success with no content)
    document.getElementById('deleteOutput').textContent =
        res.status === 204 ? 'User deleted successfully (204 No Content)' : 'Delete failed';
}
