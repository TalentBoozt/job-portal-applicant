export var SamplePricingUtilities = {
  packages: [
    {
      id: 1,
      name: "package name",
      shortDescription: "short description of package",
      price: 0,
      currency: "currency code", //Ex: USD
      payPeriod: "period", //Ex: month
      buttons: [
        {
          text: "button label",
          link: "#",
          class: "class name" //Ex: btn-2 (custom button class)
        }
      ],
      features: [
        {
          id: 1,
          name: "feature 1",
          description: "lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, totam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, totam."
        }
      ],
      recommended: false
    }
  ]
}
