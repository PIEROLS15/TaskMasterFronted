import { useState, useEffect } from "react";
import { toast } from "sonner";
import type { Task } from "@/types/task";
import useCookie from '@/hooks/useCookie'

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const useTasks = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const authToken = useCookie("token");

    useEffect(() => {
        const fetchTasks = async () => {

            if (!authToken) {
                toast.error("No se encontró un token de autenticación");
                return;
            }

            try {
                const response = await fetch(`${API_URL}/api/tasks`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${authToken}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Error al obtener las tareas");
                }

                const data = await response.json();
                setTasks(data);
            } catch (error) {
                if (error instanceof Error) {
                    toast.error(error.message);
                } else {
                    toast.error("Ocurrió un error desconocido");
                }
            }
        };

        fetchTasks();
    }, [authToken]);

    return { tasks, setTasks };
};