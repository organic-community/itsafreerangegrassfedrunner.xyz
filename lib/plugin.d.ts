interface JupiterPlugin {
  open: () => void;
  close: () => void;
}

declare global {
  interface Window {
    Jupiter: JupiterPlugin;
  }
}
export {};
