import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ENDPOINTS } from "@/constants/api";
import { API } from "@/lib/axios";
import { JobDetailResponse } from "@/types/response/job";
import { ErrorResponse } from "@/types/response/error";
import { CommonResponse } from "@/types/response/success";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { EditIcon, PlusIcon, TrashIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { JobSchema } from "../config/job-config";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormJob from "../form/FormJob";
import { toast } from "sonner";

const JobSection = ({ biodataId }: { biodataId?: number }) => {
  const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const form = useForm<z.infer<typeof JobSchema>>({
    resolver: zodResolver(JobSchema),
  });

  const endpoint = ENDPOINTS.JOB.GET_LIST.replace(
    ":id",
    biodataId?.toString() || ""
  );

  const { data, refetch } = useQuery<
    AxiosResponse<CommonResponse<JobDetailResponse[]>>,
    AxiosError<ErrorResponse<null>>,
    CommonResponse<JobDetailResponse[]>
  >({
    queryKey: [endpoint],
    queryFn: () => {
      return API.get(endpoint);
    },
    select: (res) => res.data,
  });

  const { isPending: isPendingDelete, mutate: mutateDelete } = useMutation({
    mutationKey: [ENDPOINTS.JOB.DELETE],
    mutationFn: (jobId: number) => {
      return API.delete(ENDPOINTS.JOB.DELETE.replace(":id", jobId.toString()));
    },
    onSuccess: () => {
      refetch();
    },
    onError: (error: AxiosError<ErrorResponse<null>>) => {
      const errorMessage = error.response?.data.message || "Error occured";
      toast.error(errorMessage);
    },
  });

  const createEndpoint = ENDPOINTS.JOB.CREATE.replace(
    ":id",
    biodataId?.toString() || ""
  );
  const { isPending: isPendingCreate, mutate: mutateCreate } = useMutation({
    mutationKey: [createEndpoint],
    mutationFn: (payload: z.infer<typeof JobSchema>) => {
      return API.post(createEndpoint, payload);
    },
    onSuccess: () => {
      toast.success("Berhasil menyimpan data pekerjaan");
      setSelectedId(null);
      setIsSheetOpen(false);
      form.reset({
        company_name: "",
        position: "",
        last_income: "",
        year_end: "",
        year_start: "",
      });
      refetch();
    },
    onError: (error: AxiosError<ErrorResponse<null>>) => {
      const errorMessage = error.response?.data.message || "Error occured";
      toast.error(errorMessage);
    },
  });

  const updateEndpoint = ENDPOINTS.JOB.UPDATE.replace(
    ":id",
    selectedId?.toString() || ""
  );
  const { isPending: isPendingUpdate, mutate: mutateUpdate } = useMutation({
    mutationKey: [updateEndpoint],
    mutationFn: (payload: z.infer<typeof JobSchema>) => {
      return API.put(updateEndpoint, payload);
    },
    onSuccess: () => {
      toast.success("Berhasil menyimpan data pendidikan");
      setSelectedId(null);
      setIsSheetOpen(false);
      form.reset({
        company_name: "",
        position: "",
        last_income: "",
        year_end: "",
        year_start: "",
      });
      refetch();
    },
    onError: (error: AxiosError<ErrorResponse<null>>) => {
      const errorMessage = error.response?.data.message || "Error occured";
      toast.error(errorMessage);
    },
  });

  const onSubmit = (payload: z.infer<typeof JobSchema>) => {
    console.log(payload);
    if (selectedId) {
      mutateUpdate(payload);
    } else {
      mutateCreate(payload);
    }
  };

  return (
    <section className="flex flex-col gap-4 mt-6">
      <div className="flex justify-between">
        <h3 className="text-2xl font-semibold tracking-tight scroll-m-20">
          Riwayat Pekerjaan
        </h3>
        <Sheet open={isSheetOpen} onOpenChange={(open) => setIsSheetOpen(open)}>
          <SheetTrigger asChild>
            <Button
              size="sm"
              className="flex gap-2"
              onClick={() => {
                setSelectedId(null);
                setIsSheetOpen(true);
              }}
            >
              <PlusIcon className="w-4 h-4" />
              <span>Tambah Pekerjaan</span>
            </Button>
          </SheetTrigger>
          <SheetContent className="overflow-auto">
            <SheetHeader>
              <SheetTitle>
                {selectedId ? "Perbarui" : "Tambah"} Pekerjaan
              </SheetTitle>
              <SheetDescription>
                Kelola data pekerjaan disini, klik simpan untuk selesai.
              </SheetDescription>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormJob form={form} />
                <Button
                  type="submit"
                  className="w-full mt-6"
                  disabled={isPendingCreate || isPendingUpdate}
                >
                  Simpan
                </Button>
              </form>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
      <div className="flex flex-col gap-4">
        {data?.data ? (
          data.data.length < 1 ? (
            <p>Tidak ada data pekerjaan</p>
          ) : (
            data.data.map((job) => (
              <Card className="relative">
                <div className="absolute flex gap-2 right-6 top-6">
                  <Button
                    variant="outline"
                    size="icon"
                    disabled={isPendingDelete}
                    onClick={() => {
                      setSelectedId(job.id);
                      form.reset({
                        company_name: job.company_name,
                        position: job.position,
                        last_income: job.last_income.toString(),
                        year_end: job.year_end,
                        year_start: job.year_start,
                      });
                      setIsSheetOpen(true);
                    }}
                  >
                    <EditIcon className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    disabled={isPendingDelete}
                    onClick={() => mutateDelete(job.id)}
                  >
                    <TrashIcon className="w-4 h-4" />
                  </Button>
                </div>
                <CardHeader>
                  <CardTitle>{job.position}</CardTitle>
                  <CardDescription>
                    {job.company_name} ({job.year_start} - {job.year_end})
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="leading-7 text-slate-500">
                    Pendapatan terakhir: {" "}
                    {job.last_income.toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    })}
                  </p>
                </CardContent>
              </Card>
            ))
          )
        ) : (
          <div>Tidak ada data pendidikan</div>
        )}
      </div>
    </section>
  );
};

export default JobSection;
