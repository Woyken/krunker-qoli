/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly BUILD_TYPE: string
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv
  }
