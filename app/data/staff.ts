export type StaffMember = {
  id: string;
  name: string;
  url?: string;
  avatar_url?: string;
};

export type StaffType = {
  name: string;
  name_en?: string;
  staff: StaffMember[];
};

export type StaffResponse = {
  staff_types: StaffType[];
};

/**
 * Display priority for known staff types. Types listed here appear first, in
 * this order; any other type keeps its original (API) order after them.
 */
const TYPE_ORDER = ["Chair", "Core Staff", "Staff"];

const orderIndex = (type: StaffType): number => {
  const index = TYPE_ORDER.indexOf(type.name_en ?? type.name);
  return index === -1 ? TYPE_ORDER.length : index;
};

/**
 * Normalize the raw `staff_types` payload from the fortee API: trim names,
 * fall back `name_en` to `name`, drop empty groups, and order groups so the
 * organizing committee chair leads, followed by core staff and general staff.
 */
export const normalizeStaffTypes = (types: StaffType[] | undefined): StaffType[] =>
  (types ?? [])
    .map((type) => ({
      ...type,
      name: type.name.trim(),
      name_en: type.name_en?.trim() ?? type.name.trim(),
      staff: type.staff ?? [],
    }))
    .filter((type) => type.staff.length > 0)
    .sort((a, b) => orderIndex(a) - orderIndex(b));
