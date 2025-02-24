import { FooterProps } from "../../types";

export function Footer({ title, icon }: FooterProps) {
  return (
    <footer className="fixed bottom-0 left-0 h-28 w-full bg-black rounded-t-3xl flex justify-center items-center">
      <div className="flex justify-center items-center gap-2 p-3">
        { icon }
        <span className="text-primary text-lg text-justify">{ title }</span>
      </div>
    </footer>
  );
}