import Swal from 'sweetalert2';

export const confirmAlert = (title, text, confirmText = 'Ya, Lanjutkan!') => {
    return Swal.fire({
        title: title,
        text: text,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: confirmText,
        cancelButtonText: 'Batal'
    });
};