import { TextSeparatorProps } from "../../types";

export function TextSeparator({ text, background = "primary", textSize = "lg", lineColor = "tertiary", color = "secondary", fontWeight = "semibold" }: TextSeparatorProps) {

  return (
    <div className="w-full flex items-center">
      <div className={`w-full border-b border-${lineColor} relative`}>
        <span
          className={`
            absolute left-1/2 -translate-x-1/2
            -top-3 bg-${background} px-5
            whitespace-nowrap
            text-${textSize} text-${color} font-${fontWeight}`}
        >
          {text}
        </span>
      </div>
    </div>
  );
}