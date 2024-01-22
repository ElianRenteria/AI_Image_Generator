import './style.css';

const form = document.querySelector('form');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = new FormData(form);
    showSpinner();

    const response = await fetch('http://localhost:5173');

    if (response.ok) {
      const response = await fetch('http://localhost:5173', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: data.get('prompt'),
        }),
      });
    } else {
        const err = await response.text();
        alert(err);
        console.error(err);
    }

    const { image } = await response.json();

    const result = document.querySelector('#result');
    result.innerHTML = `<img src="${image}" width="512" />`;
    hideSpinner();
});


function showSpinner() {
  const button = document.querySelector('button');
  button.disabled = true;
  button.innerHTML = 'Dreaming... <span class="spinner">🧠</span>';
}

function hideSpinner() {
  const button = document.querySelector('button');
  button.disabled = false;
  button.innerHTML = 'Dream';
}