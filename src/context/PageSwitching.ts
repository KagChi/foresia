import React, { Dispatch, SetStateAction, useContext } from "react";

export const PageSwitchingContext = React.createContext<{ page: string; setPage: Dispatch<SetStateAction<string>> } | null>(null);

export const usePageSwitching = () => useContext(PageSwitchingContext);
