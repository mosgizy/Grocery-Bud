import React from 'react'

const message = ({ message }) => {
    return <p className={`text-center mb-2 rounded-md ${message[0] ? "bg-lime-200 text-lime-700" : "bg-red-200 text-red-700"}`}>{message[1]}</p>
}

export default message
