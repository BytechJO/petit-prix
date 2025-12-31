// studentbook-unitOne-secA
import Page1 from '../component/unit1/secA/Page1';
import Page2 from "../component/unit1/secA/Page2";
import Page3 from "../component/unit1/secA/Page3";
import Page4 from "../component/unit1/secA/Page4";
import Page5 from "../component/unit1/secA/Page5";
import Page6 from "../component/unit1/secA/Page6";
import Page7 from "../component/unit1/secA/Page7";
import Page8 from "../component/unit1/secA/Page8";
import Page9 from "../component/unit1/secA/Page9";

// unit1 student img
const img1 = "/assets/unit1/1.webp";
const img2 = "/assets/unit1/2.webp";
const img3 = "/assets/unit1/secA/3.webp";
const img4 = "/assets/unit1/secA/4.webp";
const img5 = "/assets/unit1/secA/5.webp";
const img6 = "/assets/unit1/secA/6.webp";
const img7 = "/assets/unit1/secA/7.webp";
const img8 = "/assets/unit1/secA/8.png";
const img9 = "/assets/unit1/secA/9.webp";


import Q1 from '../component/unit1/secA/Exercise/Q1';
import Q2 from '../component/unit1/secA/Exercise/Q2';
import Q3 from '../component/unit1/secA/Exercise/Q3';
import Q5 from '../component/unit1/secA/Exercise/Q5';
import Q7 from '../component/unit1/secA/Exercise/Q7';
import Q11 from '../component/unit1/secA/Exercise/Q11';
import Q12 from '../component/unit1/secA/Exercise/Q12';
import Q13 from '../component/unit1/secA/Exercise/Q13';

// audio
const sound1 = "/assets/unit1/secA/page45/u1q2.wav";

const sound2 = "/assets/unit1/secA/page6/u1l1q1.wav";
const sound3 = "/assets/unit1/secA/page6/u1l1q2.wav";
const sound4 = "/assets/unit1/secA/page6/u1l1q4.wav";

const sound5 = "/assets/unit1/secA/page7/u1l2q1.wav";
const sound6 = "/assets/unit1/secA/page7/u1l2q2.wav";

const sound7 = "/assets/unit1/secA/page8/L3Q1.mp3";

const sound8 = "/assets/unit1/secA/page9/u1l4q1.wav";

const sound9 = "/assets/unit1/secA/page9/u1l4q2.wav";


// studentbook-unitOne-review
import Page10 from '../component/unit1/review/Page1';
import Page11 from "../component/unit1/review/Page2";
import Page12 from "../component/unit1/review/Page3";
import Page13 from "../component/unit1/review/Page4";
import Page14 from "../component/unit1/review/Page5";
import Page15 from "../component/unit1/review/Page6";

const img10 = "/assets/unit1/10.png";
const img11 = "/assets/unit1/11.png";
const img12 = "/assets/unit1/review/12.png";
const img13 = "/assets/unit1/review/13.png";
const img14 = "/assets/unit1/review/14.png";
const img15 = "/assets/unit1/review/15.png";

// unit2 student img
const U2img1 = "/assets/unit2/1.png";
const U2img2 = "/assets/unit2/2.png";
const U2img3 = "/assets/unit2/secA/3.png";
const U2img4 = "/assets/unit2/secA/4.png";
const U2img5 = "/assets/unit2/secA/5.png";
const U2img6 = "/assets/unit2/secA/6.png";
const U2img7 = "/assets/unit2/secA/7.png";
const U2img8 = "/assets/unit2/secA/8.png";

import U2Page1 from '../component/unit2/secA/Page1';
import U2Page2 from "../component/unit2/secA/Page2";
import U2Page3 from "../component/unit2/secA/Page3";
import U2Page4 from "../component/unit2/secA/Page4";
import U2Page5 from "../component/unit2/secA/Page5";
import U2Page6 from "../component/unit2/secA/Page6";
import U2Page7 from "../component/unit2/secA/Page7";
import U2Page8 from "../component/unit2/secA/Page8";

// workbook
const Wimg1 = "/assets/workbook/Unit1/Lesson1/cover.png";
const Wimg2 = "/assets/workbook/Unit1/Lesson1/1.png";
const Wimg3 = "/assets/workbook/Unit1/Lesson1/2.png";
const Wimg4 = "/assets/workbook/Unit1/Lesson1/3.png";

import WPage1 from '../component/workbook/secA/wpage1';
import WPage2 from '../component/workbook/secA/wpage2';
import WPage3 from '../component/workbook/secA/wpage3';
import WPage4 from '../component/workbook/secA/wpage4';

import WQ1 from '../component/workbook/secA/Exercise/Q1';
import WQ2 from '../component/workbook/secA/Exercise/Q2';
import WQ3 from '../component/workbook/secA/Exercise/Q3';
import WQ4 from '../component/workbook/secA/Exercise/Q4';

