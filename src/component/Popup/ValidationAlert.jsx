import Swal from "sweetalert2";
import './ValidationAlert.css';
import good from "../../assets/alert/goodjob.gif";
import wrong from "../../assets/alert/wrong.gif";
import Notice from "../../assets/alert/Notice.gif";

const ValidationAlert = {

  success: (message, scoreMessage) => {
    Swal.fire({

      html: `
      <div style="font-size: 20px; text-align: center;">
      <p style="color: green; font-weight: bold;">
          ${message}
        </p>  
      <p style="color: green; font-weight: bold;">
          ${scoreMessage}
        </p>
      </div>`,
      imageUrl: good,
      imageWidth: 200,
      imageHeight: 200,
      background: "#dfeaf6",
      confirmButtonText: "Good Job",
      allowOutsideClick: false,
      allowEscapeKey: false,
      buttonsStyling: false,
      customClass: {
        popup: "my-popup",
        image: "my-image",
        title: "my-title",
        content: "my-content",
        confirmButton: "my-button",
      },
    });
  },


  warning: (message, scoreMessage) => {
    Swal.fire({

      html: `
      <div style="font-size: 20px; text-align: center;">
        <p style="color: orange; font-weight: bold;">
          ${message}
        </p>  
        <p style="color: orange; font-weight: bold;">
          ${scoreMessage}
        </p>
      </div>`,
      imageUrl: Notice,
      imageWidth: 200,
      imageHeight: 200,
      background: "#fff4d9",
      confirmButtonText: "Continue",
      allowOutsideClick: false,
      allowEscapeKey: false,
      buttonsStyling: false,
      customClass: {
        popup: "my-popup",
        image: "my-image",
        title: "my-title",
        content: "my-content",
        confirmButton: "my-button2",
      },
    });
  },

  error: (message, scoreMessage) => {
    Swal.fire({

      html: `
      <div style="font-size: 20px; text-align: center;">
      <p style="color: red; font-weight: bold;">
          ${message}
        </p>  
        <p style="color: red; font-weight: bold;">
          ${scoreMessage}
        </p>
        
      </div>`,
      imageUrl: wrong,
      imageWidth: 200,
      imageHeight: 200,
      background: "#fde4e4",
      confirmButtonText: "Try Again",
      allowOutsideClick: false,
      allowEscapeKey: false,
      buttonsStyling: false,
      customClass: {
        popup: "my-popup",
        image: "my-image",
        title: "my-title",
        content: "my-content",
        confirmButton: "my-button1",
      },
    });
  },

  info: () => {
    Swal.fire({
      title: "Oops!",
      html: "Please complete all fields.",
      imageUrl: Notice,
      imageWidth: 200,
      imageHeight: 200,
      background: "#dfeaf6",
      confirmButtonText: "OK",
      allowOutsideClick: false,
      allowEscapeKey: false,
      buttonsStyling: false,
      customClass: {
        popup: "my-popup",
        image: "my-image",
        title: "my-title",
        content: "my-content",
        confirmButton: "my-button3",
      },
    });
  },
};

export default ValidationAlert;
