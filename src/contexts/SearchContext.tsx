"use client";

import { URL } from "@prisma/client";
import React, { createContext, useContext, useEffect, useState } from "react";

type SearchContextProps = {
  query: string;
  results: any;
  setQuery: (query: string) => void;
  setResults: (results: any) => void;
};
const SearchContext = createContext<SearchContextProps | null>(null);

interface SearchbarProviderProps {
  children: React.ReactNode;
}

export const SearchProvider = ({ children }: SearchbarProviderProps) => {
  const [results, setResults] = useState<
    (URL[] & { total: string; hasMore: boolean }) | null
  >(null);
  const [query, setQuery] = useState<string>("");

  return (
    <SearchContext.Provider value={{ query, results, setQuery, setResults }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};