export const pageData = [
  {
    id: "studentbook",
    title: "MÉTHODE DE FRANÇAIS",
    units: [
      {
        id: "unit1",
        title: "Unité 1",
        sections: [
          {
            id: "secA",
            title: "Section A",
            pages: [
              {
                id: 1,
                className: "coverimg",
                component: Page1,
                image: img1,
              },
              {
                id: 2,
                component: Page2,
                image: img2,
              },
              {
                id: 3,
                component: Page3,
                image: img3,
              },
              {
                id: 4,
                component: Page4,
                image: img4,
              },
              {
                id: 5,
                component: Page5,
                image: img5,
              },
              {
                id: 6,
                component: Page6,
                image: img6,
              },
              {
                id: 7,
                component: Page7,
                image: img7,
              },
              {
                id: 8,
                component: Page8,
                image: img8,
              },
              {
                id: 9,
                component: Page9,
                image: img9,
              },
            ],
          },
        ],
      },
      {
        id: "Review1",
        title: "Revoir 1",
        sections: [
          {
            id: "unitOnereview",
            title: "Section A",
            pages:
            [
              //review
              {
                id: 10,
                className: "coverimg",
                component: Page10,
                image: img10,
              },
              {
                id: 11,
                component: Page11,
                image: img11,
              },
              {
                id: 12,
                component: Page12,
                image: img12,
              },
              {
                id: 13,
                component: Page13,
                image: img13,
              },
              {
                id: 14,
                component: Page14,
                image: img14,
              },
              {
                id: 15,
                component: Page15,
                image: img15,
              },
            ],
          },
        ],
      },

      {
        id: "unit2",
        title: "Unité 2",
        sections: [
          {
            id: "secA",
            title: "Section A",
            pages: [
              {
                id: 16,
                className: "coverimg",
                component: U2Page1,
                image: U2img1,
              },
              {
                id: 17,
                component: U2Page2,
                image: U2img2,
              },
              {
                id: 18,
                component: U2Page3,
                image: U2img3,
              },
              {
                id: 19,
                component: U2Page4,
                image: U2img4,
              },
              {
                id: 20,
                component: U2Page5,
                image: U2img5,
              },
              {
                id: 21,
                component: U2Page6,
                image: U2img6,
              },
              {
                id: 22,
                component: U2Page7,
                image: U2img7,
              },
              {
                id: 23,
                component: U2Page8,
                image: U2img8,
              },
            ],
          },
        ],
      },
    ],
  },

  {
    id: "workbook",
    title: "LIVRE DE GRAMMAIRE",
    units: [
      {
        id: "unit1",
        title: "Unité 1",
        sections: [
          {
            id: "secA",
            title: "Section A",
            pages: [
              {
                id: 10,
                component: WPage1,
                image: Wimg1,
              },
              {
                id: 11,
                component: WPage2,
                image: Wimg2,
              },
              {
                id: 12,
                component: WPage3,
                image: Wimg3,
              },
              {
                id: 13,
                component: WPage4,
                image: Wimg4,
              },
            ],
          },
        ],
      },
    ],
  },

];


export const unit1SecAQuestions = [
  {
    id: 1,
    component: Q1,
    audio: null,
    text: "Observe et trouve",
  },
  {
    id: 2,
    component: Q2,
    audio: sound1,
    text: "Écoute et montre.",
    captions: [
      { start: 0, end: 4.23, text: "Page 8. Right Activities. Exercise A, number 1." },
    ],
    pausePoints: [11, 17],
  },
  {
    id: 3,
    component: Q3,
    audio: sound2,
    text: "Écoute et réponds.",
    captions: [
      { start: 0, end: 4.23, text: "Page 8. Right Activities. Exercise A, number 1." },
    ]
  },
  {
    id: 4,
    component: Q5,
    audio: sound5,
    text: "Écoute, montre et écris.",
    captions: [
      { start: 0, end: 4.23, text: "Page 8. Right Activities. Exercise A, number 1." },
    ]
  },
  {
    id: 5,
    component: Q7,
    audio: sound6,
    text: "Écoute, montre et écris.",
    captions: [
      { start: 0, end: 4.23, text: "Page 8. Right Activities. Exercise A, number 1." },
    ],
    pausePoints: [12, 14, 17, 20],
  },
  {
    id: 6,
    component: Q11,
    audio: sound7,
    text: "Écoute, montre et écris.",
    captions: [
      { start: 0, end: 4.23, text: "Page 8. Right Activities. Exercise A, number 1." },
    ]
  },
  {
    id: 7,
    component: Q12,
    audio: sound9,
    text: "Écoute, montre et écris.",
    captions: [
      { start: 0, end: 4.23, text: "Page 8. Right Activities. Exercise A, number 1." },
    ]
  },
  // {
  //   id: 8,
  //   component: Q13,
  //   audio: sound8,
  //   text: "Écoute et trouve un objet dans la classe.",
  //   captions: [
  //     { start: 0, end: 4.23, text: "Page 8. Right Activities. Exercise A, number 1." },
  //   ]
  // },
];

export const Wunit1SecAQuestions = [
  {
    id: 1,
    component: WQ1,
    audio: null,
    text: "C’est français ? Écoute et réponds par oui ou non.",
    captions: [
      { start: 0, end: 4.23, text: "Page 8. Right Activities. Exercise A, number 1." },
    ]
  },
  {
    id: 2,
    component: WQ2,
    audio: null,
    text: "Écris les mots.",
    captions: [
      { start: 0, end: 4.23, text: "Page 8. Right Activities. Exercise A, number 1." },
    ]
  },
  {
    id: 3,
    component: WQ3,
    audio: null,
    text: "Qu’est-ce que tu dis ? Entoure la bonne réponse.",
    captions: [
      { start: 0, end: 4.23, text: "Page 8. Right Activities. Exercise A, number 1." },
    ]
  },
  {
    id: 4,
    component: WQ4,
    audio: null,
    text: "Écoute et écris.",
    captions: [
      { start: 0, end: 4.23, text: "Page 8. Right Activities. Exercise A, number 1." },
    ]
  },
];