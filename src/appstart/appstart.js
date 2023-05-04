import React from 'react';
import Leftcontainer from "./LeftContainer/leftcontainer";
import Content from "./Content/content";
import {BrowserRouter, Route, Router, Routes} from "react-router-dom";
import * as PropTypes from "prop-types";

let letterData = [
    {"id": 1, "num": "П-12", "receiver": "ООО \"ГАЗПРОМ\"", "receiverEmail": "fgui@gazprom.ru", "theme": "Об изменениях в контракте", "sended": false, "signed": true},
    {"id": 2, "num": "П-13", "receiver": "ООО \"Рога и копыта\"", "receiverEmail": "1i@gazprom.ru", "theme": "О рогах и копытах", "sended": false, "signed": false},
    {"id": 3, "num": "П-14", "receiver": "ООО \"ГАЗПРОМ\"", "receiverEmail": "fgu121@prom.ru", "theme": "Об изменениях", "sended": false, "signed": false},
    {"id": 4, "num": "П-15", "receiver": "ООО \"Копыта\"", "receiverEmail": "fgui@gaz2om.ru", "theme": "ОбКопытах", "sended": false, "signed": false},
    {"id": 5, "num": "П-16", "receiver": "ООО \"Рога\"", "receiverEmail": "fgui@g2rom.ru", "theme": "Об изменениях в контракте", "sended": true, "signed": false},
    {"id": 6, "num": "П-17", "receiver": "ООО \"Рога\"", "receiverEmail": "fgui23prom.ru", "theme": "Об изменениях в контракте", "sended": true, "signed": false},
    {"id": 7, "num": "П-18", "receiver": "ООО \"ГАЗПРОМ\"", "receiverEmail": "fgui@23zprom.ru", "theme": "Об изменениях в контракте", "sended": true, "signed": false},
]


function Switch(props) {
    return null;
}

Switch.propTypes = {children: PropTypes.node};
const Appstart = () => {
    return (
        <BrowserRouter>
        <div className="container">
            <div className="row">
                <div className="col">
                    <Leftcontainer lettersData={letterData} />
                </div>
                <div className="col">

                    <Routes>
                        <Route path="change/*" element={<Content lettersData={letterData}/>} />
                    </Routes>
                </div>
            </div>
        </div>
        </BrowserRouter>
    );
};

export default Appstart;
