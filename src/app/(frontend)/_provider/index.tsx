import type { PropsWithChildren } from "react";

import { DocProvider } from "./doc";

export const Provider = ({ children }: PropsWithChildren) => (
  <DocProvider>{children}</DocProvider>
);
