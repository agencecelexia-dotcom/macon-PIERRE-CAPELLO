import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const cookieStore = await cookies();
  const auth = cookieStore.get("admin_auth");
  if (!auth || auth.value !== "macon-admin-session-v1") {
    redirect("/admin/login");
  }
  redirect("/admin/dashboard");
}
