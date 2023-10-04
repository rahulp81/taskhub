import React, { useState, useContext, createContext, useEffect, useRef } from 'react';
import { useMutation } from 'react-query';
import toggleFav from '@/app/lib/sync api/toggleFav'
import Label from '@/app/lib/sync api/Label';
import Project from '@/app/lib/sync api/project';
import Task from '@/app/lib/sync api/task';
import CompletedTask from '@/app/lib/sync api/completedTask';
import DeleteTask from '@/app/lib/sync api/deleteTask'

export const SyncContext = createContext<any>(null);

export function useSyncContext() {
    const context = useContext(SyncContext);
    if (!context) {
        throw new Error("useSyncContext must be used within a SyncProvider");
    }
    return context;
}

export function SyncProvider({ children }: { children: React.ReactNode }) {
    const [sync, setSync] = useState<any>({});
    const queRef = useRef<any>([]);
    const processing = useRef(false);

    const favMutation = useMutation(toggleFav, {
        retry: 5
    })
    const LabelMutation = useMutation(Label, {
        retry: 5
    });
    const ProjectMutation = useMutation(Project, {
        retry: 5
    })
    const TaskMutation = useMutation(Task, {
        retry: 5
    })
    const CompletedTaskMutation = useMutation(CompletedTask, {
        retry: 5
    })
    const DeleteTaskMutation = useMutation(DeleteTask, {
        retry: 5
    })


    useEffect(() => {
        if (Object.keys(sync).length > 0) {
            console.log('new sync is :  ', sync);
            queRef.current.push(sync);
            processQueue();
        }
    }, [sync]);

    const processQueue = async () => {
        if (queRef.current.length > 0 && !processing.current) {
            processing.current = true;

            try {
                const currentTask = queRef.current.shift();
                console.log('current task,', currentTask);

                if (currentTask.type == 'fav_add' || currentTask.type == 'fav_remove') {
                    const response = await favMutation.mutateAsync({
                        isFavorite: currentTask.type == 'fav_add' ? false : true,
                        name: currentTask.command.name,
                        type: currentTask.command.type,
                    });
                    console.log(await response.json());
                }

                if (currentTask.type == 'label') {
                    const response = await LabelMutation.mutateAsync({
                        action: currentTask.action,
                        name: currentTask.command.name,
                        isFavorite: currentTask.command.checked
                    });
                    console.log(await response.json());
                }

                if (currentTask.type == 'project') {
                    const response = await ProjectMutation.mutateAsync({
                        action: currentTask.action,
                        name: currentTask.command.name,
                        isFavorite: currentTask.command.isFavorite
                    });
                    console.log(await response.json());
                }

                if (currentTask.type == 'task') {

                    if (currentTask.action == 'DELETE') {
                        const response = await DeleteTaskMutation.mutateAsync({
                            taskId: currentTask.command.taskId
                        })
                        console.log(await response.json());
                    } else {
                        const response = await TaskMutation.mutateAsync({
                            action: currentTask.action,
                            taskDetail: currentTask.command.taskDetail
                        })
                        console.log(await response.json());
                    }

                }

                if (currentTask.type == 'completedTask') {
                    const response = await CompletedTaskMutation.mutateAsync({
                        completedTaskItem: currentTask.command.completedTaskItem,
                        taskId : currentTask.command.taskId
                    })
                    console.log(await response.json());
                }


            } catch (error) {
                console.error('Error processing task:', error);
            } finally {
                processing.current = false;
                processQueue(); // Continue processing the next task
            }
        }
    };

    return (
        <SyncContext.Provider value={{ sync, setSync }}>
            {children}
        </SyncContext.Provider>
    );
}
