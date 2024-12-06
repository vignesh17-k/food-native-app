import { icons } from "../constants"

const constants = {

    RouteNames: {
        PreLogin: "onBoarding",
        ForgotPassword: "forgotPassword",
        Login: "login",
        ResetPassword: "resetPassword",
        PhoneLogin: "phoneLogin",
        OtpLogin: "otpScreen",
        MainApp: "mainApp",
        Home: "home"
    },

    bottomTabs: [
        {
            id: 0,
            label: "Home",
            icon: icons.home,
        },
        {
            id: 1,
            label: "Search",
            icon: icons.search,
        },
        {
            id: 2,
            label: "Cart",
            icon: icons.cart
        },
        {
            id: 3,
            label: "Favourite",
            icon: icons.favourite
        },
        {
            id: 4,
            label: "Notification",
            icon: icons.notification
        },
    ],

    sections: [
        { section: "delivery", data: [] },
        { section: "category", data: [] },
        { section: "popular", data: [] },
        // { section: "recommended", data: [] },
        { section: "menu", data: [] },
    ],


    rails: [
        {
            id: 1,
            section: "category",
        },
        {
            id: 2,
            section: "popular",
        },
        // {
        //   id:3, 
        //     section: "recommended",
        // },
        {
            id: 4,
            section: 'menu'
        }
    ]


}



export default constants