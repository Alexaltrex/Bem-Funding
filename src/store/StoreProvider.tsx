"use client";
import {RootStore, store} from "./RootStore";
import {createContext, ReactNode} from "react";

export const StoreContext = createContext<RootStore>({} as RootStore)

export const StoreProvider = ({ children }: { children: ReactNode }) => {
    return (
        <StoreContext.Provider value={store}>
            {children}
        </StoreContext.Provider>
    );
};