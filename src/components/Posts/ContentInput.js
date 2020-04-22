import React, { Fragment } from 'react'

export default function ContentInput(props) {
    return (
        <input id={props.id} type="text" onChange={props.onChange} value={props.content} /> 
    )
}
