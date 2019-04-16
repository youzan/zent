export type PaginationLayout =
  | {
      type: 'left-arrow';
      disabled: boolean;
    }
  | {
      type: 'right-arrow';
      disabled: boolean;
    }
  | {
      type: 'number';
      page: number;
      selected: boolean;
    }
  | {
      type: 'double-left-arrow';
    }
  | {
      type: 'double-right-arrow';
    }
  | {
      type: 'mini-jumper';
      totalPages: number;
    };
