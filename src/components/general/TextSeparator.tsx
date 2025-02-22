import { TextSeparatorProps } from "../../types";

export function TextSeparator({ text, textSize = "lg", color = "secondary", fontWeight = "semibold" }: TextSeparatorProps) {

  return (
    <div className="w-full flex items-center">
      <div className="w-full border-b border-black relative">
        <span
          className={`
            absolute left-1/2 -translate-x-1/2
            -top-3 bg-primary px-5
            whitespace-nowrap
            text-${textSize} text-${color} font-${fontWeight}`}
        >
          {text}
        </span>
      </div>
    </div>
  );
}