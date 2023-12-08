export type PaginationParams = {
    page?: number;
    take?: number;
    q?: string;
    gender?: string[];
    domain?: string[];
    present?:string[];
  }

  export type PageMeta = {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    itemCount: number;
    pageCount: number;
  }
