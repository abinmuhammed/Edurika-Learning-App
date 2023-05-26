import Swal from "sweetalert2";


export const DeleteNotification = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success bg-gradient jk',
      cancelButton: 'btn btn-danger bg-gradient'
    },
    buttonsStyling:true
  })

 
  export const showdelete=()=>{
    return  DeleteNotification.fire({
        title: 'Are you sure?',
        text: "Disclaimer ! You wont be able to retrive this Action",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, Confirm!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      })
      
  }