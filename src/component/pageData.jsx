import Page1 from '../component/unit1/secA/Page1'
import Page2 from "../component/unit1/secA/Page2";
import Page3 from "../component/unit1/secA/Page3";
import Page4 from "../component/unit1/secA/Page4";
import Page5 from "../component/unit1/secA/Page5";
import Page6 from "../component/unit1/secA/Page6";
import Page7 from "../component/unit1/secA/Page7";

import img1 from "../assets/unit1/1.png";
import img2 from "../assets/unit1/2.png";
import img3 from "../assets/unit1/secA/3.png";
import img4 from "../assets/unit1/secA/4.png";
import img5 from "../assets/unit1/secA/5.png";
import img6 from "../assets/unit1/secA/6.png";
import img7 from "../assets/unit1/secA/7.png";

import Q1 from '../component/unit1/secA/Exercise/Q1';
import Q2 from '../component/unit1/secA/Exercise/Q2';
import Q3 from '../component/unit1/secA/Exercise/Q3';

import sound1 from '../assets/unit1/secA/sounds/L1Q1.mp3';
import sound2 from '../assets/unit1/secA/sounds/L1Q1.mp3';

export const pageData = [
  {
    id: "workbook",
    title: "Workbook",
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
            ],
          },
        ],
      },
    ],
  },

  {
    id: "studentbook",
    title: "Student Book",
    units: [],
  },

  {
    id: "teacherbook",
    title: "Teacher Book",
    units: [],
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
    audio: sound2, 
    text: "Écoute, montre et écris.",
    captions: [
      { start: 0, end: 4.23, text: "Page 8. Right Activities. Exercise A, number 1." },
    ]
  },
];