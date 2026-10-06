function StatCard({ title, value, icon }) {
    return (
        <div
            className="
                w-full
                rounded-xl
                border border-gray-200
                bg-white
                p-4
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-md

                sm:p-5
                md:p-6
            "
        >
            <div
                className="
                    flex
                    items-center
                    justify-between
                    gap-3
                "
            >

                {/* =========================
                    TEXT
                ========================= */}
                <div className="min-w-0 flex-1">

                    <p
                        className="
                            truncate
                            text-xs
                            font-medium
                            text-gray-500

                            sm:text-sm
                        "
                    >
                        {title}
                    </p>

                    <h3
                        className="
                            mt-1
                            truncate
                            text-2xl
                            font-bold
                            leading-tight
                            text-gray-800

                            sm:mt-2
                            sm:text-3xl
                        "
                    >
                        {value}
                    </h3>

                </div>


                {/* =========================
                    ICON
                ========================= */}
                <div
                    className="
                        flex
                        h-10
                        w-10
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        bg-blue-100
                        text-xl
                        text-blue-600

                        sm:h-11
                        sm:w-11
                        sm:text-2xl

                        md:h-12
                        md:w-12
                    "
                >
                    {icon}
                </div>

            </div>
        </div>
    );
}

export default StatCard;