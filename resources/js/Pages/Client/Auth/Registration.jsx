import React, {useState} from 'react'
import Main from "@/Layouts/Client/Main.jsx";
import Button from "@/Components/Utils/Button/Button.jsx";
import {Link, useForm} from "@inertiajs/react";
import InputError from "@/Components/InputError.jsx";

const Page = () => {
    const {data, setData, post, processing, errors} = useForm({
        name: '',
        phone: '',
        password: '',
        confirm_password: ''
    })


    const handleInputText = (e) => {
        const {id,value} = e.target

        setData(prev => ({
            ...prev,
            [id]: value
        }))
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('user.register_store'))
    }

    return (
        <Main>
            <div className={`container mx-auto px-4 h-[calc(100vh-200px)] flex justify-center items-center`}>
                <div className="w-full max-w-md">
                    <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
                        <header className="mb-6 text-center">
                            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">Register</h1>
                            <p className="mt-1 text-sm text-gray-500">Create your account</p>
                        </header>

                        <form onSubmit={handleSubmit}>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-800">
                                        Name
                                    </label>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        value={data.name}
                                        onChange={handleInputText}
                                        autoComplete="name"
                                        placeholder="Your full name"
                                        className="mt-1 block w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-400 shadow-sm focus:border-gray-900 focus:ring-2 focus:ring-gray-900/20"
                                    />
                                    <InputError message={errors.name} className="mt-2" />
                                </div>

                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-800">
                                        Phone number
                                    </label>
                                    <input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        inputMode="tel"
                                        value={data.phone}
                                        onChange={handleInputText}
                                        autoComplete="tel"
                                        placeholder="e.g. +15551234567"
                                        className="mt-1 block w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-400 shadow-sm focus:border-gray-900 focus:ring-2 focus:ring-gray-900/20"
                                    />
                                    <InputError message={errors.phone} className="mt-2" />
                                </div>

                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-800">
                                        Password
                                    </label>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        value={data.password}
                                        onChange={handleInputText}
                                        autoComplete="new-password"
                                        placeholder="••••••••"
                                        className="mt-1 block w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-400 shadow-sm focus:border-gray-900 focus:ring-2 focus:ring-gray-900/20"
                                    />
                                    <InputError message={errors.password} className="mt-2" />
                                </div>

                                <div>
                                    <label htmlFor="confirm_password" className="block text-sm font-medium text-gray-800">
                                        Confirm Password
                                    </label>
                                    <input
                                        id="confirm_password"
                                        name="confirm_password"
                                        type="password"
                                        value={data.confirm_password}
                                        onChange={handleInputText}
                                        autoComplete="new-password"
                                        placeholder="••••••••"
                                        className="mt-1 block w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-400 shadow-sm focus:border-gray-900 focus:ring-2 focus:ring-gray-900/20"
                                    />
                                    <InputError message={errors.confirm_password} className="mt-2" />
                                </div>
                            </div>

                            <Button
                                buttonText={'Register'}
                                className={`mt-5 w-full inline-flex items-center justify-center rounded-xl px-4 py-5 text-sm font-semibold !bg-[#008236] text-white hover:!bg-[#016629]`}
                                isLoading={false}
                            />

                            <p className="mt-6 text-center text-sm text-gray-600">
                                Already have an account?{' '}
                                <Link href={route('user.login_page')} className="font-medium text-gray-900 hover:underline">
                                    Sign in
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </Main>
    )
}

export default Page
