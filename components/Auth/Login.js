import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { signIn } from 'firebaseConfig';
import { setUser } from "slices/user";
import PropTypes from 'prop-types';

const Login = ({ handleCancelModal }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [resultError, setResultError] = useState("");

  const onChangeEmail = useCallback(
    e => setEmail(e.target.value), []);
  const onChangePassword = useCallback(
    e => setPassword(e.target.value), []);

  function isValid(e, p) {
    setEmailError("")
    setPasswordError("")
    const emailRegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (p.length == 0) {
      return setPasswordError("비밀번호를 입력해주세요.");
    }
    if (p.length < 6) {
      return setPasswordError("비밀번호는 6자리 이상입니다.")
    }
    if (e.length == 0) {
      return setEmailError("이메일을 입력해주세요.")
    }
    if (!emailRegExp.test(e)) {
      return setEmailError("이메일 형식을 확인해주세요.");
    }
    return true;
  }

  const doLogin = async () => {
    if (isValid(email, password)) {
      const user = await signIn(email, password, setResultError);
      if (user) {
        dispatch(setUser(user));
        return handleCancelModal();
      }
    }
  }

  return (
    <div className="container mx-auto">
      <div className="flex justify-center my-3">
        <div className="w-full flex">
          <div className="w-full bg-white rounded-lg lg:rounded-l-none">
            <form className="w-full pt-4 pb-2 mb-4 bg-white rounded" >
              <div className="mb-4">
                <label className="block mb-1 text-sm font-bold text-gray-700" htmlFor="email">
                  이메일
                </label>
                <input
                  className={emailError ?
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
                {emailError &&
                  <p className="text-xs mb-[1.5rem] italic text-red-500">{emailError}</p>}
              </div>
              <div className="mb-4">
                <label className="block mb-1 text-sm font-bold text-gray-700" htmlFor="password">
                  비밀번호
                </label>
                <input
                  className=
                  'w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                  id="login_password"
                  type="password"
                  placeholder="********"
                  onChange={onChangePassword}
                  value={password}
                />

                {passwordError &&
                  <p className="text-xs mb-[1.5rem] italic text-red-500">{passwordError}</p>}
              </div>
              <div className="mb-6 text-center">
                <button
                  type="button"
                  onClick={doLogin}
                  className="w-full px-4 py-2 font-bold text-white bg-purple-600 rounded-full hover:bg-purple-700 focus:outline-none focus:shadow-outline" >
                  로그인
                </button>
              </div>
              {resultError &&
                <p className="text-xs mb-[1.5rem] italic text-red-500">{resultError}</p>}
              <hr className="mb-6 border-t" />
              <div className="text-center">
                <a
                  className="inline-block text-[0.88rem] text-blue-500 align-baseline hover:text-blue-800"
                  href="#"
                >
                  비밀번호를 잊으셨나요?
                </a>
              </div>
            </form>
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
