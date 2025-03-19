import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Pencil, Trash2, Clock, CheckCircle } from "lucide-react";
import type { Task } from "@/types/task";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface TaskItemProps {
    task: Task;
    onToggleComplete: () => void;
    onEdit: () => void;
    onDelete: () => void;
}

export function TaskItem({ task, onToggleComplete, onEdit, onDelete }: TaskItemProps) {
    const isCompleted = task.status === "completed";
    const isOverdue = task.due_date && new Date(task.due_date) < new Date() && !isCompleted;

    const dueDate = task.due_date ? new Date(task.due_date) : null;
    const isValidDate = dueDate && !isNaN(dueDate.getTime());

    return (
        <Card className={cn("transition-all", isCompleted && "opacity-75")}>
            <CardContent className="p-4">
                <div className="flex items-start gap-2">
                    <Checkbox checked={isCompleted} onCheckedChange={onToggleComplete} className="mt-1" />
                    <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                            <h3 className={cn("font-medium", isCompleted && "line-through text-muted-foreground")}>
                                {task.title}
                            </h3>
                            <div className="flex items-center gap-2">
                                <Badge variant={isCompleted ? "success" : "warning"} className="flex items-center gap-1">
                                    {isCompleted ? (
                                        <>
                                            <CheckCircle className="h-3 w-3" />
                                            <span>Completada</span>
                                        </>
                                    ) : (
                                        <>
                                            <Clock className="h-3 w-3" />
                                            <span>En proceso</span>
                                        </>
                                    )}
                                </Badge>

                                {isValidDate && (
                                    <Badge variant={isOverdue ? "destructive" : "outline"}>
                                        {format(dueDate, "d MMM", { locale: es })}
                                    </Badge>
                                )}
                            </div>
                        </div>
                        {task.description && (
                            <p className={cn("text-sm text-muted-foreground", isCompleted && "line-through")}>
                                {task.description}
                            </p>
                        )}
                    </div>
                </div>
            </CardContent>
            <CardFooter className="p-2 pt-0 flex justify-end gap-2">
                <Button variant="ghost" size="icon" onClick={onEdit}>
                    <Pencil className="h-4 w-4" />
                    <span className="sr-only">Editar</span>
                </Button>
                <Button variant="ghost" size="icon" onClick={onDelete}>
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Eliminar</span>
                </Button>
            </CardFooter>
        </Card>
    );
}
