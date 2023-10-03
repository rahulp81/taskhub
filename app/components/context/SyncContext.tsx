import React, { useState, useContext, createContext, useEffect, useRef } from 'react';
import { useMutation } from 'react-query';
import toggleFav from '@/app/lib/sync api/toggleFav'

export const SyncContext = createContext<any>(null);

;

export function useSyncContext() {
    const context = useContext(SyncContext);
    if (!context) {
        throw new Error("useSyncContext must be used within a SyncProvider");
    }
    return context;
}

export function SyncProvider({ children }: { children: React.ReactNode }) {
    const [sync, setSync] = useState<any>({});
    const queueRef = useRef<any>([]);
    const processing = useRef(false);
    const favMutation = useMutation(toggleFav, {
        retry: 5
    })

    useEffect(() => {
        if (Object.keys(sync).length > 0) {

            queueRef.current.push(sync);
            processQueue();
        }
    }, [sync]);

    const processQueue = async () => {
        if (queueRef.current.length > 0 && !processing.current) {
            processing.current = true;
            const currentTask = queueRef.current[0]; // Get the first task in the queue

            try {
                // Perform the task here, for example, making an API call
                console.log('Processing task:', currentTask);

                // After processing, remove the task from the queue
                const currentFavoriteTask = queueRef.current.shift();

                // const response = await fetch(`/api/app/favorite`, {
                //     method: currentFavoriteTask.type === 'fav_add' ? 'POST' : 'DELETE',
                //     body: JSON.stringify({
                //         name: currentFavoriteTask.command.name,
                //         type: currentFavoriteTask.command.type,
                //     }),
                // });

                const response = await favMutation.mutateAsync({
                    isFavorite: currentFavoriteTask.type == 'fav_add' ?  false : true,
                    name: currentFavoriteTask.command.name,
                    type: currentFavoriteTask.command.type,
                });


                console.log(await response.json());


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
