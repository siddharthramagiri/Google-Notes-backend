
async function postData(url = '', data = {}) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/JSON',
      },
      body: JSON.stringify(data),
    });

    if (!response) {
      throw new Error(`Error HTTP status ${response.status}`)
    }
    let log_data = await response.json();
    return log_data

  } catch (error) {
    console.error(error.message);
    throw error;
  }
}

let submit = document.querySelector("#submit")
submit.addEventListener('click', async () => {
  let email = document.querySelector('#email').value
  let username = document.querySelector('#username').value
  let password = document.querySelector('#password').value
  console.log(`Submitted ${email} : ${username}`)
  const resp = await postData('/signup', { email, username, password })
  console.log(resp.success)
  if (resp.success === true) {
    alert(`${resp.message}`)
    document.querySelector('#email').value = ''
    document.querySelector('#username').value = ''
    document.querySelector('#password').value = ''
  } else if (resp.success === false) {
    alert(`${resp.message}`)
  }
})
