const Cards = () => {
    return (
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid gap-6 lg:grid-cols-3 items-center">
                    <div className="space-y-2">
                        <h2 className="text-2xl font-bold tracking-tighter md:text-3xl">Gestión Simple</h2>
                        <p className="text-gray-500 dark:text-gray-400">Crea, edita y elimina tareas con facilidad.</p>
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-2xl font-bold tracking-tighter md:text-3xl">Organización</h2>
                        <p className="text-gray-500 dark:text-gray-400">
                            Mantén tus tareas organizadas con fechas de vencimiento.
                        </p>
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-2xl font-bold tracking-tighter md:text-3xl">Seguimiento</h2>
                        <p className="text-gray-500 dark:text-gray-400">
                            Marca tus tareas como completadas y haz seguimiento de tu progreso.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Cards;