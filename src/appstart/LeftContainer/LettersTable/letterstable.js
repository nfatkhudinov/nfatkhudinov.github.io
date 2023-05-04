import React from 'react';
import {NavLink} from "react-router-dom";

const Letterstable = (props) => {
    let letters = props.lettersData.lettersData;

    const TrueOrFalseBalloon = (value) => {
        return value? (<img src={"https://e7.pngegg.com/pngimages/310/635/png-clipart-dot-dot-thumbnail.png"} width="5px" height="5px" />) : (<img src={"https://img2.freepng.ru/20180721/kha/kisspng-green-dot-corporation-business-clip-art-cercle-de-fermieres-d-ahuntsic-5b531221cc1a94.951280371532170785836.jpg"} width="5px" height="5px" />) ;
    }

    letters = letters.map((data)=>(
        <tr>
            <th scope="row">{data.id}</th>
            <td>{data.num}</td>
            <td>{data.receiver}</td>
            <td>{data.theme}</td>
            <td>{TrueOrFalseBalloon(data.signed)}</td>
            <td>{TrueOrFalseBalloon(data.sended)}</td>
            <td><NavLink to={`/change/${data.id}`}>Изменить</NavLink></td>
        </tr>
    ))


    return (
        <div>
            Hello from Letterstable!
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Номер письма</th>
                    <th scope="col">Получатель</th>
                    <th scope="col">Тема</th>
                    <th scope="col">Подписано</th>
                    <th scope="col">Отправлено</th>
                    <th scope="col">Изменить</th>
                </tr>
                </thead>
                <tbody>
                {letters}
                </tbody>
            </table>

        </div>
    );
};

export default Letterstable;