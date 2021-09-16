// pages
import Home from "@/views/Home";

// layouts
import DefaultLayout from "@/layouts/DefaultLayout";

export const routes = [
    {
        path: "/",
        component: DefaultLayout,
        children: [
            {
                name: "Home",
                path: "/",
                component: Home,
                meta: {
                    publicRoute: true
                }
            }
        ]
    }
];
