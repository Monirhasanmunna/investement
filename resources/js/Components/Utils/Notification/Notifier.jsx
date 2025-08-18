import { usePage } from "@inertiajs/react";
import { notify } from "@/helpers/helper.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Notifier() {
    const {message, errors} = usePage().props

    if (message) {
        notify({success: true, message: message})
    }
    if (errors) {
        for(const key of Object.keys(errors)) {
            notify({message: errors[key]})
        }
    }

    return <ToastContainer position="top-right" autoClose={2000} />;
}
