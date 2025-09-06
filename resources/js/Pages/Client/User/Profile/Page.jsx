import {useEffect, useMemo, useState} from "react";
import {convertToLocalDateTime, setPaginationFromSessionStorage} from "@/helpers/helper.js";
import {router} from "@inertiajs/react";
import LengthDropdown from "@/Components/Utils/Pagination/LengthDropdown.jsx";
import StatusFilter from "@/Components/Utils/Pagination/StatusFilter.jsx";
import Summary from "@/Components/Utils/Pagination/Summary.jsx";
import Navigation from "@/Components/Utils/Pagination/Navigation.jsx";
import Main from "@/Layouts/Client/Dashboard/Main.jsx";
import {FaArrowDown, FaArrowUp} from "react-icons/fa";
import Button from "@/Components/Utils/Button/Button.jsx";


export default function Page({data}){
    const {user} = data
    const [processing, setProcessing] = useState(false);
    const [userData, setUserData] = useState({
        name: '',
        phone: '',
        password: '',
        account_number: '',
        method: 'bkash'
    })

    useEffect(() => {
        if(user){
            setUserData(prev => ({
                ...prev,
                name: user.name,
                phone: user.phone,
                account_number: user.withdraw_info ? JSON.parse(user.withdraw_info)?.account_number : '',
                method: user.withdraw_info ? JSON.parse(user.withdraw_info)?.method : 'bkash',
            }))
        }
    }, [user]);


    const handleUserInfo = (e) => {
        const {id, value} = e.target
        setUserData(prev => ({
            ...prev,
            [id]: value
        }))
    }

    const handleSubmitForm = (e) => {
        e.preventDefault();
        setProcessing(true)
        router.post(route('user.profile.update'), userData, {
            preserveScroll: true,
            preserveState: true,
            onFinish: () => setProcessing(false)
        })
    }

    return (
        <Main>
            <div className="w-full p-5">
                <form onSubmit={handleSubmitForm}>
                    <div className="w-full border border-gray-300 p-5 mt-4 space-y-3">
                        <div className="w-full">
                            <h1 className={`text-[20px] font-semibold text-gray-400`}>Profile:</h1>
                        </div>
                        <div className="form-control">
                            <label className={`text-sm text-gray-500 font-semibold`} htmlFor="name">Name</label>
                            <input type="text" id="name" value={userData.name} onChange={handleUserInfo} className={`input`} placeholder={`Enter name`} />
                        </div>
                        <div className="form-control">
                            <label className={`text-sm text-gray-500 font-semibold`} htmlFor="name">Phone</label>
                            <input type="text" id="phone" value={userData.phone} onChange={handleUserInfo} className={`input`} placeholder={`Enter number`} />
                        </div>
                        <div className="form-control">
                            <label className={`text-sm text-gray-500 font-semibold`} htmlFor="name">Password</label>
                            <input type="text" id="password" value={userData.password} onChange={handleUserInfo} className={`input`} placeholder={`********`} />
                        </div>
                    </div>

                    <div className="w-full border border-gray-300 p-5 mt-4 space-y-3">
                        <div className="w-full">
                            <h1 className={`text-[20px] font-semibold text-gray-400`}>Withdraw Info:</h1>
                        </div>
                        <div className="form-control">
                            <label className={`text-sm text-gray-500 font-semibold`} htmlFor="name">Number</label>
                            <input type="text" id='account_number' value={userData.account_number} onChange={handleUserInfo} className={`input`} required={true} placeholder={`Enter number`} />
                        </div>
                        <div className="form-control">
                            <label className={`text-sm text-gray-500 font-semibold`} htmlFor="name">Method</label>
                            <select className={`w-full input text-gray-500`} name="method" id="method" value={userData.method} onChange={handleUserInfo}>
                                <option value="bkash">Bkash</option>
                                <option value="nagad">Nagad</option>
                                <option value="bank">Bank</option>
                            </select>
                        </div>
                    </div>

                    <div className="w-full mt-4">
                        <Button buttonText={`Update`} type={`submit`} isLoading={processing} className={`w-full`}/>
                    </div>
                </form>
            </div>
        </Main>
)
}
