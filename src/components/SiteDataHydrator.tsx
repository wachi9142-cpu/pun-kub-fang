"use client";

import { useState } from "react";
import { hydrateSiteData, type SiteDataPayload } from "@/data/site";

export default function SiteDataHydrator({
  data,
  children,
}: {
  data: SiteDataPayload;
  children: React.ReactNode;
}) {
  useState(() => {
    hydrateSiteData(data);
    return true;
  });
  return children;
}
