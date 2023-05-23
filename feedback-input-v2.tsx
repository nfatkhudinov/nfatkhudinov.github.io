//@ts-nocheck
//<FeedbackInputv2 check={LENGTH, WHITELIST} whitelist={} maxLength=13 minLength=2/>
import React, {useEffect, useState} from 'react';
import styled from "styled-components";

/** **************************************
 Список props, которые можно передать в данный компонент:

 callback -  функция обратного вызова для получения данных из компоненты инпута. Принимает два значения - value и error.
             value - значение, введенное в инпут. Если error === NO_ERROR, значение валидное. Обязательное значение.

 checktype - тип проверки введенных данных. Возможные варианты:

                'WHITELIST' - проверка осуществляется на основании сравнения с
                              вайтлистом, переданном в props "whitelist" (см. ниже).
                              Введенные символы, не входящие в whitelist, будут приводить к ошибке.

                'BLACKLIST' - проверка осуществляется на основании сравнения с
                              вайтлистом, переданном в props "blacklist" (см. ниже).
                              Введенные символы, входящие в blacklist, будут приводить к ошибке.

                'EMAIL' -     проверка на наличие символа @ в строке

                'TELEPHONE' - допустимые символы - только цифры

 whitelist - строка, используется при объявлении checktype={'WHITELIST'}. Каждый символ строки будет разрешен к вводу.

 blacklist - строка, используется при объявлении checktype={'BLACKLIST'}. Каждый символ строки будет запрещен к вводу.

 placeholder - строка, показываемая до ввода данных в инпут (встроенное средство HTML).

 minlength - минимальная длина строки. При вводе строки меньшей длины, будет выведена ошибка.

 maxlength - максимальная длина строки. При вводе строки большей длины, будет выведена ошибка. Данное значение также
             передается напрямую в input, чтобы ограничить максимальную длину средствами HTML. Проверка будет все равно
             осуществлена для дополнительной защиты.

 Свойства minlength и maxlength будут учитываться при любом типе checktype, а также без него.
 ===================================================================================================================

 Пример использования:

 <FeedbackInputV2 checktype={'BLACKLIST'} blacklist={'qwerty'} minlength={2} maxlength={7} placeholder={"Введите строку"}/>
                    __________________      _________________   __________   _____________  ____________________________
                        тип проверки            черный список    мин.длина      макс.длина   значение по умолчанию


 **/


const StyledInput = styled.input`
  border-bottom: ${p=>(p.error!=='NO_ERROR')&&(p.error!==undefined)?'2px solid #D37A3B':'1px solid #E6E6E6;'};
  padding: 14px 0;
  font-family: 'DIN Next W1G';
  font-style: normal;
  font-weight: 300;
  font-size: 20px;
  line-height: 120%;
  background: #F8F8F8;
  width: 100%;
`

const Error = styled.div`
  font-family: 'DIN Next W1G';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 120%;
  color: #D37A3B;
`
const FeedbackInputV2 = ({checktype, whitelist, blacklist, minlength, maxlength, placeholder, callback}) => {



    /** Список типов возможных ошибок. От ошибок зависит сообщение, выводимое под input.
     * Возможно добавление своих типов ошибок
     *
     * ЗАРЕЗЕРВИРОВАННЫЕ ТИПЫ ОШИБОК:**/
    const NO_ERROR='NO_ERROR'
    const TOO_LONG='TOO_LONG'
    const TOO_SHORT='TOO_SHORT'

    /** ПОЛЬЗОВАТЕЛЬСКИЕ ТИПЫ ОШИБОК **/
    const INVALID_EMAIL='INVALID_EMAIL'
    const INVALID_SYMBOL='INVALID_SYMBOL'


    /** Два состояние для хранения введенного значения и возможной ошибки **/
    const [value, setValue] = useState();
    const [error, setError] = useState();

    /** Обработчик, вызываемый при изменении input **/
    const changeHandler = (event)=>{   //Передача значения из инпута в стейт
        setValue(event.target.value)
    }

    /** Функция, осуществляющая проверку введенного значения на ошибку.
     * Проверка осуществляется через хук useEffect при каждом изменении введенного значения.
     * Возможно добавление пользовательских проверок. **/

    const checkOnErrors = ()=>{
        if (value!==undefined) {
            let result = NO_ERROR;
            const arr = Array.from(value)
            switch (checktype){
                /** Предусмотренные проверки **/
                case 'WHITELIST':
                                    arr.map(i => !Array.from(whitelist).includes(i) && (result = INVALID_SYMBOL))
                                    arr.length<minlength&&(result = TOO_SHORT)
                                    arr.length>maxlength&&(result = TOO_LONG)
                                    return result;
                /** Слева - проверка, справа - присваивание типовой ошибки в переменную
                 * Функция возвращает ошибку, записанную в переменную в result. В state ошибка передается
                 * через хук UseEffect, см. строку 90 **/
                case 'EMAIL':
                                    !arr.includes('@') && (result = INVALID_EMAIL)
                                    arr.length<minlength&&(result = TOO_SHORT)
                                    arr.length>maxlength&&(result = TOO_LONG)
                                    return result;
                case 'BLACKLIST':
                                    arr.map(i => Array.from(blacklist).includes(i) && (result = INVALID_SYMBOL))
                                    arr.length<minlength&&(result = TOO_SHORT)
                                    arr.length>maxlength&&(result = TOO_LONG)
                                    return result;

                case 'TELEPHONE':
                                    arr.map(i => Array.from(blacklist).includes(i) && (result = INVALID_SYMBOL))
                                    arr.length<minlength&&(result = TOO_SHORT)
                                    arr.length>maxlength&&(result = TOO_LONG)
                                    return result;
                default: arr.length<minlength&&(result = TOO_SHORT)
                         arr.length>maxlength&&(result = TOO_LONG)
                         return result;
            }
        }
    }

    /** Вызов проверки при изменении значения инпута в стейте **/
    useEffect(()=>setError(checkOnErrors), [value])

    /** Передача данных родительскому компоненту **/
    useEffect(()=>callback(value, error), [value, error])

    /** ОТЛАДКА **/
    useEffect(()=>console.log(value,error), [value,error])

    /** Выбор сообщения для вывода под инпутом в случае ошибки.
     * Возможно добавление пользовательских сообщений **/
    const showError = ()=>{
        switch (error){
            case TOO_LONG: return <div>Слишком длинное</div>;
            case TOO_SHORT: return <div>Слишком короткое</div>;
            case INVALID_EMAIL: return <div>Неправильный ввод e-mail</div> ;
            case INVALID_SYMBOL: return <div>Неправильный символ</div> ;
            default: return;
        }
    }

    return (
        <>
        <StyledInput onChange={(event)=>changeHandler(event)} placeholder={placeholder} maxLength={maxlength} error={error}/>
        <Error>{showError()}</Error>
        </>
    );
};

export default FeedbackInputV2;