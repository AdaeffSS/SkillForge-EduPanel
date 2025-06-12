"use client";
import st from "./styles.module.sass";
import Image from "next/image";
import Link from "next/link";
import { Phone } from "lucide-react";
import PhoneInput from "@/components/phoneInput";
import PinInput from "@/components/pinInput";
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

const LoginPage: React.FC = () => {

  const router = useRouter();

  const [step, setStep] = useState<"init" | "confirm">("init");
  const [isPhoneValid, setIsPhoneValid] = useState<boolean>(false);
  const [pin, setPin] = useState<string[]>(["", "", "", ""]);
  const [isPinValid, setIsPinValid] = useState<boolean | undefined>(undefined);
  const formRef = useRef<HTMLFormElement>(null);
  const pinInputRef = useRef<HTMLInputElement>(null);

  const handlePhoneChange = (phone: string, isValid: boolean): void => {
    setIsPhoneValid(isValid);
    setPhone(phone);

  };

  const [phone, setPhone] = useState<string | null>(null);

  const handlePinChange = (newPin: string[]): void => {
    setPin(newPin);
  };

  const handlePinComplete = (pin: string): void => {
    const isValid = pin === "1234";
    setIsPinValid(isValid);
    console.log(isValid ? "Пин-код верный!" : "Пин-код неверный!");
  };

  const handleClick = (): void => {
    setStep("confirm");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>): void => {
    if (e.key === "Enter" && isPhoneValid && step === "init") {
      e.preventDefault();
      handleClick();
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (isPhoneValid && step === "init") {
      handleClick();
    }
  };


  useEffect(() => {
    if (step === "confirm" && pinInputRef.current) {
      pinInputRef.current.focus();
    }
  }, [step]);

  return (
      <>
        <Image
            className={st.bcg}
            src="/images/login-bcg.png"
            width={960}
            height={540}
            alt=""
        />
        <main className={st.main}>
          <div className={`${st.container} ${step === "confirm" ? st.confirm : ""}`}>
            <div className={`${st.content} ${step === "confirm" ? st.confirm : ""}`}>
              <form ref={formRef} onKeyDown={handleKeyDown} onSubmit={handleSubmit}>
                <Image
                    className={st.logo}
                    src="/images/logo-img.png"
                    width={147 * 4}
                    alt="SkillForge"
                    height={134 * 4}
                />
                <h1>Вход в аккаунт</h1>
                <span className={st.hello}>
                Добро пожаловать! Если ты хочешь войти в аккаунт, пожалуйста, введи в
                поле ниже твой номер телефона
              </span>
                <label>
                  <span>Мобильный номер</span>
                  <div className={st.input__wrapper}>
                    <Phone className={st.icon} />
                    <PhoneInput
                        className={st.input}
                        onPhoneChange={handlePhoneChange}
                    />
                  </div>
                </label>
                <small>
                  Выполняя вход в аккаунт я подтверждаю согласие с{" "}
                  <Link href="#">условиями пользования</Link>
                </small>
                <button
                    type="button"
                    disabled={!isPhoneValid || step === "confirm"}
                    onClick={handleClick}
                    className="btn primary"
                >
                  Отправить код
                </button>
              </form>
            </div>

            <div className={`${st.confirm_block} ${step === "confirm" ? st.active : ""}`}>
              <Image
                  className={st.logo}
                  src="/images/logo-img.png"
                  width={147 * 4}
                  alt="SkillForge"
                  height={134 * 4}
              />
              <h1>Подтверждение номера</h1>
              <span className={st.hello}>
              Спасибо! На номер {phone} совершен звонок. Введи последние 4 цифры
              звонящего номера в поле ниже
            </span>
              <label>
                <div className={st.input__wrapper}>
                  <PinInput
                      value={pin}
                      onChange={handlePinChange}
                      onComplete={handlePinComplete}
                      isValid={isPinValid}
                      containerClassName={st.pin__container}
                      inputClassName={st.pin__input}
                      errorClassName={st.pin__error}
                      successClassName={st.pin__success}
                      inputRef={pinInputRef}
                  />
                </div>
                <span className={`${st.alert} ${isPinValid === false ? st.active : ''}`}>
                После нескольких неудачных попыток ввода доступ будет заморожен на 2 часа
              </span>
              </label>
              <button
                  disabled={isPinValid !== true}
                  onClick={() => {
                    router.replace("/");
                  }}
                  className="btn primary"
              >
                Войти в аккаунт
              </button>
            </div>
          </div>
          <div className={`${st.info} ${step === "confirm" ? st.confirm : ""}`}>
            <div className={st.content}>
              <h1>Еще нет аккаунта?</h1>
              <span className={st.hello}>
              Твой аккаунт создается автоматически, когда ты покупаешь курс, и
              привязывается к номеру телефона. Ты все же можешь создать аккаунт вручную
            </span>
              <Link href="#" className="primary btn">
                Зарегистрироваться
              </Link>
              <Link className={st.logo_sk} href="https://sk.ru">
                <Image
                    src="/images/sk-logo.png"
                    width={150 * 3}
                    height={34 * 3}
                    alt="Сколково - участник"
                />
              </Link>
              <small className={st.copyright}>
                © ООО “СПЕЙСКУРС”, 2025.
                <br />
                Все права защищены.
              </small>
            </div>
          </div>
        </main>
      </>
  );
};

export default LoginPage;