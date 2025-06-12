"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import st from "./styles.module.sass";
import PhoneStep from "./components/phoneStep";
import ConfirmStep from "./components/confirmStep";
import LoginInfo from "./components/LoginInfo";

const LoginPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<"init" | "confirm">("init");
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [phone, setPhone] = useState<string | null>(null);
  const [pinCode, setPinCode] = useState(["", "", "", ""]);
  const [isPinCorrect, setIsPinCorrect] = useState<boolean | undefined>(
    undefined,
  );

  const phoneFormRef = useRef<HTMLFormElement>(null);
  const pinInputRef = useRef<HTMLInputElement>(null);

  const handlePhoneChange = (value: string, valid: boolean): void => {
    setPhone(value);
    setIsPhoneValid(valid);
  };

  const handlePinChange = (updatedPin: string[]): void => {
    setPinCode(updatedPin);
  };

  const handlePinComplete = (enteredPin: string): void => {
    const isCorrect = enteredPin === "1234";
    setIsPinCorrect(isCorrect);
    console.log(isCorrect ? "Пин-код верный!" : "Пин-код неверный!");
  };

  const goToConfirmStep = (): void => {
    setCurrentStep("confirm");
  };

  const handleFormKeyDown = (e: React.KeyboardEvent<HTMLFormElement>): void => {
    if (e.key === "Enter" && isPhoneValid && currentStep === "init") {
      e.preventDefault();
      goToConfirmStep();
    }
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (isPhoneValid && currentStep === "init") {
      goToConfirmStep();
    }
  };

  useEffect(() => {
    if (currentStep === "confirm" && pinInputRef.current) {
      pinInputRef.current.focus();
    }
  }, [currentStep]);

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
        <div
          className={`${st.container} ${currentStep === "confirm" ? st.confirm : ""}`}
        >
          <PhoneStep
            st={st}
            step={currentStep}
            isPhoneValid={isPhoneValid}
            formRef={phoneFormRef}
            handleKeyDown={handleFormKeyDown}
            handleSubmit={handleFormSubmit}
            handleClick={goToConfirmStep}
            handlePhoneChange={handlePhoneChange}
          />

          <ConfirmStep
            st={st}
            step={currentStep}
            pin={pinCode}
            isPinValid={isPinCorrect}
            handlePinChange={handlePinChange}
            handlePinComplete={handlePinComplete}
            pinInputRef={pinInputRef}
            phone={phone}
          />
        </div>

        <LoginInfo st={st} step={currentStep} />
      </main>
    </>
  );
};

export default LoginPage;
