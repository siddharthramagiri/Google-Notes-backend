
let logout = document.querySelector('.logout')

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
    logout.classList.remove("hide")
    const notes = await postData('/getnotes', { user_id: user._id })

    if (notes) {
      let notescontainer = document.querySelector(".row")
      notescontainer.innerHTML = ''
      console.log("notes", notes.notes);
      //duplicate notes
      await notes.notes.forEach(element => {
        let str = `
                    <div class="card mb-3 mx-3" style="width: 18rem;">
                            <div class="card-body">
                              <div onclick="shownote('${element.title}','${element.description}','${element._id}')">
                                <h5 class="card-title">${element.title}</h5>
                                <p class="card-text">${element.description}</p>
                              </div>
                                <a id="dlt" class="btn btn-outline-danger btn-sm delete mt-2" onclick="deletenote('${element._id}')">Delete</a>
                            </div>
                        </div>
                  `
        notescontainer.innerHTML += str
      });
    }
  }
}
fetchNotes();

logout.addEventListener('click', () => {
  localStorage.removeItem("user")
  localStorage.removeItem('Note Data')
  window.location = '/login';
});

let submit = document.querySelector("#submit")
submit.addEventListener('click', async () => {
  let title = document.querySelector('#title').value
  let description = document.querySelector('#desc').value
  let user_id = JSON.parse(localStorage.getItem("user"))._id
  console.log(`Submitted ${title} : ${description} : ${user_id}`)
  let resp = await postData('/addnote', { user_id, title, description })
  console.log(resp.success)
  if (resp.success === true) {
    await fetchNotes();
    document.querySelector('#title').value = ""
    document.querySelector('#desc').value = ""
    await document.getElementById('close').click()
  } else {
    alert(`${resp.message}`)
  }
})

// GET DATA >>>> INDIVIDUAL NOTES
async function getData(url = '', data = {}) {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/HTML',
      },
      params: JSON.stringify(data),
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

async function shownote(title, description, id) {
  window.location = `/shownote/${id}`;
  const resp = await getData(`/shownote/${id}`, { id })
  if (resp.success) {
    // window.location = resp.fileUrl
    localStorage.setItem('Notes Data', JSON.stringify(resp.note))
    console.log(resp)
  }
}



// DELETE DATA >>>>
async function deleteData(url = '', data = {}) {
  try {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/JSON',
      },
      body: JSON.stringify(data),
    });

    if (!response) {
      throw new Error(`Error HTTP status ${response.status}`)
    }
    let dlt_data = await response.json();
    return dlt_data

  } catch (error) {
    console.error(error.message);
    throw error;
  }
}

async function deletenote(id){

  console.log(`deleted ${id}`)
  const resp = await deleteData('/',{id})
  if(resp.success) {
    await fetchNotes();
    await alert(resp.message)
  }
}