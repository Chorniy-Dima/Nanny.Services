import { Outlet } from "react-router";
import Header from "~/components/Header";
import { Toaster } from "react-hot-toast";

export default function Layout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
        <Toaster />
      </main>
    </>
  );
}
