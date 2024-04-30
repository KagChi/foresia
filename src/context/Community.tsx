"use client";

import { FindCommunityResult } from "@/actions/Community";
import { createContext, useContext } from "react";

export const CommunityContext = createContext<FindCommunityResult | null>(null);

export const useCommunity = () => useContext(CommunityContext);
