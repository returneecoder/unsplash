import { useContext, useState, createContext } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const[isDarkTheme,setIsDarkTheme] = useState(false)
  const [searchTerm,setSearchTerm] = useState('cat')

  //const [page, setPage] = useState(1);// to set pagination
  //const [totalPages, setTotalPages] = useState();// to set pagination

  const toggleDarkTheme =() =>{
    const newDarkTheme = !isDarkTheme
    setIsDarkTheme(newDarkTheme);
    const body = document.querySelector('body')
    body.classList.toggle('dark-theme',newDarkTheme)
    
  }
  return (
    <AppContext.Provider value={{ isDarkTheme,toggleDarkTheme,searchTerm,setSearchTerm,}}>
        
        {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => useContext(AppContext);
