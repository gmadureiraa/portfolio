"use client";

import { useEffect, useMemo, useState } from "react";
import { useTheme } from "next-themes";
import {
  Cloud,
  fetchSimpleIcons,
  ICloud,
  renderSimpleIcon,
  SimpleIcon,
} from "react-icon-cloud";

import { sanitizeSlug } from "@/lib/utils";

export const cloudProps: Omit<ICloud, "children"> = {
  containerProps: {
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      paddingTop: 40,
    },
  },
  options: {
    reverse: true,
    depth: 1,
    wheelZoom: false,
    imageScale: 2,
    activeCursor: "pointer",
    tooltip: "native",
    initial: [0.05, -0.05],
    clickToFront: 700,
    tooltipDelay: 0,
    outlineColour: "#0000",
    maxSpeed: 0.02,
    minSpeed: 0.01,
  },
};

export const renderCustomIcon = (
  icon: SimpleIcon,
  theme: string,
  liveLinks: boolean
) => {
  const bgHex = theme === "light" ? "#f3f2ef" : "#080510";
  const fallbackHex = theme === "light" ? "#000000" : "#ffffff";
  const minContrastRatio = theme === "dark" ? 2 : 1.2;

  // Forçar a cor
  const customIcon = { ...icon, hex: theme === "dark" ? "ffffff" : "000000" };

  return renderSimpleIcon({
    icon: customIcon,
    bgHex,
    fallbackHex,
    minContrastRatio,
    size: 42,
    aProps: liveLinks
      ? {
          href: `/tags/${sanitizeSlug(
            icon.slug
          )}`,
          target: "",
          rel: "noopener noreferrer",
        }
      : {
          href: `/tags/${sanitizeSlug(
            icon.slug
          )}`,
          target: undefined,
          rel: undefined,
          onClick: (e: any) => e.preventDefault(),
          style: { cursor: "pointer" },
        },
  });
};

export type DynamicCloudProps = {
  iconSlugs: string[];
  liveLinks?: boolean;
};

type IconData = Awaited<ReturnType<typeof fetchSimpleIcons>>;

export default function IconCloud({
  iconSlugs,
  liveLinks = true,
}: DynamicCloudProps) {
  const [data, setData] = useState<IconData | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    fetchSimpleIcons({ slugs: iconSlugs }).then(setData);
  }, [iconSlugs]);

  const renderedIcons = useMemo(() => {
    if (!data) return null;

    return Object.values(data.simpleIcons).map((icon) =>
      renderCustomIcon(icon, theme || "light", liveLinks)
    );
  }, [data, theme, liveLinks]);

  return (
    // @ts-ignore
    <Cloud {...cloudProps}>
      <>{renderedIcons}</>
    </Cloud>
  );
}
