import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router'

import { appRoutes } from "../../utils/constants";
import cookieCutter from 'cookie-cutter'

export default function Sigin(props) {
    const [error, setError] = useState(null);
    const [userErrror, setUserError] = useState(null);
    const [passwordErrror, setPasswordError] = useState(null);

    const router = useRouter();
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

    useEffect(() => {

    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault();

        const { username, password } = event.target;

        try {
            const response = await fetch(`${API_BASE_URL}/signin`, {
                method: "POST",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    username: username.value,
                    password: password.value
                })
            });

            const result = await response.json();

            if (response.status === 200) {
                if (typeof window !== "undefined") {                
                    cookieCutter.set('token', result.token);
                    router.push(appRoutes.COLLECT_PAGE);
                }
            } else if (response.status === 404) {
                if (result.message.includes("password")) {
                    setPasswordError("Contraseña incorrecta");
                    setUserError(null);
                } else {
                    setUserError("Usuario no existe");
                    setPasswordError(null);
                }
            } else {
                setError(result.message);
            }
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <img className="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow" />
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Ingresa a tu cuenta</h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <input type="hidden" name="remember" value="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="username" className="sr-only">Nombre de usuario</label>
                            <input id="username" name="email" type="email" autoComplete="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address" />
                            {
                                userErrror ? <p className="text-sm text-red-600">{userErrror}</p> : <p></p>
                            }
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Contraseña</label>
                            <input id="password" name="password" type="password" autoComplete="current-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" />
                            {
                                passwordErrror ? <p className="text-sm text-red-600">{passwordErrror}</p> : <p></p>
                            }
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900"> Recordarme </label>
                        </div>
                    </div>

                    <div>
                        <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                </svg>
                            </span>
                            Iniciar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
