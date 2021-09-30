// pages
import Home from "@/views/Home";
import Result from "@/views/Result";

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
                name: "Result",
                path: "/result",
                component: Result,
                meta: {
                    publicRoute: true
                }
            }
        ]
    }
];
