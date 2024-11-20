"use client";

import * as React from "react";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { AddContentTypeButton } from "./add-content-type-button";
import { useQuery } from "@tanstack/react-query";
import { getContentTypesOptions } from "@/lib/query/queries";
import { Hash } from "lucide-react";
import Link from "next/link";
import { useQueryParams } from "@/hooks/use-query-params";

export function ContentTypesMenu() {
  const { data: contentTypes } = useQuery(getContentTypesOptions());
  const { value: selectedContentType, getNextUrl } = useQueryParams("ct");

  if (!contentTypes) return null;
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Content types</SidebarGroupLabel>
      <AddContentTypeButton />
      <SidebarGroupContent>
        <SidebarMenu>
          {contentTypes.map((contentType) => (
            <SidebarMenuItem key={contentType.name}>
              <SidebarMenuButton
                asChild
                isActive={selectedContentType == contentType.slug}
              >
                <Link className="" href={getNextUrl(contentType.slug)}>
                  <Hash />
                  <span>{contentType.name}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
