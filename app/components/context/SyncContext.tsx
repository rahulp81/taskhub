import React, { useState, useContext, createContext, useEffect, useRef } from 'react';
import { useMutation } from 'react-query';
import toggleFav from '@/app/lib/sync api/toggleFav'
import Label from '@/app/lib/sync api/Label';

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
    const queRef = useRef<any>([]);
    const processing = useRef(false);
    const favMutation = useMutation(toggleFav, {
        retry: 5
    })
    const LabelMutation = useMutation(Label, {
        retry: 5
    });


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
