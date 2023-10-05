import React, { useState, useContext, createContext, useEffect, useRef } from 'react'

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

    const retryRef = useRef<number>(0);
    useEffect(() => {
      const fetchData = async () => {
        console.log('calling fetch');
        try {
          const res = await fetch('/api/app/completedTask');
          if (!res.ok) {
            throw new Error('Failed to fetch data');
          }
          const { completedTask } = await res.json();
          console.log('result CT:', completedTask);

          setCompletedTask(completedTask);
          retryRef.current = 0;
        } catch (error) {
          if (retryRef.current < 3) {
            retryRef.current += 1;
            await fetchData(); // Retry the fetchData function
          } else {
            retryRef.current = 0;
            console.error('Failed to fetch data after 3 retries:', error);
          }
        }
      };
  
      fetchData(); // Call the async function inside useEffect
    }, []);




    return (
        <CompletedTaskContext.Provider value={{ completedTask, setCompletedTask }}>
            {children}
        </CompletedTaskContext.Provider>
    )
}




