// pages
import Home from "@/views/Home";
import Search from "@/views/Search";

// layouts
import DefaultLayout from "@/layouts/DefaultLayout";

export const routes = [
    {
        name: "Home",
        path: "/",
        component: Home,
        meta: {
            publicRoute: true
        }
    },
    {
        path: "/",
        component: DefaultLayout,
        children: [
            {
                name: "Search",
                path: "/search",
                component: Search,
                meta: {
                    publicRoute: true
                }
            }
        ]
    }
];
