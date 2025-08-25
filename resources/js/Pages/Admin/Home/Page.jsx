import Main from "@/Layouts/Dashboard/Main.jsx";

export default function Page({data}){
    console.log(data)
    return (
        <Main>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 p-5">
                <div className="flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
                    <div className="p-4 md:p-5">
                        <div className="flex items-center gap-x-2">
                            <p className="text-xs uppercase text-gray-500 dark:text-neutral-500">
                                Total Package
                            </p>
                        </div>

                        <div className="mt-1 flex items-center gap-x-2">
                            <h3 className="text-xl sm:text-2xl font-medium text-gray-800 dark:text-neutral-200">
                                {data.total_package}
                            </h3>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
                    <div className="p-4 md:p-5">
                        <div className="flex items-center gap-x-2">
                            <p className="text-xs uppercase text-gray-500 dark:text-neutral-500">
                                Total Investment
                            </p>
                        </div>

                        <div className="mt-1 flex items-center gap-x-2">
                            <h3 className="text-xl sm:text-2xl font-medium text-gray-800 dark:text-neutral-200">
                                Tk.{data.total_investment}
                            </h3>
                        </div>
                    </div>
                </div>


                <div className="flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
                    <div className="p-4 md:p-5">
                        <div className="flex items-center gap-x-2">
                            <p className="text-xs uppercase text-gray-500 dark:text-neutral-500">
                                Total Withdraw
                            </p>
                        </div>

                        <div className="mt-1 flex items-center gap-x-2">
                            <h3 className="text-xl sm:text-2xl font-medium text-gray-800 dark:text-neutral-200">
                                Tk.{data.total_withdraw}
                            </h3>
                        </div>
                    </div>
                </div>


                <div className="flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
                    <div className="p-4 md:p-5">
                        <div className="flex items-center gap-x-2">
                            <p className="text-xs uppercase text-gray-500 dark:text-neutral-500">
                                Total User
                            </p>
                        </div>

                        <div className="mt-1 flex items-center gap-x-2">
                            <h3 className="text-xl sm:text-2xl font-medium text-gray-800 dark:text-neutral-200">
                                {data.total_user}
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
        </Main>
    )
}
