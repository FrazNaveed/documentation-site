import { useContext } from "react";

import { DocContext } from "@/src/app/(frontend)/_provider/doc";

export const useDoc = () => useContext(DocContext);
