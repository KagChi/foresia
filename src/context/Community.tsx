"use client";

import { Community, User } from "@/db/schema";
import { createContext, useContext } from "react";

export const CommunityContext = createContext<Omit<typeof Community.$inferSelect, "id" | "updatedAt" | "ownerId"> & { author: Pick<typeof User.$inferSelect, "avatar" | "nick" | "username"> } | null>(null);

export const useCommunity = () => useContext(CommunityContext);
