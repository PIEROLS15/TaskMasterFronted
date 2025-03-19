import { useState, useEffect } from "react";
import type { Task } from "@/types/task";
import { TaskItem } from "@/components/layout/dashboard/taskItem";
import { TaskUpdateForm } from "@/components/layout/dashboard/taskUpdateForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { useDeleteTask } from '@/hooks/useDeleteTasks';
import { useUpdateStatusTask } from '@/hooks/useUpdateStatusTasks';

interface TaskListProps {
    tasksFromParent?: Task[];
    onUpdate?: (updatedTask: Task) => void;
    onDelete?: (taskId: number) => void;
}

export function TaskList({ tasksFromParent, onUpdate, onDelete }: TaskListProps) {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const { deletingTaskId, setDeletingTaskId, confirmDelete } = useDeleteTask();
    const { updateTaskStatus } = useUpdateStatusTask();

    useEffect(() => {
        if (tasksFromParent) {
            setTasks(tasksFromParent);
        }
    }, [tasksFromParent]);

    const handleEdit = (task: Task) => {
        setEditingTask(task);
    };

    const handleDelete = (taskId: number) => {
        setDeletingTaskId(taskId);
    };

    const handleConfirmDelete = async () => {
        const success = await confirmDelete();
        if (success) {
            setTasks((prev) => prev.filter((task) => task.id !== deletingTaskId));
            onDelete?.(deletingTaskId!);
        }
    };

    const handleUpdateTask = (updatedTask: Task | undefined) => {
        if (!updatedTask || !updatedTask.id) {
            toast.error("Error al actualizar la tarea");
            return;
        }

        setTasks((prev) =>
            prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
        );
        onUpdate?.(updatedTask);
        setEditingTask(null);
        toast.success("Tarea actualizada correctamente");
    };

    const toggleComplete = async (task: Task) => {
        const updatedTask = await updateTaskStatus(task);
        if (updatedTask) {
            handleUpdateTask(updatedTask);
        }
    };

    return (
        <div className="space-y-4">
            {tasks.length === 0 ? (
                <div className="text-center py-4 text-muted-foreground">No hay tareas para mostrar</div>
            ) : (
                tasks.map((task) => (
                    <TaskItem
                        key={task.id}
                        task={task}
                        onToggleComplete={() => toggleComplete(task)}
                        onEdit={() => handleEdit(task)}
                        onDelete={() => handleDelete(task.id)}
                    />
                ))
            )}

            {/* Edit Task Dialog */}
            <Dialog open={!!editingTask} onOpenChange={(open) => !open && setEditingTask(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Editar Tarea</DialogTitle>
                    </DialogHeader>
                    {editingTask && <TaskUpdateForm task={editingTask} onSuccess={handleUpdateTask} />}
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <AlertDialog open={!!deletingTaskId} onOpenChange={(open) => !open && setDeletingTaskId(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Esta acción no se puede deshacer. La tarea será eliminada permanentemente.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={handleConfirmDelete}>Eliminar</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}