import { state, useSnapshot } from "reactish-state";

export const pageSwitchingState = state<string, unknown>("login");

export const usePageSwitchingSnapshot = () => useSnapshot(pageSwitchingState);

