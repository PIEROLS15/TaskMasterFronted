import Link from "next/link"
import { Button } from "@/components/ui/button"

const Content = () => {
    return (
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col items-center space-y-4 text-center">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                            TaskMaster
                        </h1>
                        <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                            Organiza tus tareas de manera eficiente y mantén el control de tus proyectos por manuel
                        </p>
                    </div>
                    <div className="space-x-4">
                        <Link href="/login">
                            <Button>Iniciar Sesión</Button>
                        </Link>
                        <Link href="/register">
                            <Button variant="outline">Registrarse</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Content;