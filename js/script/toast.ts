import toastr from "toastr";

toastr.options = {
  closeButton: false,
  progressBar: false,
  positionClass: "toast-bottom-right",
  timeOut: 500000,
  closeDuration: 100,
  hideDuration: 100,
  showDuration: 100
};

export default toastr;