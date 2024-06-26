
const note = JSON.parse(localStorage.getItem('Notes Data'))
console.log(note)
if(note) {
    document.querySelector('.container').innerHTML = `
        <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="Heading">Title</h1>
            </div>
            <div class="modal-body">
                <div class="mb-3">
                    <input type="text" class="form-control" id="title" placeholder="Example Title" value="${note.title}">
                </div>
                <div class="mb-3">
                    <label for="desc" class="form-label">Notes Description</label>
                    <textarea type="text" class="form-control" id="desc" rows="20">${note.description}</textarea>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button id="submit" type="button" class="btn btn-primary" type="submit">Save changes</button>
            </div>
        </div>
    </div>
    `
}
const logout = document.querySelector('.logout')
logout.addEventListener('click',() => {
    localStorage.removeItem("user")
    localStorage.removeItem('Note Data')
    window.location='/login';
});