// import {useEffect, useState, FC, ReactElement} from 'react';
// import {useNavigate} from "react-router";
// import {Box, Button, FormControl} from '@chakra-ui/react';
// import {InputDictItem} from "../../shared/hooks";
//
// export const UserLogin: FC<{}> = (): ReactElement => {
//     // Использование истории реагирования-маршрутизатора для смены экранов вручную
//     const navigate = useNavigate();
//
//     // Переменные состояния, содержащие входные значения и флаги
//     const [currentUser, setCurrentUser] = useState<Parse.User | null>(null);
//     const [emailInput, setEmailInput] = useState("");
//     const [passwordInput, setPasswordInput] = useState("");
//     const [showSignUp, setShowSignUp] = useState(false);
//
//     // Этот хук эффекта запускается при каждом рендеринге и проверяет, есть ли
//     // вошедший в систему пользователь, при необходимости перенаправление на главный экран
//     useEffect(() => {
//         const checkCurrentUser = async (): Promise<Boolean> => {
//             try {
//                 const user: (Parse.User | null) = await Parse.User.currentAsync();
//                 if (user !== null || currentUser !== null) {
//                     navigate('/');
//                     return true;
//                 }
//             } catch (_error: any) {
//             }
//             return false;
//         }
//         checkCurrentUser();
//     });
//
//     const handlerChangeEmail = (e: any) => {
//         setEmailInput(e.target.value)
//     }
//     const handlerChangePassword = (e: any) => {
//         setPasswordInput(e.target.value)
//     }
//     // Войти, используя существующие учетные данные
//     const doLogin = async (): Promise<Boolean> => {
//         // Create static copies of the input values
//         // to ensure consistency
//         const username: string = emailInput;
//         const password: string = passwordInput;
//
//         // Проверяем, указаны ли пользователем обязательные поля
//         if (username === '' || password === '') {
//             alert("Please inform your username and password!");
//             return false;
//         }
//
//         // Пытаемся войти
//         try {
//             let user: Parse.User = await Parse.User.logIn(username, password);
//             if (user === undefined) {
//                 alert('Something went wrong when trying to login, please try again!');
//                 return false;
//             }
//             // Устанавливаем текущую переменную состояния пользователя, чтобы принудительно выполнить useEffect
//             setCurrentUser(user);
//             return true;
//         } catch (error: any) {
//             alert(error);
//             return false;
//         }
//     };
//
//     // Регистрация и вход под новым пользователем
//     const doSignup = async (): Promise<Boolean> => {
//         const email: string = emailInput;
//         const password: string = passwordInput;
//
//         // Проверяем, указаны ли пользователем обязательные поля
//         if (email === '' || password === '') {
//             alert("Please inform your email and password!");
//             return false;
//         }
//
//         // Попробуйте зарегистрироваться
//         try {
//             let user: Parse.User = await Parse.User.signUp(email, password, {"email": email});
//             if (user === undefined) {
//                 alert('Something went wrong when trying to sign up, please try again!');
//                 return false;
//             }
//             // Устанавливаем текущую переменную состояния пользователя, чтобы принудительно выполнить useEffect
//             setCurrentUser(user);
//             return true;
//         } catch (error: any) {
//             alert(error);
//             return false;
//         }
//     };
//
//     return (
//         <Box>
//             <FormControl>
//                 <InputDictItem
//                     required={true}
//                     type={"email"}
//                     value={emailInput}
//                     item={"Email"}
//                     name={"input_email"}
//                     handleChange={handlerChangeEmail}/>
//                 <InputDictItem
//                     required={true}
//                     type={"password"}
//                     value={passwordInput}
//                     item={"Password"}
//                     name={"input_password"}
//                     handleChange={handlerChangePassword}/>
//                 {!showSignUp ? (
//                     <>
//                         <Button className="button" onClick={doLogin}>{"Log in"}</Button>
//                         <Button className="button-secondary" onClick={() => setShowSignUp(true)}>{"Create a new" +
//                             " account"}</Button>
//                     </>
//                 ) : (
//                     <>
//                         <Button className="button" onClick={doSignup}>{"Sign up"}</Button>
//                         <Button className="button-secondary" onClick={() => setShowSignUp(false)}>{"Log in with" +
//                             " existing account"}</Button>
//                     </>
//                 )}
//             </FormControl>
//         </Box>
//     );
// };