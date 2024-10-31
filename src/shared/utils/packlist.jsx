import  freedomPack from "@assets/images/freedom-pack.svg";
import  professionalPack from "@assets/images/professional-pack.svg"

export const PackInfoList = [
    {
        primaryColor: "#089E86",
        secondaryColor: "#D9F4D9",
        tagIcon: "dot",
        cardTitle: "Active Pack",
        title: "Freedom Pack",
        titleIconName: "gift",
        image: freedomPack,
  
        packDetails: [
            {
                icon: "tick",
                title: "Brokerage fees",
                subTitle: "₹20/order",
            },
            {
                icon: "tick",
                title: "Savings",
                subTitle: "Standard",
            },
            {
                icon: "untick",
                title: "Dedicated dealer",
                subTitle: "No",
            },
            {
                icon: "tick",
                title: "MTF interest rate",
                subTitle: "18%",
            },
        ],
        amcDetails: {
            icon: "tick",
            title: "AMC",
            subTitle: "Free (₹431 from next year)",
        },
        price: "Free*",
        priceSubText: "for the first year",
    },
    {
        primaryColor: "#FABA0A",
        secondaryColor: "#FEF0CA",
        tagIcon: "star",
  
        cardTitle: "Active Pack",
        title: "Freedom Pack",
        titleIconName: "crown",
        image: professionalPack,
  
        packDetails: [
            {
                icon: "double-tick",
                title: "Brokerage fees",
                subTitle: "₹10/order",
            },
            {
                icon: "double-tick",
                title: "Savings",
                subTitle: "50% on all orders",
            },
            {
                icon: "double-tick",
                title: "Dedicated dealer",
                subTitle: "Yes",
            },
            {
                icon: "double-tick", title: "MTF interest rate",
                subTitle: "14%",
            },
        ],
        amcDetails: {
            icon: "double-tick", title: "AMC",
            subTitle: "Free",
        },
        price: "₹2500",
        priceSubText: <strike>₹3499</strike>,
    },
  ];