

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

const user = JSON.parse(localStorage.getItem('user'))
if (!user || !user.email) {
  window.location = '/login'
}
console.log(user._id)
const fetchNotes = async () => { 
  if (user && user._id) {
    const notes = await postData('/getnotes', { user_id: user._id })

    if(notes) {
      let notescontainer = document.querySelector(".row")
      notescontainer.innerHTML=''
      console.log("notes", notes.notes);
      //duplicate notes
      await notes.notes.forEach(element => {
        let str = `
                    <div class="card mb-3 mx-3" style="width: 18rem;">
                            <div class="card-body">
                                <h5 class="card-title">${element.title}</h5>
                                <p class="card-text">${element.description}</p>
                                <a href="#" class="btn btn-outline-danger btn-sm">Delete</a>
                            </div>
                        </div>
                  `

        notescontainer.innerHTML += str
      });
    }

    // notes.then(async (notes) => {
    //   //   duplicate notesss
      
    // })
  }
}
fetchNotes();

let submit = document.querySelector("#submit")
submit.addEventListener('click', async () => {
  let title = document.querySelector('#title').value
  let description = document.querySelector('#desc').value
  let user_id = JSON.parse(localStorage.getItem("user"))._id
  console.log(`Submitted ${title} : ${description} : ${user_id}`)
  let resp = await postData('/addnote', {user_id, title, description })
  console.log(resp.success)
  if (resp.success === true) {
    alert(`${resp.message}`)
    await fetchNotes();
  } else {
    alert(`${resp.message}`)
  }
})
