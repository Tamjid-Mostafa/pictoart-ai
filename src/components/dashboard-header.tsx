"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

const DashboardHeader = () => {
  const pathname = usePathname();
  const breadcrumb = pathname.split("/").filter(Boolean);

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumb.map((item, index) => {
              const isLastItem = index === breadcrumb.length - 1;
              return (
                <Fragment key={index}>
                  <BreadcrumbItem key={index}>
                    {isLastItem ? (
                      <BreadcrumbPage className="text-primary font-bold capitalize">
                        {item}
                      </BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink href={`/${breadcrumb.slice(0, index + 1).join("/")}`} className="capitalize">
                        {item}
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                  {!isLastItem && (
                    <BreadcrumbSeparator className="hidden md:block" />
                  )}
                </Fragment>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  );
};

export default DashboardHeader;
