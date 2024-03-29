export const MENU = [
    {
        title: "CORE",
        menuItems: [{
            icon: 'fa-solid fa-chart-line',
            text: 'Dashboard',
            subMenu: [
                {
                    icon: '',
                    text: 'Defualt',
                }, {
                    icon: '',
                    text: 'Performance',
                }, {
                    icon: '',
                    text: 'Train',
                }
            ]
        },
        {
            icon: 'fa-solid fa-user',
            text: 'Users',
            url:'/users'
   
        }

        ]


    },
    {
        title: "Models",
        menuItems: [
            {
                icon: 'fa-solid fa-box',
                text: 'Production',
                url: "/models/Production"
            },
            {
                icon: 'fa-regular fa-square',
                text: 'Staging',
                url: "/models/staging"
            },
            {
                icon: 'fa-solid fa-boxes-stacked',
                text: 'Sandbox',
                url: "/models/sandbox"
            }

        ]

    },
    {
        title: "SUPPORT",
        menuItems: [
            {
                icon: 'fa-brands fa-youtube',
                text: 'Guides & Tutorials',
            },
            {
                icon: 'fa-solid fa-tv',
                text: 'Api Reference',
            },
            {
                icon: 'fa-solid fa-headset',
                text: 'Help Center',
            }

        ]

    },


]

export const MODULE_MENU = [
    {
        title: "",
        menuItems: [{
            icon: 'fa-solid fa-atom',
            text: 'classes',
            url: '/classes'
        }

        ]


    },
    {
        title: "",
        menuItems: [
            {
                icon: 'fa-solid fa-microchip',
                text: 'experiments',
                url: "/experiments"
            }

        ]

    },
    {
        title: "",
        menuItems: [
            {
                icon: 'fa-solid fa-chart-column',
                text: 'Staging',
                url: "/report"
            }
        ]

    },
    {
        title: "",
        menuItems: [

            {
                icon: 'fa-solid fa-gear',
                text: 'Sandbox',
                // url: ""
            }

        ]

    },
    {
        title: "SUPPORT",
        menuItems: [
            {
                icon: 'fa-solid fa-arrow-up-right-from-square',
                text: 'Guides & Tutorials',
            }

        ]

    },
    {
        title: "",
        menuItems: [

            {
                icon: 'fa-solid fa-code',
                text: 'Api Reference',
            },

        ]

    },


]

