
export const Block3Component = () => {
    const tarifas = [
        {
            title: 'Tarifa estable',
            description: 'Todos los períodos al mismo precio'
        },
        {
            title: 'Tarifa fácil',
            description: 'Precio escalonado para beneficiar tu P6'
        },
        {
            title: 'Tarifa DYN',
            description: 'Tarifa con precio fijo de P1 a P5 y P6 Bonificada'
        },
        {
            title: 'Tarifa Indexada',
            description: 'Precios de mercado'
        }
    ];
    
    return (
        <div className="container bg-linear-to-b from-[#15268D] to-[#2541E9] mx-auto px-4 pt-2 pb-4">
            <h3 className="text-3xl text-white font-bold mb-1">
                Descubre nuestras <span>tarifas</span>
            </h3>
            <p className="text-2xl text-white mb-4">Las tarifas que le dan la vuelta al mercado energético.</p>
            <div className="grid bg-white md:grid-cols-4 gap-6 p-2 rounded-lg">
                {tarifas.map((tarifa, index) => (
                    <div key={index} className="bg-gray-100 p-6 rounded-lg text-center">
                        <h4 className="text-2xl font-bold text-blue-900 mb-4">{tarifa.title}</h4>
                        <p className="text-2xl text-gray-700">{tarifa.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};