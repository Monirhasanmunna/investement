const StatusFilter = ({status, statusKey = 'status', setPagination, pagination, setGo, segment}) => {
    return (
        <div className="flex items-center justify-end border border-gray-800 rounded-sm overflow-hidden">
            {Object.keys(status).map((key, index) => {
                const statusText = status[key];
                const isActive = pagination[statusKey] === key;

                return (
                    <button
                        key={key}
                        style={{
                            backgroundColor: isActive ? "#000" : "#fff",
                            color: isActive ? "#fff" : "#000",
                        }}
                        className={`cursor-pointer px-4 py-[8px] transition-colors hover:bg-gray-100
                                        ${index !== Object.keys(statusKey).length - 1 ? 'border-r border-gray-300' : ''}
                                    `}
                        onClick={() => {
                            setPagination((state) => ({ ...state, [statusKey]: `${key}` }));
                            setGo(true);
                        }}
                        type="button"
                    >
                        {statusText}
                    </button>
                );
            })}
            <button
                style={{
                    backgroundColor: pagination[statusKey] == null ? "#000" : "#fff",
                    color: pagination[statusKey] == null ? "#fff" : "#000",
                }}
                className="cursor-pointer capitalize px-4 py-[8px] transition-colors hover:bg-gray-100"
                onClick={() => {
                    setPagination((state) => ({ ...state, [statusKey]: null }));
                    setGo(true);
                }}
                type="button"
            >
                All {segment}
            </button>
        </div>
    )
}


export default StatusFilter;
