import React, {Fragment} from 'react';
import loading from "../../images/loading.gif"

export const Spinner = () => {
    return (
        <Fragment>
           <img
           src={loading}
           style={{width: '80px', margin: 'auto', marginTop: "100px", display: 'block'}}
           alt='Loading'
           /> 
        </Fragment>
    )
}
