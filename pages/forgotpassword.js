import React from "react";
import Link from "next/link";

import Form from "../components/Form";


function ForgotPassword() {
  return (
    <main className='main'>
      <Form
        formHeading="Forgot Password"
        takeUserName={false}
        forgotPassword={true}
      />

      <Link href="/signin">
        <a className="a" href="">
          Back to SignIn
        </a>
      </Link>
    </main>
  );
}

export default ForgotPassword;