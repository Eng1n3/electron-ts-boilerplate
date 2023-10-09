import { Box, Overlay, ScrollArea, useMantineTheme } from "@mantine/core";
import { DataTable, DataTableColumn, DataTableProps } from "mantine-datatable";
import React from "react";

import {
  EmptyTableState,
  IEmptyTableStateProps,
} from "../../empty-state/EmptyTableState";

import { Pagination, PaginationProps } from "../Pagination";

import { useStyles } from "./styles";

export type IDefaultTableProps<T> = DataTableProps<T> & {
  minWidth?: number | string;
  sameWidthColumns?: boolean;
  paginationProps?: PaginationProps;
  emptyTableStateProps?: IEmptyTableStateProps;
  skeletonRowNumber?: number;
};

export function DefaultTable<T>(props: IDefaultTableProps<T>) {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const {
    minHeight,
    noRecordsText,
    defaultColumnRender,
    highlightOnHover,
    noRecordsIcon,
    groups,
    paginationProps,
    emptyTableStateProps,
    columns,
    sameWidthColumns,
    minWidth,
    skeletonRowNumber,
    ...rest
  } = props;

  const modifiedColumns: DataTableColumn<T>[] | undefined =
    React.useMemo(() => {
      if (sameWidthColumns && columns) {
        const width = `${100 / columns?.length}%`;
        return columns.map((v) => ({ ...v, width }));
      }
      return columns;
    }, [columns, sameWidthColumns]);

  // if (fetching) {
  //   return <TableSkeleton rowNumber={props.skeletonRowNumber ?? 3} />;
  // }

  return (
    <Box>
      <ScrollArea w="100%" h="100%" mb="xs" pos="relative">
        <Box sx={{ minWidth: minWidth ?? 600, width: "100%" }}>
          <DataTable
            classNames={classes}
            fontSize={12}
            columns={modifiedColumns ?? []}
            rowClassName="bodyXs"
            horizontalSpacing="8px"
            verticalSpacing="sm"
            verticalAlignment="center"
            borderColor={theme.colors.brand[5]}
            highlightOnHover={true}
            rowBorderColor={theme.colors.brand[1]}
            minHeight={300}
            defaultColumnRender={(row, _, accessor) => {
              const data = row[accessor];
              return data === 0 ? 0 : data ?? "-";
            }}
            // emptyState={}
            {...rest}
          />
        </Box>
      </ScrollArea>

      {paginationProps && <Pagination {...paginationProps} />}
    </Box>
  );
}
