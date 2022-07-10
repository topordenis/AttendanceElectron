import React, { useEffect, useState } from "react";

const SettingsContext = React.createContext();


export const SettingsProvider = ({ children, settings }) => {
  const [scannerMode, setScannerModeTMP] = useState(0);

  const setScannerMode = (mode) => {
    setScannerModeTMP(mode);
    localStorage.setItem("scannerMode", mode)
  }
  useEffect(() => {

    var item = localStorage.getItem('scannerMode');
    if (item)
      setScannerModeTMP(item);
  }, []);
  return (
    <SettingsContext.Provider
      value={{
        scannerMode: scannerMode, setScannerMode,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const SettingsConsumer = SettingsContext.Consumer;
export default SettingsContext;