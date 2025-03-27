import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function LanguaugeSelector() {
  return (
    <Select defaultValue="en">
      <SelectTrigger className="data-[size=default]:h-6 border-0 bg-none text-white uppercase tracking-[2px] font-medium text-xs shadow-none px-0">
        <SelectValue placeholder="🇬🇧 English" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="en">🇬🇧 English</SelectItem>
          <SelectItem value="fr">🇫🇷 French</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
