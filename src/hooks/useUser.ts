import { useState, useEffect } from "react";
import { toast } from "sonner";
import useCookie from '@/hooks/useCookie'

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const useUser = () => {
    const [userName, setUserName] = useState<string | null>(null);
    const authToken = useCookie("token");

    useEffect(() => {
        const fetchUser = async () => {

            if (!authToken) {
                toast.error("No se encontró un token de autenticación");
                return;
            }

            try {
                const response = await fetch(`${API_URL}/api/user`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${authToken}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Error al obtener la información del usuario");
                }

                const data = await response.json();
                setUserName(data.name);
            } catch (error) {
                console.error("Error obteniendo el usuario:", error);
                toast.error("No se pudo obtener la información del usuario");
            }
        };

        fetchUser();
    }, [authToken]);

    return { userName };
};