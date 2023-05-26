
import Swal from "sweetalert2";


export const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  export const sweetNote=(title,icon)=>{
    return   Toast.fire({
      icon: icon==undefined?"success":icon,
      title: title,
    });
  }

  
