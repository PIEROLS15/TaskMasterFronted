import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import type { Task } from "@/types/task";
import { useUpdateTask } from "@/hooks/useUpdateTask";

interface TaskUpdateFormProps {
    task: Task;
    onSuccess: (updatedTask: Task) => void;
}

export function TaskUpdateForm({ task, onSuccess }: TaskUpdateFormProps) {
    const {
        title,
        description,
        dueDate,
        loading,
        error,
        setTitle,
        setDescription,
        setDueDate,
        handleSubmit,
    } = useUpdateTask({ task, onSuccess });

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div className="space-y-2">
                <Label htmlFor="title">Título</Label>
                <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Título de la tarea"
                    required
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="description">Descripción</Label>
                <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Descripción de la tarea"
                    rows={3}
                />
            </div>

            <div className="space-y-2">
                <Label>Fecha de vencimiento</Label>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            className={cn("w-full justify-start text-left font-normal", !dueDate && "text-muted-foreground")}
                        >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {dueDate ? format(dueDate, "PPP", { locale: es }) : "Seleccionar fecha"}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={dueDate} onSelect={setDueDate} initialFocus />
                    </PopoverContent>
                </Popover>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Guardando..." : "Actualizar Tarea"}
            </Button>
        </form>
    );
}
