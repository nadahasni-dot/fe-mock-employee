import NavBar from "@/components/NavBar";
import ProtectedRoute from "@/components/ProtectedRoute";
import { ENDPOINTS } from "@/constants/api";
import { LOCAL_STORAGE_KEY } from "@/constants/client-storage-keys";
import { API } from "@/lib/axios";
import { BiodataDetailResponse } from "@/types/response/biodata";
import { ErrorResponse } from "@/types/response/error";
import { CommonListResponse } from "@/types/response/success";
import { useQuery } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { DataTable } from "./table/data-table";
import TablePagination from "./table/pagination";
import { useState } from "react";
import { Input } from "@/components/ui/input";

const DashboardAdmin = () => {
  const perPage = 10;
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const email = localStorage.getItem(LOCAL_STORAGE_KEY.EMAIL) || "";

  const { data } = useQuery<
    AxiosResponse<CommonListResponse<BiodataDetailResponse[]>>,
    AxiosError<ErrorResponse<null>>,
    CommonListResponse<BiodataDetailResponse[]>
  >({
    queryKey: [ENDPOINTS.BIODATA.GET_LIST_ADMIN, page, perPage, search],
    queryFn: () => {
      return API.get(ENDPOINTS.BIODATA.GET_LIST_ADMIN, {
        params: {
          search,
          page,
          perPage,
        },
      });
    },
    select: (res) => res.data,
  });

  const handlePageChanged = (page: number) => {
    setPage(page);
  };

  return (
    <ProtectedRoute role="ADMIN">
      <NavBar />
      <section className="container flex flex-col gap-2 py-10">
        <h2 className="text-2xl font-semibold tracking-tight scroll-m-20">
          Selamat Datang {email}!
        </h2>
        <p className="mb-5 leading-7">
          Kelola data pelamar pada tabel di bawah ini
        </p>
        <Input
          type="text"
          placeholder="Cari"
          className="max-w-xs"
          onChange={(e) => setSearch(e.target.value)}
        />
        <DataTable data={data?.data || []} />
        <TablePagination
          page={page}
          totalPage={data?.meta.totalPage || 1}
          onPageChanged={handlePageChanged}
        />
      </section>
    </ProtectedRoute>
  );
};

export default DashboardAdmin;
