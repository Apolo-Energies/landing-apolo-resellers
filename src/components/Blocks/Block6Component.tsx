
export const Block6Component = ({ onScrollToForm }: { onScrollToForm: () => void }) => {
    return (
        <div className="bg-linear-to-b from-[#15268D] to-[#2541E9] py-16">
            <div className="container mx-auto px-4">
                <div className="text-center">
                    <h3 className="text-3xl text-white font-bold mb-8">
                        ¿Listo para calcular el ahorro de tu negocio?
                    </h3>
                    <button onClick={onScrollToForm} className="bg-white cursor-pointer text-blue-900 px-8 py-3 rounded-full text-xl font-bold hover:bg-gray-100 transition">
                        Mirar información →
                    </button>
                </div>
            </div>
        </div>
    );
};