import {
  PaginationContent,
  PaginationItem,
  Pagination,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
} from "@/components/ui/pagination";

const TablePagination = ({
  page = 1,
  totalPage = 1,
  onPageChanged,
}: {
  page: number;
  totalPage: number;
  onPageChanged: (page: number) => void;
}) => {
  const prevPage = page <= 1 ? 1 : page - 1;
  const nextPage = page >= totalPage ? totalPage : page + 1;
  const pages = [...Array(totalPage).keys()];

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={() => onPageChanged(prevPage)} />
        </PaginationItem>
        {pages.map((p) => {
          const current = p + 1;
          return (
            <PaginationItem key={p}>
              <PaginationLink
                isActive={page === current}
                onClick={() => onPageChanged(current)}
              >
                {current}
              </PaginationLink>
            </PaginationItem>
          );
        })}
        <PaginationItem>
          <PaginationNext onClick={() => onPageChanged(nextPage)} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default TablePagination;
