"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import { SettingsModal } from "../modals/settings-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  if (!isMounted) {
    toast.error("Something went wrong!");
    return null;
  }

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      <SettingsModal />
    </>
  );
};
