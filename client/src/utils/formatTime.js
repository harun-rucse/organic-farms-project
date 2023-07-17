import { format } from "date-fns";

export function fDate(date, newFormat) {
  const fm = newFormat || "dd MMM yyyy";

  return date ? format(new Date(date), fm) : "";
}
