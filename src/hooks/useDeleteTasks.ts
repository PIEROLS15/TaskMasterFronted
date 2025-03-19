import { useState } from "react";
import { toast } from "sonner";
import useCookie from '@/hooks/useCookie'

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export function useDeleteTask() {
    const [deletingTaskId, setDeletingTaskId] = useState<number | null>(null);
    const authToken = useCookie("token");

    const confirmDelete = async () => {
        if (deletingTaskId) {

            if (!authToken) {
                toast.error("No se encontró un token de autenticación");
                return;
            }

            try {
                const response = await fetch(`${API_URL}/api/tasks/${deletingTaskId}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${authToken}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Error al eliminar la tarea");
                }

                toast.success("Tarea eliminada correctamente");
                return true;
            } catch (error) {
                if (error instanceof Error) {
                    toast.error(error.message);
                } else {
                    toast.error("Ocurrió un error desconocido");
                }
                return false;
            } finally {
                setDeletingTaskId(null);
            }
        }
    };

    return {
        deletingTaskId,
        setDeletingTaskId,
        confirmDelete,
    };
}