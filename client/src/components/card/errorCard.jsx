import React from 'react';
import {Alert} from "reactstrap";
const ErrorMessage = ({variant ="info",children})=>{
    return(
        <Alert color={variant} style={{fontSize:20}}><strong>{children}</strong></Alert>
    )
};
export default ErrorMessage;