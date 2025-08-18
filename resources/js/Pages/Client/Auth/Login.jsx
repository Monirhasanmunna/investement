import React, {useEffect} from 'react'
import Main from "@/Layouts/Client/Main.jsx";
import Button from "@/Components/Utils/Button/Button.jsx";
import {Link, useForm} from "@inertiajs/react";
import InputError from "@/Components/InputError.jsx";

const Page = ({data: packageData}) => {
    const {packageId} = packageData
    const {data, setData, post, processing, errors} = useForm({
        phone: '',
        password: ''
    });

    useEffect(() => {
        if(packageId){
            setData(prev => ({
                ...prev,
                package_id: packageId
            }))
        }
    }, [packageId]);

    const handleFormInput = (e) => {
        const {id, value} = e.target

        setData(prev => ({
            ...prev,
            [id]: value
        }))
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();

        post(route('user.login_store'))
    }

    return (
        <Main>
            <div className={`container mx-auto px-4 h-[calc(100vh-200px)] flex justify-center items-center`}>
                <div className="w-full max-w-md">
                    <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
                        <header className="mb-6 text-center">
                            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">Sign in</h1>
                            <p className="mt-1 text-sm text-gray-500">Use your phone number to continue</p>
                        </header>

                        <form onSubmit={handleFormSubmit} className={`space-y-5`}>
                            <div className="space-y-2">
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-800">
                                    Phone number
                                </label>
                                <input
                                    id="phone"
                                    name="phone"
                                    value={data.phone}
                                    onChange={handleFormInput}
                                    type="tel"
                                    inputMode="tel"
                                    autoComplete="tel"
                                    placeholder="e.g. +15551234567"
                                    className="block w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-400 shadow-sm focus:border-gray-900 focus:ring-2 focus:ring-gray-900/20"
                                />
                                <InputError message={errors.phone} className="mt-2" />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-800">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={data.password}
                                    onChange={handleFormInput}
                                    placeholder="......."
                                    className="block w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-400 shadow-sm focus:border-gray-900 focus:ring-2 focus:ring-gray-900/20"
                                />
                                <InputError message={errors.password} className="mt-2" />
                            </div>

                            <Button
                                buttonText={'Login'}
                                className={`mt-2 w-full inline-flex items-center justify-center rounded-xl px-4 py-5 text-sm font-semibold !bg-[#008236] text-white hover:!bg-[#016629]`}
                                isLoading={processing}
                            />

                            <p className="mt-4 text-center text-xs text-gray-500">
                                By continuing, you agree to our Terms & Privacy Policy.
                            </p>

                            <p className="mt-6 text-center text-sm text-gray-600">
                                Don’t have an account?{' '}
                                <Link href={route('user.register_page')} className="font-medium text-gray-900 hover:underline">
                                    Register here
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
