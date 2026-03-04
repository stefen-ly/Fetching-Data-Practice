import { AppSidebar } from "@/components/app-sidebar";
import ProductForm from "@/components/form/product-form";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { fetchCategories } from "@/lib/data/categories";
import Link from "next/link";

export default function DashboardPage() {
    const categoriesPromise = fetchCategories();
  return (
    <main>
      <h1>Dashboard</h1>
      <Link href={"/photos/1"}>
          <h2>photo 1</h2>
      </Link>
      <div className="w-[300px]">
      <ProductForm categories={categoriesPromise} />      </div>

    </main>
  );
}
