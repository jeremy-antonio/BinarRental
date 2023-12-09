// import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginbg } from "../assets";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

const cars_api_base_url = "http://localhost:8087";

interface GoogleOauthResponse {
  credential?: string;
  clientId?: string;
}

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);

  const handleLoginGoogleSuccess = (response: GoogleOauthResponse) => {
    console.log("response google success:", response);
  };

  return (
    <div>
      <div className="flex flex-row">
        <div className="basis-[60%] text-black">
          <img src={loginbg} alt="" className="min-h-screen bg-cover" />
        </div>
        <div className="basis-[40%] text-black grid grid-flow-col place-items-center min-h-screen pr-16">
          <form>
            <div className="flex">
              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-4xl font-bold leading-7 text-gray-900">Welcome Admin BCR</h2>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-12">
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                      Email
                    </label>
                    <div className="mt-2">
                      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                        <input
                          type="email"
                          name="email"
                          id="email"
                          className="block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                          placeholder="example@gmail.com"
                          value={email}
                          onChange={({ target }) => {
                            setEmail(target.value);
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="sm:col-span-12">
                    <label htmlFor="" className="block text-sm font-medium leading-6 text-gray-900">
                      Password
                    </label>
                    <div className="mt-2">
                      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                        <input
                          type="password"
                          name="password"
                          id="password"
                          className="block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                          placeholder="6+ Karakter"
                          value={password}
                          onChange={({ target }) => {
                            setPassword(target.value);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="sm:col-span-12 mt-4">
                    <button
                      onClick={async (e) => {
                        e.preventDefault();
                        const payload = {
                          email: email,
                          password: password,
                        };

                        const response = await fetch(cars_api_base_url + "/api/login", {
                          method: "post",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify(payload),
                        });

                        const responseJson = await response.json();

                        if (response.status == 200) {
                          localStorage.setItem("token", responseJson.data.token);
                          navigate("/dashboard");
                        } else {
                          setAlertVisible(true);
                        }
                      }}
                      className="rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#0D28A6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-full"
                    >
                      Sign In
                    </button>
                  </div>
                  <div className="sm:col-span-12 mt-4">
                    <GoogleOAuthProvider clientId="504159366363-jg775b5lafts22j82krd9mskhk0f7kkd.apps.googleusercontent.com">
                      <GoogleLogin onSuccess={handleLoginGoogleSuccess} />
                    </GoogleOAuthProvider>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
