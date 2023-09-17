import React, {useState,useContext,createContext} from 'react'

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
  console.log('projects are',projects);
  return (
    <ProjectContext.Provider value= {{projects, setProjects}}>
      {children}
    </ProjectContext.Provider>
  )
}




