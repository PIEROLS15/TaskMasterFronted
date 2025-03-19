"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TaskList } from "@/components/layout/dashboard/taskList";
import { TaskCreateForm } from "@/components/layout/dashboard/taskCreateForm";
import type { Task } from "@/types/task";
import { toast } from "sonner";
import ButtonLogout from "@/components/ui/buttonLogout";
import { useTasks } from "@/hooks/useTasks";
import { useUser } from "@/hooks/useUser";

export default function DashboardPage() {
    const { tasks, setTasks } = useTasks();
    const { userName } = useUser();
    const [activeTab, setActiveTab] = useState("all");

    const handleTaskSuccess = (newTask: Task) => {
        setTasks((prevTasks) => [...prevTasks, newTask]);
        toast.success("Tarea creada exitosamente");
    };

    const handleTaskUpdate = (updatedTask: Task) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
        );
    };

    const handleTaskDelete = (taskId: number) => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    };

    const filteredTasks =
        activeTab === "all"
            ? tasks
            : activeTab === "pending"
                ? tasks.filter((task) => task.status === "pending")
                : tasks.filter((task) => task.status === "completed");

    return (
        <div className="container mx-auto p-4 max-w-4xl">
            <div className="flex justify-end mb-4 items-center gap-4">
                {userName ? (
                    <div className="text-lg font-semibold">Hola, {userName}</div>
                ) : (
                    <div className="text-gray-500">Cargando usuario...</div>
                )}
                <ButtonLogout />
            </div>
            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Nueva Tarea</CardTitle>
                        <CardDescription>Crea una nueva tarea para tu lista</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <TaskCreateForm onSuccess={handleTaskSuccess} />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Mis Tareas</CardTitle>
                        <CardDescription>Gestiona tus tareas pendientes y completadas</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Tabs defaultValue="all" onValueChange={setActiveTab}>
                            <TabsList className="grid w-full grid-cols-3">
                                <TabsTrigger value="all">Todas</TabsTrigger>
                                <TabsTrigger value="pending">Pendientes</TabsTrigger>
                                <TabsTrigger value="completed">Completadas</TabsTrigger>
                            </TabsList>
                            <TabsContent value="all" className="mt-4">
                                <TaskList
                                    tasksFromParent={filteredTasks}
                                    onUpdate={handleTaskUpdate}
                                    onDelete={handleTaskDelete}
                                />
                            </TabsContent>
                            <TabsContent value="pending" className="mt-4">
                                <TaskList
                                    tasksFromParent={filteredTasks}
                                    onUpdate={handleTaskUpdate}
                                    onDelete={handleTaskDelete}
                                />
                            </TabsContent>
                            <TabsContent value="completed" className="mt-4">
                                <TaskList
                                    tasksFromParent={filteredTasks}
                                    onUpdate={handleTaskUpdate}
                                    onDelete={handleTaskDelete}
                                />
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}