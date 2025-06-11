"use client";
import st from "./styles.module.sass";
import Image from "next/image";
import Link from "next/link";
import {Phone} from "lucide-react";
import PhoneInput from "@/components/phoneInput";
import {useState} from "react";

const LoginPage = () => {

  const [step, setStep] = useState('init');

  const [isPhoneValid, setIsPhoneValid] = useState(false);

  const handlePhoneChange = (phone: string, isValid: boolean) => {
    setIsPhoneValid(isValid);
  };

  const handleClick = async () => {
    setStep('confirm');
  }

  return (
    <>
      <Image
        className={st.bcg}
        src={"/images/login-bcg.png"}
        width={960}
        height={540}
        alt=""
      />
      <main className={st.main}>
        <div className={`${st.container} ${step == 'confirm' ? st.confirm : ''}`}>
          <div className={`${st.content} ${step == 'confirm' ? st.confirm : ''}`}>
            <Image
              className={st.logo}
              src={"/images/logo-img.png"}
              width={147 * 4}
              alt={"SkillForge"}
              height={134 * 4}
            />
            <h1>Вход в аккаунт</h1>
            <span className={st.hello}>
              Добро пожаловать! Если ты хочешь войти в аккаунт, пожалуйста,
              введи в поле ниже твой номер телефона
            </span>
            <label>
              <span>Мобильный номер</span>
              <div className={st.input__wrapper}>
                <Phone className={st.icon} />
                <PhoneInput onPhoneChange={handlePhoneChange} />
              </div>
            </label>
            <small>
              Выполняя вход в аккаунт я подтверждаю согласие с{" "}
              <Link href={"#"}>условиями пользования</Link>
            </small>
            <button disabled={!isPhoneValid || step == 'confirm'} onClick={handleClick} className={"primary"}>Отправить код</button>
          </div>
          <div className={`${st.confirm_block} ${step == 'confirm' ? st.active : ''}`}>
            <Image
                className={st.logo}
                src={"/images/logo-img.png"}
                width={147 * 4}
                alt={"SkillForge"}
                height={134 * 4}
            />
            <h1>Подтверждение номера</h1>
            <span className={st.hello}>
              Спасибо! Теперь введи в поле ниже последние 4 цифры звонящего номера. На звонок можно не отвечать
            </span>
            <label>
              <span>Код подтверждения</span>
              <div className={st.input__wrapper}>
                <Phone className={st.icon} />
                <PhoneInput onPhoneChange={handlePhoneChange} />
              </div>
            </label>
            <small>
              Выполняя вход в аккаунт я подтверждаю согласие с{" "}
              <Link href={"#"}>условиями пользования</Link>
            </small>
            <button disabled={!isPhoneValid} onClick={handleClick} className={"primary"}>Войти в аккаунт</button>
          </div>
        </div>
        <div className={`${st.info} ${step == 'confirm' ? st.confirm : ''}`}>
          <div className={st.content}>
            <h1>Еще нет аккаунта?</h1>
            <span className={st.hello}>
              Твой аккаунт создается автоматически, когда ты покупаешь курс, и
              привязывается к номеру телефона. Ты все же можешь создать аккаунт
              вручную
            </span>
            <Link href={'#'} className="primary btn">Зарегистрироваться</Link>
            <Link className={st.logo_sk} href={"https://sk.ru"}>
              <Image
                src={"/images/sk-logo.png"}
                width={150 * 3}
                height={34 * 3}
                alt={"Сколково - участник"}
              ></Image>
            </Link>
              <small className={st.copyright}>
                &copy; ООО “СПЕЙСКУРС”, 2025.<br/>Все права защищены.
              </small>
          </div>
        </div>
      </main>
    </>
  );
};

export default LoginPage;
