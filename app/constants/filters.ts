import {
  where,
  orderBy,
  QueryConstraint,
  documentId,
} from "firebase/firestore";

export interface FilterOption {
  id: string;
  label: string;
  getConstraints: () => QueryConstraint[];
}

export const FILTER_OPTIONS: FilterOption[] = [
  {
    id: "a-z",
    label: "A to Z",
    getConstraints: () => [orderBy("name", "asc")],
  },
  {
    id: "z-a",
    label: "Z to A",
    getConstraints: () => [orderBy("name", "desc")],
  },
  {
    id: "price-less-15",
    label: "Less than 15$",
    getConstraints: () => [
      where("price_per_hour", "<=", 15),
      orderBy("price_per_hour", "asc"),
      orderBy(documentId(), "asc"),
    ],
  },
  {
    id: "price-greater-15",
    label: "Greater than 15$",
    getConstraints: () => [
      where("price_per_hour", ">=", 15),
      orderBy("price_per_hour", "asc"),
      orderBy(documentId(), "asc"),
    ],
  },
  {
    id: "popular",
    label: "Popular",
    getConstraints: () => [
      orderBy("rating", "desc"),
      orderBy(documentId(), "asc"),
    ],
  },
  {
    id: "not-popular",
    label: "Not popular",
    getConstraints: () => [
      orderBy("rating", "asc"),
      orderBy(documentId(), "asc"),
    ],
  },
];
