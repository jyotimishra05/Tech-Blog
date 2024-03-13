"use client";

import { login } from "@/lib/action";
import styles from "./loginForm.module.css";
import { useFormState } from "react-dom";
import Link from "next/link";

const LoginForm = () => {
  const [state, formAction] = useFormState(login, undefined);
  
  
  return (
    <form className={styles.form} action={formAction}>
      <input type="text" placeholder="username" name="username" />
      <input type="password" placeholder="password" name="password" />
      <button>Login</button>
      <p className={styles.error}>{state?.error}</p>
      <Link href="/register">
       <p className={styles.paragraph}> {"Don't have an account?"} <b>Register</b></p>
      </Link>
    </form>
  );
};

export default LoginForm;
