import swal from 'sweetalert';

export const ErrorAlert = () => {
    return (
        swal("Error in your submission, check your fields first", {
            // buttons: ["Try again", true],
          })
        );
};
export const SuccessAlert = () => {
    return (
        swal("Successfully Submitted", {
          })
        );
};
