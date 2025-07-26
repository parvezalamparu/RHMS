import React from "react";
import { Pagination, Stack } from "@mui/material";

interface Props {
  count: number;
  page: number;
  onChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}

const PaginationMui = ({ count, page, onChange }: Props) => {
  return (
    <Stack spacing={2} alignItems="center" className="py-4">
      <Pagination
        count={count}
        page={page}
        onChange={onChange}
        shape="rounded"
        variant="outlined"
        color="primary"
        showFirstButton
        showLastButton
      />
    </Stack>
  );
};

export default PaginationMui;
