import React, { createContext, useContext, useEffect, useRef, useState } from "react";

type TagsContextType = {
  tags: string[] | null;
  setTags: React.Dispatch<React.SetStateAction<string[] | null>>;
};

const TagsContext = createContext<TagsContextType | null>(null);

//custom hook to access the tags context
export function useTagsContext() {
  const context = useContext(TagsContext);
  if (!context) {
    throw new Error("useTagsContext must be used within a TagsProvider");
  }
  return context;
}

export const TagsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tags, setTags] = useState<string[] | null>([]);

  const retryRef = useRef<number>(0);
  useEffect(() => {
    const fetchData = async () => {
      console.log('calling fetch');
      try {
        const res = await fetch('/api/app/label');
        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }
        const { labels } = await res.json();
        console.log('result label:', labels);
        setTags(labels);
        retryRef.current = 0;
      } catch (error) {
        if (retryRef.current < 3) {
          retryRef.current += 1;
          await fetchData();
        } else {
          retryRef.current = 0;
          console.error('Failed to fetch data after 3 retries:', error);
        }
      }
    };

    fetchData(); // Call the async function inside useEffect
  }, []);

  return (
    <TagsContext.Provider value={{ tags, setTags }}>
      {children}
    </TagsContext.Provider>
  );
};
