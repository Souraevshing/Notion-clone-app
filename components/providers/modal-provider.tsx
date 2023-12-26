"use client";

import { useEffect, useState } from "react";

import { SettingsModal } from "../modals/settings-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      <SettingsModal />
    </>
  );
};
