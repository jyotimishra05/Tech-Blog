"use client";


import styles from "./registerForm.module.css"
import { useFormState } from "react-dom";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { register } from "@/lib/action";

const RegisterForm = () => {
  const [state, formAction] = useFormState(register, undefined);

  const router = useRouter();

  useEffect(() => {
    state?.success && router.push("/login");
  }, [state?.success, router]);
console.log("state",state)
  return (
    <form className={styles.form} action={formAction}>
      <input type="text" placeholder="username" name="username" />
      <input type="email" placeholder="email" name="email" />
      <input type="password" placeholder="password" name="password" />
      <input
        type="password"
        placeholder="password again"
        name="passwordRepeat"
      />
      <button>Register</button>
      <p className={styles.error}>{state?.error}</p>
      <Link href="/login">
        <p className={styles.paragraph}>
          Have an account? <b>Login</b>
        </p>
      </Link>
    </form>
  );
};

export default RegisterForm;
