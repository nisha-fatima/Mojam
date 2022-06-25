import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";

export default function Protected(props) {
    let Cmp = props.Cmp
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('userData')) {
            navigate ('/login')
        }
    }, [])
    return (
        <div>
            <Cmp />
        </div>
    )
}