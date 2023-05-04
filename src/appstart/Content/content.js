import React from 'react';
import {useLocation, useSearchParams} from "react-router-dom";

const Content = (props) => {

    const location = useLocation();
    console.log(location);
    let url = location.pathname;
    let lastIndex = url.lastIndexOf("/")
    url = Number(url.substring(lastIndex+1))-1
    console.log(url)

    let letterData = props.lettersData[url]
    console.log(letterData)



    return (
        <div>
            <h1>Письмо № {letterData.num}</h1>
            <h2>Получатель: {letterData.receiver}</h2>
            <p>Тема: {letterData.theme}</p>
        </div>
    );
};

export default Content;