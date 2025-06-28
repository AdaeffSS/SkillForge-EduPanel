"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import st from "./styles.module.sass";
import PhoneStep from "./components/phoneStep";
import ConfirmStep from "./components/confirmStep";
import LoginInfo from "./components/LoginInfo";
import api from "@/assets/lib/api";
import { isAxiosError } from "axios";

const LoginPage: React.FC = () => {
  // Шаг текущего состояния: "init" - ввод телефона, "confirm" - ввод кода
  const [currentStep, setCurrentStep] = useState<"init" | "confirm">("init");

  // Валидация телефона
  const [isPhoneValid, setIsPhoneValid] = useState(false);

  // Хранение номера телефона
  const [phone, setPhone] = useState<string | null>(null);

  // Массив для PIN-кода (4 символа)
  const [pinCode, setPinCode] = useState(["", "", "", ""]);

  // Статус корректности введённого PIN (true, false или undefined — ещё не проверено)
  const [isPinCorrect, setIsPinCorrect] = useState<boolean | undefined>(undefined);

  // Ссылки на элементы формы для фокуса и прочего
  const phoneFormRef = useRef<HTMLFormElement>(null);
  const pinInputRef = useRef<HTMLInputElement>(null);

  // При монтировании компонента — проверяем флаг accessRefresh=1 в URL
  useEffect(() => {
    console.log("[login] trying to refresh…");
    const url = new URL(window.location.href);
    const accessRefresh = url.searchParams.get("accessRefresh");
    const redirectPath = url.searchParams.get("redirect"); // получаем redirect

    console.log("accessRefresh param:", accessRefresh);
    console.log("redirect param:", redirectPath);

    if (accessRefresh === "1") {
      api.post("/auth/refresh")
          .then(() => {
            if (redirectPath) {
              // Редирект на переданный путь
              window.location.href = redirectPath;
            } else {
              // Если redirect не передан — по умолчанию на главную
              window.location.href = "/";
            }
          })
          .catch((err) => {
            console.warn("[login] refresh failed on accessRefresh=1", err);
            // Можно добавить обработку ошибки, например, показать уведомление
          });
    }
  }, []);

  // Обработчик изменения номера телефона
  const handlePhoneChange = (value: string, valid: boolean): void => {
    setPhone(value);
    setIsPhoneValid(valid);
  };

  // Обработчик изменения PIN-кода
  const handlePinChange = (updatedPin: string[]): void => {
    setPinCode(updatedPin);
  };

  // Обработчик завершения ввода PIN-кода — отправка кода на сервер
  const handlePinComplete = async (enteredPin: string): Promise<void> => {
    try {
      const response = await api.post(`/auth/verify-otp`, {
        phone,
        code: String(enteredPin),
      });

      if (response.status === 200) {
        setIsPinCorrect(true);
      }
    } catch (error) {
      console.error(error);

      if (isAxiosError(error)) {
        if (error.response?.status === 401) {
          setIsPinCorrect(false);
        }
      }
    }
  };

  // Переход на шаг подтверждения
  const goToConfirmStep = (): void => {
    setCurrentStep("confirm");
  };

  // Отправка формы с телефоном (запрос на отправку OTP)
  const submitForm = async (): Promise<void> => {
    if (isPhoneValid && currentStep === "init") {
      try {
        await api.post(`/auth/send-otp`, { phone });
        goToConfirmStep();
      } catch (error) {
        if (isAxiosError(error)) {
          console.error("Ошибка ответа от сервера:", error.response?.data || error.message);
        } else {
          console.error("Неизвестная ошибка:", error);
        }
      }
    }
  };

  // Обработка нажатия Enter в форме телефона
  const handleFormKeyDown = (e: React.KeyboardEvent<HTMLFormElement>): void => {
    if (e.key === "Enter" && isPhoneValid && currentStep === "init") {
      e.preventDefault();
      submitForm();
    }
  };

  // Обработка отправки формы телефона
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    await submitForm();
  };

  // После перехода на шаг подтверждения — ставим фокус на поле для ввода PIN-кода
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
          <div className={`${st.container} ${currentStep === "confirm" ? st.confirm : ""}`}>
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
