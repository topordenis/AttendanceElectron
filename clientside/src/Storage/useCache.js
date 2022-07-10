import { useContext } from "react";
import CacheContext from './CacheContext'

export default () => {
    const context = useContext(CacheContext);

    return context;
};