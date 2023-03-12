import { setStatusAuthorization, setStatusRecovery, setStatusRegistration } from "../../../redux/slices/auth/auth"

export const ErrorText = {
    title: "Данные не сохранились",
    subtitle: "Что-то пошло не так и ваша регистрация не завершилась. Попробуйте ещё раз",
    button: "повторить",
    action: setStatusRegistration,
    type: "registration",
}

export const ErrorCoincidence = {
    title: "Данные не сохранились",
    subtitle: "Такой логин или e-mail уже записан в системе. Попробуйте зарегистрироваться по другому логину или e-mail.",
    button: "назад к регистрации",
    action: setStatusRegistration,
    type: "registration",
}

export const ErrorAuth = {
    title: "Вход не выполнен",
    subtitle: "Что-то пошло не так. Попробуйте ещё раз",
    button: "повторить",
    action: setStatusAuthorization,
    type: "login",
}

export const ErrorRecovery = {
    title: "Данные не сохранились",
    subtitle: "Что-то пошло не так. Попробуйте ещё раз",
    button: "повторить",
    action: setStatusRecovery,
    type: "password",
}

export const SuccessRegistration = {
    title: "Регистрация успешна",
    text: "Регистрация прошла успешно. Зайдите в личный кабинет, используя свои логин и пароль",
    button: "вход",
    path: "/auth",
}

export const SuccessRecovery = {
    title: "Новые данные сохранены",
    text: "Зайдите в личный кабинет, используя свои логин и новый пароль",
    button: "вход",
    path: "/auth",
}