import { RecordModel } from "../record/record.model";
import { PaginationMetaData } from "./Pagination-meta-data";

export interface PaginationResult<T> {
  records: T[];
  pagination: PaginationMetaData;
}
