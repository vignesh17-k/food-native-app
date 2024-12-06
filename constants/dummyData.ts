const my_profile = {
    name: "ByProgrammers",
    profile_image: require("../assets/images/profile.png"),
    address: "No. 88, Jln Padungan, Kuching"
}

const categories: any = [
    {
        id: 1,
        name: "Fast Food",
        icon: require("../assets/icons/burger.png")
    },
    {
        id: 2,
        name: "Fruit Item",
        icon: require("../assets/icons/cherry.png")
    },
    {
        id: 3,
        name: "Rice Item",
        icon: require("../assets/icons/rice.png")
    }
]

const find_item_by_name = (name:any) => {
    return popular_rails?.find(item => item?.name === name);
};


const popular_rails = [
    {
        id: 1,
        name: "Hamburger",
        description: "Chicken patty hamburger",
        categories: [1, 2],
        price: 15.99,
        calories: 78,
        isFavourite: true,
        image: require("../assets/dummyData/hamburger.png")
    },
    {
        id: 2,
        name: "Hot Tacos",
        description: "Mexican tortilla & tacos",
        categories: [1, 3],
        price: 10.99,
        calories: 78,
        isFavourite: false,
        image: require("../assets/dummyData/hot_tacos.png")
    },
    {
        id: 3,
        name: "Veg Biryani",
        description: "Indian Vegetable Biryani",
        categories: [1, 2, 3],
        price: 10.99,
        calories: 78,
        isFavourite: true,
        image: require("../assets/dummyData/veg_biryani.png")
    },
    {
        id: 4,
        name: "Wrap Sandwich",
        description: "Grilled vegetables sandwich",
        categories: [1, 2],
        price: 10.99,
        calories: 78,
        isFavourite: true,
        image: require("../assets/dummyData/wrap_sandwich.png")
    }
]


const menu = [
    {
        id: 1,
        name: "Featured",
        list: [
            find_item_by_name("Hamburger"),
            find_item_by_name("Hot Tacos"),
            find_item_by_name("Veg Biryani")
        ]
    },
    {
        id: 2,
        name: "Nearby you",
        list: [
            find_item_by_name("Hamburger"),
            find_item_by_name("Veg Biryani"),
            find_item_by_name("Wrap Sandwich")
        ]
    },
    {
        id: 3,
        name: "Popular",
        list: [
            find_item_by_name("Hamburger"),
            find_item_by_name("Hot Tacos"),
            find_item_by_name("Wrap Sandwich")
        ]
    },
    {
        id: 4,
        name: "Newest",
        list: [
            find_item_by_name("Hamburger"),
            find_item_by_name("Hot Tacos"),
            find_item_by_name("Veg Biryani")
        ]
    },
    {
        id: 5,
        name: "Trending",
        list: [
            find_item_by_name("Hamburger"),
            find_item_by_name("Veg Biryani"),
            find_item_by_name("Wrap Sandwich")
        ]
    },
    {
        id: 6,
        name: "Recommended",
        list: [
            find_item_by_name("Hamburger"),
            find_item_by_name("Hot Tacos"),
            find_item_by_name("Wrap Sandwich")
        ]
    }
];


const Constants = {
    my_profile,
    categories,
    popular_rails,
    menu
}

export default Constants 