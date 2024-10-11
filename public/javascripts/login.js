const loginFormBtn = document.querySelector('#loginForm > button');

const login = async (e) => {
  try {
    e.preventDefault();

    const data = {
      username: document.getElementById('username').value,
      password: document.getElementById('password').value
    };

    const reposne = await fetch('http://localhost:8000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const responseAsJson = await reposne.json();

    document.querySelector('.error-alert > p').textContent =
      responseAsJson.data.message;

    document.querySelector('.error-alert').style.opacity = '1';
  } catch (err) {
    console.log(err);
  }
};

loginFormBtn.addEventListener('click', login);
