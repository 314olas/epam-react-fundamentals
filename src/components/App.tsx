import React from "react"
import Component from "./Component"
import img from '../images/noimagelarge.png'

export default function App() {

    return (
        <div>
            <h1>App </h1>
            <img src={img} alt="" />
            <Component />
        </div>
    )
}