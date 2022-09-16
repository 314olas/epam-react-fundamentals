import React from "react"
import { RouteObject, useRoutes, Navigate } from 'react-router-dom';
import { UseModal } from "./hooks/app"
import Main from "../components/layout/Main";
import Search from "../pages/Search";
import Error from "../pages/Error";
import Movie from "../pages/Movie";

export const App = () => {
    UseModal()

    const routes: RouteObject[] = [
        {
            path: "/",
            element: <Navigate to='/search' />
        },
        {
            path: "search",
            children: [
                {
                    index: true,
                    element: <Search />,
                }
            ]
        },
        {
            path: "/movie",
            element: <Movie />
        },
        {
            path: "*",
            element: <Error />
        }
    ]

    return <Main>
        {useRoutes(routes)}
    </Main>


}
