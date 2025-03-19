import { useState } from "react";
import { toast } from "sonner";
import { Task } from "@/types/task";
import useCookie from '@/hooks/useCookie'

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface UseUpdateTaskProps {
    task: Task;
    onSuccess: (updatedTask: Task) => void;
}

export function useUpdateTask({ task, onSuccess }: UseUpdateTaskProps) {
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const [dueDate, setDueDate] = useState<Date | undefined>(task.due_date ? new Date(task.due_date) : undefined);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const authToken = useCookie("token");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const payload = {
            title,
            description,
            due_date: dueDate ? dueDate.toISOString().split("T")[0] : undefined,
        };

        try {

            if (!authToken) {
                toast.error("No se encontró un token de autenticación");
                return;
            }

            const response = await fetch(`${API_URL}/api/tasks/${task.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authToken}`,
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Error al actualizar la tarea");
            }

            const updatedTask: Task = {
                ...task,
                title,
                description,
                due_date: dueDate ? dueDate.toISOString().split("T")[0] : "",
            };

            onSuccess(updatedTask);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Error desconocido");
        } finally {
            setLoading(false);
        }
    };

    return {
        title,
        description,
        dueDate,
        loading,
        error,
        setTitle,
        setDescription,
        setDueDate,
        handleSubmit,
    };
}
