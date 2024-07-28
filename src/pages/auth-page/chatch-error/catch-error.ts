
import { FirebaseError } from 'firebase/app';
import {
    EMAIL_ALREADY_IN_USE_ERROR,
    EMAIL_NOT_FOUND_ERROR,
    INVALID_EMAIL_ERROR, TOO_MANY_REQUESTS_ERROR, UNKNOWN_ERROR,
    WEAK_PASSWORD_ERROR,
    WRONG_PASSWORD_ERROR
} from "../../../shared/constants";
import {
    ERROR_NETWORK_REQUEST_FAILED,
    INVALID_API_KEY_ERROR, INVALID_CREDENTIALS_ERROR,
    OPERATION_NOT_ALLOWED_ERROR,
    USER_DISABLED_ERROR
} from "../../../shared/constants/errors/errors-constants.ts";



const catchErrorFirebase = (error:FirebaseError, setErrorCommon: any, setEmailError: any, setPasswordError: any) => {
    switch (error.code) {
        case 'auth/user-not-found':
            console.error('Пользователь с указанным email не найден.');
            setErrorCommon(EMAIL_NOT_FOUND_ERROR)
            break;
        case 'auth/invalid-email':
            console.error('Неверный формат email адреса.');
            setEmailError(INVALID_EMAIL_ERROR)
            break;
        case 'auth/weak-password':
            console.error('Слишком слабый пароль.');
            setPasswordError(WEAK_PASSWORD_ERROR)
            break;
        case 'auth/wrong-password':
            console.error('Неверный пароль.');
            setPasswordError(WRONG_PASSWORD_ERROR)
            break;
        case 'auth/user-disabled':
            console.error('Пользовательская учетная запись отключена.');
            setErrorCommon(USER_DISABLED_ERROR)
            break;
        case 'auth/operation-not-allowed':
            console.error('Операция не разрешена для этого пользователя или проекта.');
            setErrorCommon(OPERATION_NOT_ALLOWED_ERROR)
            break;
        case 'auth/too-many-requests':
            console.error('Слишком много попыток входа.');
            setErrorCommon(TOO_MANY_REQUESTS_ERROR)
            break;
        case 'auth/email-already-in-use':
            console.error('Email уже используется другой учетной записью.');
            setErrorCommon(EMAIL_ALREADY_IN_USE_ERROR)
            break;
        case 'auth/invalid-api-key':
            console.error('Неверный API ключ.');
            setErrorCommon(INVALID_API_KEY_ERROR)
            break;
        case 'auth/invalid-credential':
            console.error('Неверные учетные данные.');
            setErrorCommon(INVALID_CREDENTIALS_ERROR)
            break;
        case 'auth/network-request-failed':
            console.error('Ошибка сетевого запроса.');
            setErrorCommon(ERROR_NETWORK_REQUEST_FAILED)
            break;
        default:
            console.error('Произошла неизвестная ошибка:', error);
            setErrorCommon(UNKNOWN_ERROR)
    }
}
export default catchErrorFirebase