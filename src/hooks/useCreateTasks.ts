import { useState } from "react";
import { Task } from '@/types/task'
import useCookie from '@/hooks/useCookie'

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export function useCreateTask(onSuccess: (newTask: Task) => void) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const authToken = useCookie("token");

    const createTask = async (title: string, description: string, dueDate?: Date) => {
        setLoading(true);
        setError(null);

        const payload = {
            title,
            description,
            due_date: dueDate ? dueDate.toISOString().split("T")[0] : undefined,
        };

        try {
            const response = await fetch(`${API_URL}/api/tasks`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${authToken}`,
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Error desconocido");
            }

            const newTask = await response.json();
            onSuccess(newTask);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Error desconocido");

        } finally {
            setLoading(false);
        }
    };

    return { createTask, loading, error };
}
