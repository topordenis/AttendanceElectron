import { useContext } from "react";
import SettingsContext from './SettingsContext'

export default () => {
    const context = useContext(SettingsContext);

    return context;
};