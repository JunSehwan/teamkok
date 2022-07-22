import React, { useCallback, useState } from 'react';
import { signIn } from 'firebaseConfig';
import { useDispatch } from 'react-redux';
import { login } from "slices/user";
import PropTypes from 'prop-types';

const ErrorP = ({ msg }) => {
  return <p className="text-xs mb-[1.5rem] italic text-red-500">
    {msg}
  </p>
}

const Login = ({ handleCancelModal }) => {
  // const dispatch = useDispatch();

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChangeEmail = useCallback(e =>
    setEmail(e.target.value), []);
  const onChangePassword = useCallback(e =>
    setPassword(e.target.value), []);

  const validate = (email, password) => {
    setEmailError("");
    setPasswordError("");
    setLoginError("");
    if (email === "") {
      setEmailError("이메일을 입력해주세요.");
      return false;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setEmailError("이메일 형식이 올바르지 않습니다.");
      return false;
    }
    if (password.length < 6) {
      setPasswordError("비밀번호는 6자리 이상 입력해주세요.");
      return false;
    }
    return true;
  }

  const onSubmit = () =>
    validate(email, password)
    && signIn(email, password)
      .then((res) => {
        console.log(res);
        dispatch(login({ email, password }));
        handleCancelModal();
      }).catch((e) => {
        setLoginError(e);
      });

  return (
    <div>
      <div className="container mx-auto">
        <div className="flex justify-center my-3">
          {/* <!-- Row --> */}
          <div className="w-full flex">
            {/* <!-- Col --> */}
            {/* <!-- Col --> */}
            <div className="w-full bg-white rounded-lg lg:rounded-l-none">
              <div className="mb-4">
                <label className="block mb-1 text-sm font-bold text-gray-700" htmlFor="email">
                  이메일
                </label>
                <input
                  className={emailError
                    ?
                    'w-full px-3 py-2 mb-2 text-sm border-red-500 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                    :
                    'w-full px-3 py-2 mb-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                  }
                  id="login_email"
                  type="email"
                  placeholder="이메일주소"
                  onChange={onChangeEmail}
                  value={email}
                />
                {emailError && <ErrorP msg={emailError} />}
              </div>
              <div className="mb-4">
                <label className="block mb-1 text-sm font-bold text-gray-700" htmlFor="password">
                  비밀번호
                </label>
                <input
                  className={passwordError
                    ?
                    'w-full px-3 py-2 mb-2 text-sm border-red-500 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                    :
                    'w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                  }
                  id="login_password"
                  type="password"
                  placeholder="********"
                  onChange={onChangePassword}
                  value={password}
                />
                {passwordError && <ErrorP msg={passwordError} />}
              </div>
              <div className="mb-6 text-center">
                {loginError && <ErrorP msg={loginError} />}
                <button
                  onClick={() => onSubmit()}
                  type="button"
                  className="w-full px-4 py-2 font-bold text-white bg-purple-600 rounded-full hover:bg-purple-700 focus:outline-none focus:shadow-outline">
                  로그인
                </button>
              </div>
              <hr className="mb-6 border-t" />
              <div className="text-center">
                <a
                  className="inline-block text-[0.88rem] text-blue-500 align-baseline hover:text-blue-800"
                  href="#" >
                  비밀번호를 잊으셨나요?
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  handleCancelModal: PropTypes.func,
};

export default Login;
