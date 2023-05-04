import React from 'react';
import Letterstable from "./LettersTable/letterstable";

const Leftcontainer = (props) => {
    return (
        <div>
            left container!
            <Letterstable lettersData={props}/>
        </div>
    );
};

export default Leftcontainer;