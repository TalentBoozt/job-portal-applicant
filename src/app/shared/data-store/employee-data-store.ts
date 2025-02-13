import {EmployeeModel} from "../data-models/Employee.model";

export var employeeDataStore: EmployeeModel[] = [
  {
    id:"1",
    firstname:"john",
    lastname:"Doe",
    occupation:"Web Developer",
    image:"", // firebase URL
    coverImage:"", // firebase URL
    dob:"09/11/1999",
    email:"johndoe@gmail.com",
    resume:"", // firebase URL
    intro:"lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, totam. \nlorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, totam.",
    skills:[
      {
        id:"1",
        skill:"HTML",
        percentage:"90"
      },
      {
        id:"2",
        skill:"CSS",
        percentage:"80"
      },
      {
        id:"3",
        skill:"Javascript",
        percentage:"70"
      },
      {
        id:"4",
        skill:"Angular",
        percentage:"60"
      }
    ],
    experiences:[
      {
        id:"1",
        company:"Google",
        position:"Software Engineer",
        country:"USA",
        startDate:"01/01/2024",
        endDate:"Present",
        description:"lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, totam. \nlorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, totam.",
      },
      {
        id:"2",
        company:"Facebook",
        position:"Software Engineer",
        country:"USA",
        startDate:"15/10/2018",
        endDate:"11/02/2023",
        description:"lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, totam. \nlorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, totam.",
      }
    ],
    education:[
      {
        id:"1",
        school:"University of California",
        degree:"Bachelor of Science",
        country:"USA",
        startDate:"01/01/2024",
        endDate:"Present",
        description:"lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, totam. \nlorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, totam.",
      },
      {
        id:"2",
        school:"University of California",
        degree:"Bachelor of Science",
        country:"USA",
        startDate:"01/01/2024",
        endDate:"Present",
        description:"lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, totam. \nlorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, totam.",
      }
    ],
    contactInfo: {
      phone: "1234567890",
      address: "123 Main St, Anytown USA",
      city: "Anytown",
      country: "USA",
      zipCode: "12345",
      website: "johndoe.com"
    },
    socialLinks:{
      twitter: "johndoe",
      facebook: "johndoe",
      linkedin: "johndoe",
      instagram: "johndoe",
      github: "johndoe"
    },
    accountNotifications:{
      mention: true,
      follow: true,
      shareActivity: true,
      message: true
    },
    marketingNotifications:{
      promotion: true,
      companyNews: true,
      weeklyJobs: true,
      unsubscribe: true
    },
    profileCompleted:{
      name: true,
      email: true,
      resume: true,
      occupation: true,
      profilePic: true,
      coverPic: true,
      intro: true,
      skills: true,
      experiences: true,
      education: true,
      contactInfo: true,
      socialLinks: true
    },
    profileStatus:""
  }
]
