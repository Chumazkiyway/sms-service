import React from 'react';
import { Link } from 'react-router-dom';

class Home extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return (    
        <div class="jumbotron pos-center-block">
            <h1 class="display-4">Описание</h1>
            <p class="lead">Предназначение</p>
            <p>Программный продукт предназначен для рассылки СМС сообщений.
            В данной работе для рассылки СМС мы использовали шлюз <a href="https://smsclub.mobi">smsclub</a> </p>
            <hr class="my-4"/>
            <h1 class="display-4">Как пользоваться</h1>
            <p class="lead">Регистрация</p>
            <img src="./register.png" class="img-fluid" alt="Responsive image"/><br/><br/>
            <p>Для начала вам необходимо зарегистрироваться, для использования СМС рассылки и сохрания общей информации (шаблон, токен, альфа имя).
            Мы под логином и паролем подразумеваем ваши логин и пароль с аккаунта <a href="https://smsclub.mobi">smsclub</a> </p>
            <hr class="my-4"/>
            <p class="lead">Авторизация</p>
            <img src="./login.png" class="img-fluid" alt="Responsive image"/><br/><br/>
            <p>Слудующий этап это авторизация </p>
            <hr class="my-4"/>
            <p class="lead">Личный кабинет</p>
            <img src="./send.jpg" class="img-fluid" alt="Responsive image"/><br/><br/>
            <p>Пройдя авторизацию вы попадаете в личный кабинет, в нем вы заполняете таблицу получателей вашей СМС рассылки. </p>
            <hr class="my-4"/>
            <p class="lead">Настройка аккаунта</p>
            <img src="./settings.jpg" class="img-fluid" alt="Responsive image"/><br/><br/>
            <p>Пройдя авторизацию вы попадаете в личный кабинет, вам необходимо настроить ваш аккаунт, создать шаблон сообщения (по желанию), ввести токен вашего аккаунта и альфа имя
            После этих шагов, вы можете приступать к рассылке. Удачи!. </p>
            <hr class="my-4"/>      
        </div>
        );
    }
}

export default Home
