

    async function postData(url='',data={}){
        try{
          const response = await fetch(url, {
            method : 'POST',
            headers : {
              'Content-Type' : 'application/JSON',
            },
            body : JSON.stringify(data),
          });
          
          if(!response.ok) {
            throw new Error(`Error HTTP status ${response.status}`)
          }
          let log_data = await response.json();
          return log_data

        } catch(error) {
            console.error(error.message);
            throw error;
        }
      }

        const user = JSON.parse(localStorage.getItem('user'))
        if(!user || !user.email) {
          window.location = '/login'
        }
        const notes = postData('/getnotes',{token : user.email})
        notes.then((notes) => {
          console.log("notes")
        //   duplicate notesss
        })
        let submit = document.querySelector("#submit")
        submit.addEventListener('click', () => {
            let title = document.querySelector('#title').value
            let description = document.querySelector('#desc').value
            console.log(`Submitted ${title} : ${description}`)
        })
