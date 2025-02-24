import { Outlet } from "react-router";
import { HomeButton, PreviousPageButton } from "../buttons";

export function SchedulingRoute() {
  return (
    <div className="p-7 h-full flex flex-col">
      <header className="flex justify-between items-center">
        <PreviousPageButton />
        <HomeButton />
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}