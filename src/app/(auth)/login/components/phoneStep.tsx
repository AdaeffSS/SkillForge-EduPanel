import Image from "next/image";
import Link from "next/link";
import { Phone } from "lucide-react";
import PhoneInput from "@/components/phoneInput";
import React from "react";

type Props = {
  st: any;
  isPhoneValid: boolean;
  step: string;
  formRef: React.RefObject<HTMLFormElement | null>
  handleKeyDown: (e: React.KeyboardEvent<HTMLFormElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleClick: () => void;
  handlePhoneChange: (phone: string, isValid: boolean) => void;
};

const PhoneStep = ({
  st,
  isPhoneValid,
  step,
  formRef,
  handleKeyDown,
  handleSubmit,
  handleClick,
  handlePhoneChange,
}: Props) => (
  <div className={`${st.content} ${step === "confirm" ? st.confirm : ""}`}>
    <form ref={formRef} onKeyDown={handleKeyDown} onSubmit={handleSubmit}>
      <Image
        className={st.logo}
        src="/images/logo-img.png"
        width={147 * 4}
        height={134 * 4}
        alt="SkillForge"
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
          <PhoneInput className={st.input} onPhoneChange={handlePhoneChange} />
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
);

export default PhoneStep;
