import React, { createContext, useContext, useState } from "react";

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
  return (
    <TagsContext.Provider value={{ tags, setTags }}>
      {children}
    </TagsContext.Provider>
  );
};
