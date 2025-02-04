import { icons } from "../constants"
import mock_data from "../constants/dummyData";

const constants = {
    route_names: {
        PreLogin: "onBoarding",
        ForgotPassword: "forgotPassword",
        Login: "login",
        ResetPassword: "resetPassword",
        PhoneLogin: "phoneLogin",
        OtpLogin: "otpScreen",
        MainApp: "mainApp",
        Home: "home",
        Search: "search",
        Cart: "cart",
        Wishlist: "wishlist",
        Notifications: "notifications"
    },
    bottom_tabs: [
        {
            id: 0,
            label: "Home",
            route: "home",
            icon: icons.home,
        },
        {
            id: 1,
            label: "Search",
            route: 'search',
            icon: icons.search,
        },
        {
            id: 2,
            label: "Cart",
            route: 'cart',
            icon: icons.cart
        },
        {
            id: 3,
            label: "Favourite",
            route: 'wishlist',
            icon: icons.favourite
        },
        {
            id: 4,
            label: "Notification",
            route: 'notifications',
            icon: icons.notification
        },
    ],
    sections: [
        { section: "delivery", data: [] },
        { section: "category", data: mock_data.categories },
        { section: "popular", data: mock_data.popular_rails },
        { section: "menu", data: mock_data.menu_data },
    ],
    onboarding_screens: [
        {
            id: 1,
            backgroundImage: require("../assets/images/background_01.png"),
            bannerImage: require("../assets/images/favourite_food.png"),
            title: "Choose a Favourite Food",
            description: "When you oder Eat Steet, we’ll hook you up with exclusive coupon, specials and rewards"
        },
        {
            id: 2,
            backgroundImage: require("../assets/images/background_02.png"),
            bannerImage: require("../assets/images/hot_delivery.png"),
            title: "Hot Delivery to Home",
            description: "We make food ordering fasr, simple and free-no matter if you order online or cash"
        },
        {
            id: 3,
            backgroundImage: require("../assets/images/background_01.png"),
            bannerImage: require("../assets/images/great_food.png"),
            title: "Receive the Great Food",
            description: "You’ll receive the great food within a hour. And get free delivery credits for every order."
        }
    ],
    screens: {
        main_layout: "MainLayout",
        home: "Home",
        search: "Search",
        cart: "Cart",
        favourite: "Favourite",
        notification: "Notification",
        my_wallet: "My Wallet",
    },
    delivery_time: [
        {
            id: 1,
            label: "10 Mins",
        },
        {
            id: 2,
            label: "20 Mins"
        },
        {
            id: 3,
            label: "30 Mins"
        }
    ],
    ratings: [
        {
            id: 1,
            label: 1,
        },
        {
            id: 2,
            label: 2,
        },
        {
            id: 3,
            label: 3,
        },
        {
            id: 4,
            label: 4,
        },
        {
            id: 5,
            label: 5,
        }
    ],
    tags: [
        {
            id: 1,
            label: "Burger"
        },
        {
            id: 2,
            label: "Fast Food"
        },
        {
            id: 3,
            label: "Pizza"
        },
        {
            id: 4,
            label: "Asian"
        },
        {
            id: 5,
            label: "Dessert"
        },
        {
            id: 6,
            label: "Breakfast"
        },
        {
            id: 7,
            label: "Vegetable"
        },
        {
            id: 8,
            label: "Taccos"
        }
    ]
}



export default constants