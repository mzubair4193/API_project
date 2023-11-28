import { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './LoginForm.css';

function LoginFormModal() {
    const dispatch = useDispatch();
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});
        return dispatch(sessionActions.login({ credential, password }))
            .then(closeModal)
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                    setErrors(data.errors);
                }
            });
    };

    const demoUser = () => {
        setCredential("FakeUser2")
        setPassword("password3")
    }

    return (
        <div className='mainContainer'>
            <h1 className='loginHeader'>Log In</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    <input
                        type="text"
                        placeholder='Username or Email'
                        className='loginInput'
                        value={credential}
                        onChange={(e) => setCredential(e.target.value)}
                        required
                    />
                </label>
                <label>
                    <input
                        type="password"
                        placeholder='Password'
                        className='passwordInput'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                {errors.credential && (
                    <p className='errors'>{errors.credential}</p>
                )}
                <button type="submit" className="loginbtn" disabled={credential.length < 4 || password.length < 6}>Log In</button>
                <button className='demoButton' onClick={demoUser}>Demo User</button>
            </form>
        </div>
    );
}

export default LoginFormModal;
