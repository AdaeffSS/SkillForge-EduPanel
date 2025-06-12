import React, { useRef, useEffect } from "react";

interface PinCodeInputProps {
  value: string[];
  onChange: (value: string[]) => void;
  onComplete: (pin: string) => void;
  isValid?: boolean;
  containerClassName?: string;
  inputClassName?: string;
  errorClassName?: string;
  successClassName?: string;
  inputRef?: React.RefObject<HTMLInputElement | null>;
}

const PinCodeInput: React.FC<PinCodeInputProps> = ({
  value,
  onChange,
  onComplete,
  isValid,
  containerClassName,
  inputClassName,
  errorClassName,
  successClassName,
  inputRef,
}) => {
  const inputs = useRef<HTMLInputElement[]>([]);
  const isProgrammaticFocus = useRef<boolean>(false);

  useEffect(() => {
    if (isValid !== false) return;

    if (value.some((digit) => digit === "")) return;

    const timer = setTimeout(() => {
      const clearPin = async () => {
        const newValue = [...value];
        for (let i = 3; i >= 0; i--) {
          if (newValue[i]) {
            newValue[i] = "";
            onChange([...newValue]);
            await new Promise((resolve) => setTimeout(resolve, 60));
          }
        }
        inputs.current[0]?.focus();
      };
      clearPin().then(() => {});
    }, 100);

    return () => clearTimeout(timer);
  }, [isValid, value, onChange]);

  const handleInput = (index: number, input: string): void => {
    if (!/^[0-9]?$/.test(input)) return;

    const newValue = [...value];
    newValue[index] = input;
    onChange(newValue);

    if (input && index < 3) {
      isProgrammaticFocus.current = true;
      inputs.current[index + 1]?.focus();
      isProgrammaticFocus.current = false;
    }

    if (index === 3 && input) {
      onComplete(newValue.join(""));
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ): void => {
    if (e.key === "Backspace" && !value[index] && index > 0) {
      isProgrammaticFocus.current = true;
      inputs.current[index - 1]?.focus();
      isProgrammaticFocus.current = false;
    } else if (e.key === "ArrowRight" && index < 3) {
      isProgrammaticFocus.current = true;
      inputs.current[index + 1]?.focus();
      isProgrammaticFocus.current = false;
    } else if (e.key === "ArrowLeft" && index > 0) {
      isProgrammaticFocus.current = true;
      inputs.current[index - 1]?.focus();
      isProgrammaticFocus.current = false;
    }
  };

  const handleFocus = (index: number): void => {
    if (isProgrammaticFocus.current) return;

    for (let i = 0; i < index; i++) {
      if (!value[i]) {
        inputs.current[i]?.focus();
        break;
      }
    }
  };

  return (
    <div className={containerClassName}>
      {value.map((val, index) => (
        <input
          key={index}
          type="text"
          value={val}
          onChange={(e) => handleInput(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onFocus={() => handleFocus(index)}
          ref={(el) => {
            if (el) {
              inputs.current[index] = el;
              if (inputRef && 'current' in inputRef) {
                inputRef.current = el;
              }
            }
          }}
          maxLength={1}
          readOnly={isValid === true}
          className={`${inputClassName} ${isValid === false ? errorClassName : ""} ${
            isValid === true ? successClassName : ""
          }`}
        />
      ))}
    </div>
  );
};

export default PinCodeInput;
