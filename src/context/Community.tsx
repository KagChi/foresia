"use client";

import { Community } from "@/db/schema";
import { createContext, useContext } from "react";

export const CommunityContext = createContext<Omit<typeof Community.$inferSelect, "id" | "updatedAt"> | null>(null);

export const useCommunity = () => useContext(CommunityContext);
