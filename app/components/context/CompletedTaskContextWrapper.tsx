import React, { useState, useContext, createContext } from 'react'

interface completedTaskContextPropType {
    completedTask: completedTaskType[] | null;
    setCompletedTask: React.Dispatch<React.SetStateAction<completedTaskType[] | null>>
}

interface completedTaskType {
    taskName: string,
    completedAt: Date
    status: 'ontime' | 'late' | 'noDue'
}


export const CompletedTaskContext = createContext<completedTaskContextPropType | null>(null)

export function useCompletedTaskContext() {
    const context = useContext(CompletedTaskContext);
    if (!context) {
        throw new Error("Context must be used within a Provider");
    }
    return context;
}


export function CompletedTaskWrapper({ children }: { children: React.ReactNode }) {
    const [completedTask, setCompletedTask] = useState<completedTaskType[] | null>([]);
    return (
        <CompletedTaskContext.Provider value={{ completedTask, setCompletedTask }}>
            {children}
        </CompletedTaskContext.Provider>
    )
}




