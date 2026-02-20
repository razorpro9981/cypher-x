/* eslint-disable react-hooks/set-state-in-effect */

import React, { useState, useEffect } from 'react';

interface AiSystemTerminalProps {
  defaultStatus?: string;
}

const AiSystemTerminal: React.FC<AiSystemTerminalProps> = ({ defaultStatus }) => {
  const [status, setStatus] = useState<string>(defaultStatus || "INTEGRITY: OPTIMAL\nNEURAL_LINK: ACTIVE\nLOCATION: SECTOR_7G");
  const staticStatuses = [
    "INTEGRITY: OPTIMAL\nNEURAL_LINK: ACTIVE\nLATENCY: 4MS",
    "COOLANT: 72%\nREACTOR: GREEN\nSECTOR: 7G",
    "BIO-SIGNALS: STABLE\nAUDIO_FEED: CLEAN\nSECURITY: ARMED",
    "DATA BUS: SYNCED\nGPU MESH: 97%\nIO THROUGHPUT: 8.4 GB/S",
    "DRIFT: 0.02°\nMAG-LOCK: NOMINAL\nPOWER: 94%",
  ];

  useEffect(() => {
    if (defaultStatus) {
      setStatus(defaultStatus.toUpperCase());
      return;
    }

    const pick = () => {
      const next = staticStatuses[Math.floor(Math.random() * staticStatuses.length)];
      setStatus(next);
    };

    pick();
    const interval = setInterval(pick, 30000);
    return () => clearInterval(interval);
  }, [defaultStatus]);

  return (
    <div className="font-body text-xs text-slate-300 leading-tight whitespace-pre-line min-h-[48px]">
      {status}
    </div>
  );
};

export default AiSystemTerminal;
