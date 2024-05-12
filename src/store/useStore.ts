import {useContext} from "react";
import {RootStore} from "./RootStore";
import {StoreContext} from "./StoreProvider";

export const useStore = (): RootStore => useContext(StoreContext);