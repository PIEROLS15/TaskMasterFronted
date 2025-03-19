import { useRouter } from "next/navigation";
import { toast } from "sonner";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const deleteCookie = (name: string) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

const useLogout = () => {
    const router = useRouter();

    const handleLogout = async () => {
        const authToken = document.cookie
            .split("; ")
            .find((row) => row.startsWith("token="))
            ?.split("=")[1];

        if (!authToken) {
            toast.error("No se encontró un token de autenticación");
            return;
        }

        try {
            const response = await fetch(`${API_URL}/api/logout`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authToken}`,
                },
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Error al cerrar sesión");
            }

            deleteCookie("token");

            toast.success(data.message || "Sesión cerrada exitosamente");
            router.push("/");
        } catch (error: unknown) {
            if (error instanceof Error) {
                toast.error(error.message || "Error al cerrar sesión");
            } else {
                toast.error("Error desconocido al cerrar sesión");
            }
        }
    };

    return { handleLogout };
};

export default useLogout;