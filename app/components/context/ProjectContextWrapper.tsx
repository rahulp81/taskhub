import React, {useState,useContext,createContext, useRef, useEffect} from 'react'

interface projectContextPropType  {
projects: string[] | null ;
setProjects : React.Dispatch<React.SetStateAction<string[] | null>>
}


export const ProjectContext = createContext<projectContextPropType | null>(null)

export function useProjectContext(){
    const context = useContext(ProjectContext);
    if (!context) {
      throw new Error("useTagsContext must be used within a TagsProvider");
    }
    return context;
}


export function ProjectProvider({children}:  {children : React.ReactNode}) {
  const[projects,setProjects] = useState<string[] | null>([]);
  const retryRef = useRef<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      console.log('calling fetch');
      try {
        const res = await fetch('/api/app/project');
        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }
        const { projects } = await res.json();
        console.log('result project:', projects);

        setProjects(projects);
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
    <ProjectContext.Provider value= {{projects, setProjects}}>
      {children}
    </ProjectContext.Provider>
  )
}




