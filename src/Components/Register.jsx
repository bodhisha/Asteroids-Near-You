import React, { useState } from "react";
import fire from "../firebase";
import { Link } from "raviger";

export default function Register() {
  const initForm = {
    email: "",
    password: "",
  };

  const [form, setForm] = useState(initForm);

  const handleChange = (e) => {
    const { value, name } = e.target;
    const fieldValue = { ...form };
    fieldValue[name] = name === "email" ? value.toLowerCase() : value;
    setForm(fieldValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fire
      .auth()
      .createUserWithEmailAndPassword(form.email, form.password)
      .catch((err) => {
        console.log("err", err.message);
      });
  };
  return (
    <div className="h-full flex items-center justify-center py-5 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div>
          <h2 className="mt-6 text-center text-3xl leading-9 font-bold text-gray-800 uppercase">
            Create an account
          </h2>
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded px-8 pt-6 pb-8 my-20 bg-gray-200"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Email
            </label>
            <input
              aria-label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="shadow appearance-none borderrounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Email address"
            />
          </div>
          <div className="mb-4 md:flex md:justify-between">
            <div className="mb-4 md:mr-2 md:mb-0">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                aria-label="Password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                className="shadow appearance-none borderrounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="******************"
              />
            </div>
          </div>

          <div className="flex items-center justify-between sm:flex-row">
            <button
              type="submit"
              className="flex items-center bg-indigo-600 hover:bg-indigo-800 text-white font-bold py-2 px-4 sm:px-3 rounded focus:outline-none focus:shadow-outline"
            >
              <svg
                className="h-5 w-5 text-indigo-500 transition ease-in-out duration-150 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
              Register
            </button>
            <Link
              className="inline-block align-baseline font-bold text-sm text-indigo-600 hover:text-indigo-800"
              href="/login"
            >
              Already have an account?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
