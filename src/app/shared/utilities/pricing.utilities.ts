export var PricingUtilities = {
  packages: [
    {
      id: 1,
      name: "Free",
      shortDescription: "For startups and small teams",
      price: 0,
      currency: "USD",
      payPeriod: "month",
      buttons: [
        {
          text: "Join for free",
          link: "/register",
          class: "btn-2"
        }
      ],
      features: [
        {
          id: 1,
          name: "Maintain 3 jobs",
          description: "The Free package allows you to post and manage up to 3 job listings at a time. When a position is filled or a listing expires, you can easily replace it with a new post. Users can view posted jobs, manage applicants, shortlist candidates, and download CVs."
        },
        {
          id: 2,
          name: "Simplified Dashboard",
          description: "Provides a simpl overview of open job listings. The dashboard shows the number of applicants for each job, number of shortlisted candidates and the closing date."
        },
        {
          id: 3,
          name: "Customize your profile",
          description: "The company profile page provides a overview of the your company. Showcase your employer brand, value propositions and uniqueness through this profile."
        }
      ],
      recommended: false,
      staticFeature: '',
      onetimePayment: {
        available: false,
        offerName: "",
        offerDescription: "",
        price: 0
      },
      cart: {
        name: "Free",
        description: "For startups and small teams",
        price: 0
      }
    },
    {
      id: 2,
      name: "Pro",
      shortDescription: "For small and medium scale firms",
      price: 9.9,
      currency: "USD",
      payPeriod: "month",
      buttons: [
        {
          text: "Continue with Pro",
          link: "/pre-order",
          class: "btn-2"
        }
      ],
      features: [
        {
          id: 1,
          name: "Maintain 10 jobs",
          description: "Manage up to 10 job postings at once, enhanced flexibility to attract and manage more candidates at once."
        },
        {
          id: 2,
          name: "Verified Employer Badge",
          description: "Job postings will display a verified badge and get prominence in the Job listing page."
        },
        {
          id: 3,
          name: "Track Ads",
          description: "Easily monitor the performance of your job advertisements, including clicks, and applications. Gain insights to optimize your postings and attract more qualified candidates."
        },
        {
          id: 4,
          name: "Monitor Applicants",
          description: "Access detailed analytics about applicants, including application status, profile match scores, and many more. Use these insights to streamline your hiring process."
        },
        {
          id: 5,
          name: "Customize Ads",
          description: "Create visually appealing and branded job ads. Customize layouts, add your company banner, and tailor the tone to resonate with your target audience."
        },
        {
          id: 6,
          name: "Help Support",
          description: "Get access to priority help and guidance for resolving issues, setting up job postings, and managing your account through our dedicated support team."
        },
        {
          id: 7,
          name: "Customize Ad expiration",
          description: "Set custom expiration dates for your job listings to align with your recruitment timelines. Extend or reduce the visibility period based on hiring needs."
        }
      ],
      recommended: true,
      staticFeature: 'Everything included in Free, plus...',
      onetimePayment: {
        available: false,
        offerName: "",
        offerDescription: "",
        price: 0
      },
      cart: {
        name: "Pro",
        description: "For small and medium scale firms",
        price: 9.9
      }
    },
    {
      id: 3,
      name: "Premium",
      shortDescription: "for large firms and enterprises",
      price: 19.9,
      currency: "USD",
      payPeriod: "month",
      buttons: [
        {
          text: "Pre order",
          link: "/pre-order",
          class: "btn-2"
        },
        {
          text: "Contact sales",
          link: "/contact",
          class: "btn-1"
        }
      ],
      features: [
        {
          id: 1,
          name: "Maintain unlimited jobs",
          description: "Enjoy unrestricted job postings to support large-scale hiring needs. Post as many listings as required without worrying about limits."
        },
        {
          id: 2,
          name: "Hiring Process",
          description: "Utilize tools to manage the entire hiring lifecycle, from posting jobs to onboarding successful candidates. Track each step seamlessly."
        },
        {
          id: 3,
          name: "Setting up demo questions",
          description: "Enhance your recruitment by adding demo questions or skill tests to job applications. Evaluate candidates effectively based on their answers."
        },
        {
          id: 4,
          name: "Top rating",
          description: "Boost your company’s visibility with top-rated status on job listings. Your posts are highlighted to attract top talent quickly."
        },
        {
          id: 5,
          name: "Premium Support",
          description: "Access 24/7 premium support for any technical or account-related assistance. Our dedicated team ensures your issues are resolved promptly."
        },
        {
          id: 6,
          name: "Separate tool",
          description: "Leverage exclusive access to advanced recruitment tools for analytics, collaboration, and candidate evaluation, tailored for enterprise needs."
        }
      ],
      recommended: false,
      staticFeature: 'Everything included in Pro, plus...',
      onetimePayment: {
        available: false,
        offerName: "",
        offerDescription: "",
        price: 0
      },
      cart: {
        name: "Premium",
        description: "for large firms and enterprises",
        price: 19.9
      }
    }
  ],
  faq: [
    {
      id: "f-1",
      category: "Subscriptions & Payments",
      questions: [
        {
          id: "q-1",
          question: "How do I subscribe?",
          answer: "Subscribing is quick and easy! Just head to the ‘Pricing’ section, select the plan that best suits your needs, and click ‘Subscribe.’ Enter your payment details as prompted, and you’ll be all set to unlock our features and grow your firm."
        },
        {
          id: "q-2",
          question: "How do I cancel my subscription?",
          answer: "You can cancel anytime through your account settings. Go to “Subscriptions,” select “Cancel Subscription,” and confirm your choice. Your account will revert to the free plan at the end of the current billing period."
        },
        {
          id: "q-3",
          question: "What payment methods can I use?",
          answer: "We accept major credit and debit cards, including Visa, MasterCard, and American Express. In some regions, you may also use PayPal. Please check your payment options at checkout."
        }
      ]
    },
    {
      id: "f-2",
      category: "Packages and Plans",
      questions: [
        {
          id: "q-4",
          question: "Can I upgrade or downgrade later from the package I choose now?",
          answer: "Yes, you can upgrade or downgrade your package at any time by visiting your account settings."
        },
        {
          id: "q-5",
          question: "What’s included in each package?",
          answer: "Each package offers different features tailored to your needs, such as job posting limits, advanced candidate filters, analytics, and support levels. Check the \"Pricing\" page for full package details."
        },
        {
          id: "q-6",
          question: "What are the payment terms?",
          answer: "you can choose from monthly or annual billing, with potential discounts for annual plans."
        },
        {
          id: "q-7",
          question: "What support is provided?",
          answer: "Our packages include standard or priority customer support, depending on the tier. Priority support ensures quicker response times."
        },
        {
          id: "q-8",
          question: "Are there additional fees?",
          answer: "Typically, there are no extra fees beyond the fees included in your chosen plan. Any optional add-ons or features will be clearly stated.So you dont have to worry about."
        }
      ]
    }
  ]
}
