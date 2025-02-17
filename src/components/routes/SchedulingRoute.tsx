import { Outlet } from "react-router";
import { HomeButton, PreviousPageButton } from "../buttons";

export function SchedulingRoute() {
  return (
    <div className="p-5 h-full">
      <header className="flex justify-between items-center">
        <PreviousPageButton />
        <HomeButton />
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}