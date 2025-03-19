import { useState } from "react";
import { toast } from "sonner";
import type { Task } from "@/types/task";
import useCookie from '@/hooks/useCookie'

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export function useUpdateStatusTask() {
    const [isUpdating, setIsUpdating] = useState(false);
    const authToken = useCookie("token");

    const updateTaskStatus = async (task: Task) => {

        if (!authToken) {
            toast.error("No se encontró un token de autenticación");
            return;
        }

        const updatedStatus = task.status === "pending" ? "completed" : "pending";

        setIsUpdating(true);

        try {
            const response = await fetch(`${API_URL}/api/tasks/${task.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authToken}`,
                },
                body: JSON.stringify({ status: updatedStatus }),
            });

            if (!response.ok) {
                throw new Error("Error al actualizar la tarea");
            }

            const updatedTask = { ...task, status: updatedStatus };
            setIsUpdating(false);

            toast.success(
                updatedStatus === "completed" ? "Tarea completada" : "Tarea marcada como pendiente",
                {
                    description:
                        updatedStatus === "completed"
                            ? "La tarea ha sido marcada como completada"
                            : "La tarea ha sido marcada como pendiente",
                }
            );

            return updatedTask;
        } catch (error) {
            setIsUpdating(false);
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error("Ocurrió un error desconocido");
            }
            return null;
        }
    };

    return { updateTaskStatus, isUpdating };
}