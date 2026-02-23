import { AdminBodyClass } from "./AdminBodyClass";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AdminBodyClass />
      {children}
    </>
  );
}
