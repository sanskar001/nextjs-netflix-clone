import Input from "@/components/Input";
import axios from "axios";
import { signIn } from "next-auth/react";
import React, { useCallback, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

const AuthPage = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [variant, setVariant] = useState<string>("login");

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "login" ? "register" : "login"
    );
  }, []);

  const login = useCallback(async () => {
    try {
      await signIn("credentials", {
        email,
        password,
        callbackUrl: "/profiles",
      });
    } catch (error) {
      console.log("Login", error);
    }
  }, [email, password]);

  const register = useCallback(async () => {
    try {
      await axios.post("/api/register", {
        email,
        password,
        name,
      });

      login();
    } catch (error) {
      console.log("Register Error:", error);
    }
  }, [email, password, name, login]);

  const goggleAuthHandler = useCallback(async () => {
    await signIn("google", { callbackUrl: "/profiles" });
  }, []);

  const githubAuthHandler = useCallback(async () => {
    await signIn("github", { callbackUrl: "/profiles" });
  }, []);

  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-fixed bg-center bg-cover">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <img src="/images/logo.png" alt="Logo" className="h-12" />
        </nav>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 p-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h2 className="text-white text-4xl font-semibold mb-8">
              {variant === "login" ? "Sign in" : "Register"}
            </h2>
            <div className="flex flex-col gap-4">
              {variant === "register" && (
                <Input
                  id="name"
                  type="text"
                  label="name"
                  value={name}
                  onChange={(e: any) => {
                    setName(e.target.value);
                  }}
                />
              )}
              <Input
                id="email"
                type="email"
                label="Email"
                value={email}
                onChange={(e: any) => {
                  setEmail(e.target.value);
                }}
              />
              <Input
                id="password"
                type="password"
                label="Password"
                value={password}
                onChange={(e: any) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <button
              onClick={variant === "login" ? login : register}
              className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition"
            >
              {variant === "login" ? "Login" : "Sign up"}
            </button>
            <div className="flex flex-row items-center gap-4 mt-8 justify-center">
              <div
                onClick={goggleAuthHandler}
                className="w-10 h-10 flex items-center justify-center bg-white rounded-full cursor-pointer hover:opacity-80 transition"
              >
                <FcGoogle size={30} />
              </div>
              <div
                onClick={githubAuthHandler}
                className="w-10 h-10 flex items-center justify-center bg-white rounded-full cursor-pointer hover:opacity-80 transition"
              >
                <FaGithub size={30} />
              </div>
            </div>
            <p className="text-neutral-500 mt-12">
              {variant === "login"
                ? "First time using Netflix?"
                : "Already have an account?"}{" "}
              <span
                className="text-white ml-1 hover:underline cursor-pointer"
                onClick={toggleVariant}
              >
                {variant === "login" ? "Create an account" : "Login"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
