// studentbook
import Page1 from '../component/unit1/secA/Page1';
import Page2 from "../component/unit1/secA/Page2";
import Page3 from "../component/unit1/secA/Page3";
import Page4 from "../component/unit1/secA/Page4";
import Page5 from "../component/unit1/secA/Page5";
import Page6 from "../component/unit1/secA/Page6";
import Page7 from "../component/unit1/secA/Page7";
import Page8 from "../component/unit1/secA/Page8";
import Page9 from "../component/unit1/secA/Page9";

import img1 from "../assets/unit1/1.png";
import img2 from "../assets/unit1/2.png";
import img3 from "../assets/unit1/secA/3.png";
import img4 from "../assets/unit1/secA/4.png";
import img5 from "../assets/unit1/secA/5.png";
import img6 from "../assets/unit1/secA/6.png";
import img7 from "../assets/unit1/secA/7.png";
import img8 from "../assets/unit1/secA/8.png";
import img9 from "../assets/unit1/secA/9.png";

import Q1 from '../component/unit1/secA/Exercise/Q1';
import Q2 from '../component/unit1/secA/Exercise/Q2';
import Q3 from '../component/unit1/secA/Exercise/Q3';
import Q5 from '../component/unit1/secA/Exercise/Q5';
import Q7 from '../component/unit1/secA/Exercise/Q7';
import Q11 from '../component/unit1/secA/Exercise/Q11';
import Q12 from '../component/unit1/secA/Exercise/Q12';

import sound1 from '../assets/unit1/secA/sounds/page5.mp3';
import sound2 from '../assets/unit1/secA/sounds/L1Q1.mp3';
import sound3 from '../assets/unit1/secA/sounds/L1Q1-1.mp3';
import sound4 from '../assets/unit1/secA/sounds/L1Q1-2.mp3';
import sound5 from '../assets/unit1/secA/sounds/L1Q4.mp3';
import sound6 from '../assets/unit1/secA/sounds/L2Q1.mp3';
import sound7 from '../assets/unit1/secA/sounds/L2Q2.mp3';
import sound8 from '../assets/unit1/secA/sounds/l2q11.mp3';
import sound9 from '../assets/unit1/secA/sounds/l2q12.mp3';
import sound10 from '../assets/unit1/secA/sounds/L3Q1.mp3';
import sound11 from '../assets/unit1/secA/sounds/L4Q1.mp3';
import sound12 from '../assets/unit1/secA/sounds/L4Q2.mp3';

// workbook
import Wimg1 from '../assets/workbook/Unit1/Lesson1/cover.png';
import Wimg2 from '../assets/workbook/Unit1/Lesson1/1.png';
import Wimg3 from '../assets/workbook/Unit1/Lesson1/2.png';
import Wimg4 from '../assets/workbook/Unit1/Lesson1/3.png';

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
    title: "studentbook",
    units: [
      {
        id: "unit1",
        title: "Unit 1",
        sections: [
          {
            id: "secA",
            title: "Section A",
            pages: [
              {
                id: 1,
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
    ],
  },

  {
    id: "workbook",
    title: "Work Book",
    units: [
      {
        id: "unit1",
        title: "Unit 1",
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
    captions: [
      { start: 0, end: 4.23, text: "Page 8. Right Activities. Exercise A, number 1." },
    ]
  },
  {
    id: 2,
    component: Q2,
    audio: sound1,
    text: "Écoute et montre.",
    captions: [
      { start: 0, end: 4.23, text: "Page 8. Right Activities. Exercise A, number 1." },
    ]
  },
  {
    id: 3,
    component: Q3,
    audio: sound3,
    text: "Écoute et réponds.",
    captions: [
      { start: 0, end: 4.23, text: "Page 8. Right Activities. Exercise A, number 1." },
    ]
  },
  {
    id: 4,
    component: Q5,
    audio: sound2,
    text: "Écoute, montre et écris.",
    captions: [
      { start: 0, end: 4.23, text: "Page 8. Right Activities. Exercise A, number 1." },
    ]
  },
  {
    id: 5,
    component: Q7,
    audio: sound2,
    text: "Écoute, montre et écris.",
    captions: [
      { start: 0, end: 4.23, text: "Page 8. Right Activities. Exercise A, number 1." },
    ]
  },
  {
    id: 6,
    component: Q11,
    audio: sound2,
    text: "Écoute, montre et écris.",
    captions: [
      { start: 0, end: 4.23, text: "Page 8. Right Activities. Exercise A, number 1." },
    ]
  },
  {
    id: 7,
    component: Q12,
    audio: sound2,
    text: "Écoute, montre et écris.",
    captions: [
      { start: 0, end: 4.23, text: "Page 8. Right Activities. Exercise A, number 1." },
    ]
  },
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