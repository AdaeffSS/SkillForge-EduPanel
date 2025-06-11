import React, { useState } from 'react';

interface PhoneInputProps {
    onPhoneChange: (phone: string, isValid: boolean) => void;
}

const PhoneInput: React.FC<PhoneInputProps> = ({ onPhoneChange }) => {
    const [phone, setPhone] = useState<string>('');

    const formatPhoneNumber = (value: string) => {
        const digits = value.replace(/\D/g, '');
        if (!digits) return '';
        let formatted = '+7';
        if (digits.length > 1) formatted += ` (${digits.slice(1, 4)}`;
        if (digits.length > 4) formatted += `) ${digits.slice(4, 7)}`;
        if (digits.length > 7) formatted += `-${digits.slice(7, 9)}`;
        if (digits.length > 9) formatted += `-${digits.slice(9, 11)}`;
        return formatted;
    };

    const handleChange = (e: { target: { value: any; }; }) => {
        const formattedValue = formatPhoneNumber(e.target.value);
        setPhone(formattedValue);
        const digits = e.target.value.replace(/\D/g, '');
        const isValid = digits.length === 11;
        onPhoneChange(e.target.value, isValid)
    };

    return (
        <div>
            <input
                type="tel"
                value={phone}
                onChange={handleChange}
                placeholder="+7 (000) 000-00-00"
                maxLength={18}
            />
        </div>
    );
};

export default PhoneInput;