
import { useState } from "react";
import "./Login.css";
import Api from "./Api";

const LabeledInput = ({
                          label,
                          type,
                          value,
                          setValue,
                      }) => {
    return (
        <label>
            {label}:
            <input
                type={type}
                required
                value={value}
                onChange={(event) => setValue(event.target.value)}
            />
        </label>
    );
};

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [hasLoginError, setHasLoginError] = useState(false);

    const submitForm = (event) => {
        event.preventDefault();
        Api.login(email, password).then((wasSuccessFull) => {
            if (wasSuccessFull) {
                onLogin();
            }
            setHasLoginError(!wasSuccessFull);
        });
    };

    return (
        <form className="login-form" onSubmit={submitForm}>
            <div className={`error ${!hasLoginError && "hidden"}`}>
                Login fehlgeschlagen. Bitte versuchen Sie es erneut
            </div>
            <LabeledInput
                label="E-Mail"
                type="text"
                value={email}
                setValue={setEmail}
            />
            <LabeledInput
                label="Passwort"
                type="password"
                value={password}
                setValue={setPassword}
            />
            <button type="submit">Einloggen</button>
        </form>
    );
};

export default Login;