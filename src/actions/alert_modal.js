 export const alertModal=(title, body) =>{
    // Display error message to the user in a modal
    console.log(title,body)
    document.getElementById('alert-modal-title').html(title);
    document.getElementById('alert-modal-body').html(body);
    document.getElementById('alert-modal').modal('show');
  }