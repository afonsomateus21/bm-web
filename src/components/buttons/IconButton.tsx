import { ButtonProps } from "../../types";

export function IconButton({ icon, title, format = "default", ...rest }: ButtonProps) {
  return (
    <button 
      {...rest}
      className={`
        w-full h-16 flex items-center justify-center rounded-xl relative text-primary
        ${format === "outline" 
          ? "border-1 border-primary bg-transparent hover:bg-secondary/10"
          : "bg-secondary"
        }
      `}
    >
      <div 
        className={`
          h-full w-20 absolute left-0 rounded-xl flex items-center justify-center
          ${format === "outline" 
            ? "border-1 border-primary bg-transparent"
            : "bg-tertiary"
          }
        `}
      >
        {icon}
      </div>
      <strong className="text-xl">
        {title}
      </strong>
    </button>
  );
}