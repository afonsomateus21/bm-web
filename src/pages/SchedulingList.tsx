import { ServiceScheduled } from "../components";
import { CustomSelect } from "../components/inputs/CustomSelect";

export function SchedulingList() {
  return (
    <div>
      <h1 className="text-2xl"></h1>
      <ServiceScheduled />

      <CustomSelect 
        title="Serviço"
        options={[
          { value: "op1", label: "Opção 1" },
          { value: "op2", label: "Opção 2" },
          { value: "op3", label: "Opção 3" }
        ]}
      />
    </div>
  );
}