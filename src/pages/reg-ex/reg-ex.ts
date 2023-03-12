export const EmailValidation = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

export const AvailabilityNumber = /[\d]/;
export const EnglishSymbols = /[a-zA-Z]/;
export const LoginValidation = /^[A-Za-z0-9]+$/;

export const NumberValidation = /^(\+375|80) [(](29|25|44|33)[)] (\d{3})-(\d{2})-(\d{2})$/;

export const Uppercase = /^[^A-ZА-ЯЁ]*$/;
export const PasswordLength = /^[0-9a-zA-Zа-яА-ЯёЁ!@#$%^&*]{8,}$/;