import Image from "next/image";
import PinInput from "@/components/pinInput";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  st: any;
  pin: string[];
  isPinValid: boolean | undefined;
  handlePinChange: (pin: string[]) => void;
  handlePinComplete: (pin: string) => void;
  pinInputRef: React.RefObject<HTMLInputElement | null>;
  phone: string | null;
  step: string;
};

const ConfirmStep = ({
  st,
  pin,
  isPinValid,
  handlePinChange,
  handlePinComplete,
  pinInputRef,
  phone,
  step,
}: Props) => {
  const router = useRouter();

  return (
    <div className={`${st.confirm_block} ${step == 'confirm' ? st.active : ""}`}>
      <Image
        className={st.logo}
        src="/images/logo-img.png"
        width={147 * 4}
        height={134 * 4}
        alt="SkillForge"
      />
      <h1>Подтверждение номера</h1>
      <span className={st.hello}>
        Спасибо! На номер {phone} совершен звонок. Введи последние 4 цифры
        звонящего номера в поле ниже
      </span>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          router.replace("/");
        }}
      >
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
          <span
            className={`${st.alert} ${isPinValid === false ? st.active : ""}`}
          >
            После нескольких неудачных попыток ввода доступ будет заморожен на 2
            часа
          </span>
        </label>
        <button
          disabled={isPinValid !== true}
          type="submit"
          className="btn primary"
        >
          Войти в аккаунт
        </button>
      </form>
    </div>
  );
};

export default ConfirmStep;
