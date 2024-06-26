async function postData(url='',data={}){
  try{
    const response = await fetch(url, {
      method : 'POST',
      headers : {
        'Content-Type' : 'application/JSON',
      },
      body : JSON.stringify(data),
    });
    
    if(!response) {
      throw new Error(`Error HTTP status ${response.status}`)
    }
    let log_data = await response.json();
    return log_data

  } catch(error) {
      console.error(error.message);
      throw error;
  }
}

let submit = document.querySelector("#submit")
submit.addEventListener('click', async () => {
        let email = document.querySelector('#email').value
        let password = document.querySelector('#password').value
        console.log(`Submitted ${email} : ${password}`)
        const resp = await postData('/login',{email,password})
        if(resp.success === true) {
          alert(`${resp.message}`)
          localStorage.setItem('user',JSON.stringify(resp.user))
          document.querySelector('#email').value=''
          document.querySelector('#password').value=''
          window.location='/';
        } else if (resp.success === false) {
          alert(`${resp.message}`)
        }
    })