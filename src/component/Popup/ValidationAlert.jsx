import Swal from "sweetalert2";
import './ValidationAlert.css';

const good = "/assets/alert/goodjob.gif";
const wrong = "/assets/alert/wrong.gif";
const Notice = "/assets/alert/Notice.gif";

const correctSound = "/assets/alert/correct.mp3";
const wrongSound = "/assets/alert/incorrect.mp3";
const Warning = "/assets/alert/warning.mp3";


const playSound = (isCorrect) => {
  new Audio(isCorrect ? correctSound : wrongSound).play();
};

const vibrate = () => {
  if (navigator.vibrate) navigator.vibrate(200);
};

const ValidationAlert = {



  success: (message, scoreMessage) => {
    Swal.fire({

      didOpen: () => {
        playSound(true);
      },

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

      didOpen: () => {
        new Audio(Warning).play(); // 🔔 صوت تحذير
      },

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

      didOpen: () => {
        playSound(false);
        vibrate();
      },

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
