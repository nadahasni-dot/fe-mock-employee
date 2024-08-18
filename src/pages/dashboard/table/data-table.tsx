import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ENDPOINTS } from "@/constants/api";
import { API } from "@/lib/axios";
import { BiodataDetailResponse } from "@/types/response/biodata";
import { ErrorResponse } from "@/types/response/error";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { AxiosError } from "axios";
import dayjs from "dayjs";
import { EyeIcon, MoreHorizontal, TrashIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function DataTable({ data }: { data: BiodataDetailResponse[] }) {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);

  const queryClient = useQueryClient();

  const deleteEndpoint = ENDPOINTS.BIODATA.DELETE_ADMIN.replace(
    ":id",
    selectedId?.toString() || ""
  );

  const { isPending: isPendingDelete, mutate: mutateDelete } = useMutation({
    mutationKey: [deleteEndpoint],
    mutationFn: () => {
      return API.delete(deleteEndpoint);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ENDPOINTS.BIODATA.GET_LIST_ADMIN],
      });
    },
    onError: (error: AxiosError<ErrorResponse<null>>) => {
      const errorMessage = error.response?.data.message || "Error occured";
      toast.error(errorMessage);
    },
  });

  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nama</TableHead>
            <TableHead>Tempat Lahir</TableHead>
            <TableHead>Tanggal Lahir</TableHead>
            <TableHead>Posisi Dilamar</TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length > 0 ? (
            data.map((d) => (
              <TableRow>
                <TableCell>{d.name || "-"}</TableCell>
                <TableCell>{d.birth_place || "-"}</TableCell>
                <TableCell>
                  {d.birth_date
                    ? dayjs(new Date(d.birth_date)).format("DD MMMM YYYY")
                    : "-"}
                </TableCell>
                <TableCell>{d.position || "-"}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="w-8 h-8 p-0">
                        <span className="sr-only">Buka menu</span>
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Link
                          to="/biodata/detail/$biodataId"
                          params={{ biodataId: d.id.toString() }}
                          className="flex gap-2"
                        >
                          <EyeIcon className="w-4 h-4" />
                          <p>Lihat Biodata</p>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          setSelectedId(d.id);
                          setIsAlertOpen(true);
                        }}
                      >
                        <div className="flex gap-2">
                          <TrashIcon className="w-4 h-4" />
                          <p>Hapus</p>
                        </div>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center">
                Tidak ada pelamar.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <AlertDialog
        open={isAlertOpen}
        onOpenChange={(open) => setIsAlertOpen(open)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Apakah kamu yakin?</AlertDialogTitle>
            <AlertDialogDescription>
              Aksi ini tidak dapat dikembalikan. Ini akan menghapus data
              pengguna dan biodata dari server.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction
              disabled={isPendingDelete}
              onClick={() => mutateDelete()}
            >
              Ya, Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
