//@ts-nocheck
import React, {useState} from 'react';

import Button from "@/ui/components/Button/Button";
import Container from "@/ui/components/Container/Container";
import FeedbackInputV2 from "@/ui/components/Feedback/feedback-input-v2";
import {Select} from "@/ui/components/Select";
import {Box} from "~primitives/Box";
import {Flex} from "~primitives/Flex";
import Typography from "~primitives/Typography/Typography";


const Feedback = () => {

    /** ОПИСАНИЕ СОСТОЯНИЯ ФОРМЫ **/

    const [feedbackFields, setFeedbackFields] = useState({
        inputName: "",
        inputSurname: "",
        inputTelephone: "",
        inputOrganization: "",
        inputEmail: "",
        error: false,
    })

    /** Колбэки, передаваемые в инпуты для получения значений.
     * feedback-input возвращает два значения - value (введенная строка) и err (ошибка с указанием причины)
     * см. комментарии в feedback-input. **/


    /** Колбэк устанавливает значение value, полученное из инпута, в соответствующее поле стейта
     * Второй строкой, при наличии ошибки, ставит в стейт флаг error=true. Это используется для
     * установки button в состояние disabled при наличии ошибок в одном из инпутов
     * NO_ERROR - стандартный ответ от инпут на отсутствие ошибок**/

    const getNameState = (value, err) => {
        setFeedbackFields(feedbackFields=>({...feedbackFields, inputName: value}))
        setFeedbackFields(feedbackFields=>({...feedbackFields, error: (err !== 'NO_ERROR')}))
        }
    const getSurnameState = (value, err) => {
        setFeedbackFields(feedbackFields=>({...feedbackFields, inputSurname: value}))
        setFeedbackFields(feedbackFields=>({...feedbackFields, error: (err !== 'NO_ERROR')}))
    }
    const getTelephoneState = (value, err) => {
        setFeedbackFields(feedbackFields=>({...feedbackFields, inputTelephone: value}))
        setFeedbackFields(feedbackFields=>({...feedbackFields, error: (err !== 'NO_ERROR')}))
    }
    const getEmailState = (value, err) => {
        setFeedbackFields(feedbackFields=>({...feedbackFields, inputEmail: value}))
        setFeedbackFields(feedbackFields=>({...feedbackFields, error: (err !== 'NO_ERROR')}))
    }
    const getOrganizationState = (value, err) => {
        setFeedbackFields(feedbackFields=>({...feedbackFields, inputOrganization: value}))
        setFeedbackFields(feedbackFields=>({...feedbackFields, error: (err !== 'NO_ERROR')}))
    }

    /** Условия отрисовки кнопки.
     * В случае если ни одно из полей не пустое и
     * флаг ошибки установлен в false, кнопка активна **/

    const SendButton = ()=>{
        if (feedbackFields.inputName!==undefined&&
            feedbackFields.inputSurname!==undefined&&
            feedbackFields.inputTelephone!==undefined&&
            feedbackFields.inputOrganization!==undefined&&
            feedbackFields.inputEmail!==undefined&&
            !feedbackFields.error) return <Button variant='black'>Отправить</Button>
        else return <Button variant='black' disabled>Отправить</Button>
    }
    console.log(feedbackFields.inputSurname);


    return (
        <Container padding={14} mt={20} backgroundColor={"#F8F8F8"}>
            <Typography variant={['headline_h2_mobile', 'headline_h2']}>оставить заявку</Typography>

            <Flex flexDirection={"row"} justifyContent={"space-between"} flexWrap={"wrap"}>
                <Box width={['100%', '100%', '50%']} padding={30}>  <FeedbackInputV2 callback={getNameState} checktype={'BLACKLIST'} blacklist={'qwerty'} minlength={2} maxlength={7} placeholder={"Введите имя*"}/>    </Box>
                <Box width={['100%', '100%', '50%']} padding={30}>   <FeedbackInputV2 callback={getSurnameState} checktype={'BLACKLIST'} blacklist={'qwerty'} minlength={2} maxlength={7} placeholder={"и фамилию*"}/>   </Box>
                <Box width={['100%', '100%', '50%']} padding={30}><Select onSelect={(a)=>(console.log(a))} placeholder={"тип объекта*"} >
                    <option disabled>Выберите героя</option>
                    <option value="Чебурашка">Чебурашка</option>
                    <option selected value="Крокодил Гена">Крокодил Гена</option>
                    <option value="Шапокляк">Шапокляк</option>
                    <option value="Крыса Лариса">Крыса Лариса</option>
                </Select>

                </Box>
                <Box width={['100%', '100%', '50%']} padding={30}>  <FeedbackInputV2 callback={getOrganizationState} checktype={'BLACKLIST'} blacklist={'qwerty'} minlength={2} maxlength={7} placeholder={"Введите строку"}/>    </Box>
                <Box width={['100%', '100%', '50%']} padding={30}>   <FeedbackInputV2 callback={getTelephoneState} checktype={'BLACKLIST'} blacklist={'qwerty'} minlength={2} maxlength={7} placeholder={"Введите строку"}/>   </Box>
                <Box width={['100%', '100%', '50%']} padding={30} >   <FeedbackInputV2 callback={getEmailState} checktype={'BLACKLIST'} blacklist={'qwerty'} minlength={2} maxlength={7} placeholder={"Введите строку"}/>  </Box>
            </Flex>
            <Flex flexDirection={"row"}>
                <div>{SendButton()}</div>
                <div>нажимая кнопку вы соглашаетесь</div>
            </Flex>
        </Container>





    );
};

export default Feedback;