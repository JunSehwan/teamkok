import React, { useCallback, useState } from 'react';
import { signIn } from 'firebaseConfig';
import { useDispatch } from 'react-redux';
import { login } from "slices/user";
import PropTypes from 'prop-types';

const Login = ({ handleCancelModal }) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const onChangeEmail = useCallback(
    e => {
      setEmail(e.target.value);
    },
    []
  );

  // @ 비밀번호 길이 검토
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const onChangePassword = useCallback(
    e => {
      setPassword(e.target.value);
    },
    []
  );

  const onSubmit = useCallback(async (e) => {
    e.preventDefault();
    // console.log("password", password)
    // console.log("password.length", password.length)
    if (password?.length === 0) {
      return setPasswordError(true);
    }
    if (email?.length === 0) {
      return setEmailError(true);
    }
    const res = await signIn(email, password);

    if (res?.uid?.length !== 0) {
      dispatch(login({ res }));
      handleCancelModal();
    }
  }, [email, dispatch, handleCancelModal, password])



  return (
    <div>
      <div className="container mx-auto">
        <div className="flex justify-center my-3">
          {/* <!-- Row --> */}
          <div className="w-full flex">
            {/* <!-- Col --> */}
            {/* <!-- Col --> */}
            <div className="w-full bg-white rounded-lg lg:rounded-l-none">
              <form className="w-full pt-4 pb-2 mb-4 bg-white rounded">

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
                  {emailError ? (
                    <p className="text-xs mb-[1.5rem] italic text-red-500">이메일을 입력해주세요.</p>
                  ) : null}
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
                  {passwordError ? (
                    <p className="text-xs mb-[1.5rem] italic text-red-500">비밀번호를 입력해주세요.</p>
                  ) : null}
                </div>

                <div className="mb-6 text-center">
                  <button
                    className="w-full px-4 py-2 font-bold text-white bg-purple-600 rounded-full hover:bg-purple-700 focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={onSubmit}
                  >
                    로그인
                  </button>
                </div>
                <hr className="mb-6 border-t" />
                <div className="text-center">
                  <a
                    className="inline-block text-[0.88rem] text-blue-500 align-baseline hover:text-blue-800"
                    href="#"
                  >
                    Forgot Password?
                  </a>
                </div>

              </form>
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