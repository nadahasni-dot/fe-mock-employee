import { Button } from "@/components/ui/button";
import {
  Card,
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
import { TrainingDetailResponse } from "@/types/response/training";
import { ErrorResponse } from "@/types/response/error";
import { CommonResponse } from "@/types/response/success";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { EditIcon, PlusIcon, TrashIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { TrainingSchema } from "../config/training-config";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormTraining from "../form/FormTraining";
import { toast } from "sonner";

const TrainingSection = ({ biodataId }: { biodataId?: number }) => {
  const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const form = useForm<z.infer<typeof TrainingSchema>>({
    resolver: zodResolver(TrainingSchema),
  });

  const endpoint = ENDPOINTS.TRAINING.GET_LIST.replace(
    ":id",
    biodataId?.toString() || ""
  );

  const { data, refetch } = useQuery<
    AxiosResponse<CommonResponse<TrainingDetailResponse[]>>,
    AxiosError<ErrorResponse<null>>,
    CommonResponse<TrainingDetailResponse[]>
  >({
    queryKey: [endpoint],
    queryFn: () => {
      return API.get(endpoint);
    },
    select: (res) => res.data,
  });

  const { isPending: isPendingDelete, mutate: mutateDelete } = useMutation({
    mutationKey: [ENDPOINTS.TRAINING.DELETE],
    mutationFn: (trainingId: number) => {
      return API.delete(
        ENDPOINTS.TRAINING.DELETE.replace(":id", trainingId.toString())
      );
    },
    onSuccess: () => {
      refetch();
    },
    onError: (error: AxiosError<ErrorResponse<null>>) => {
      const errorMessage = error.response?.data.message || "Error occured";
      toast.error(errorMessage);
    },
  });

  const createEndpoint = ENDPOINTS.TRAINING.CREATE.replace(
    ":id",
    biodataId?.toString() || ""
  );
  const { isPending: isPendingCreate, mutate: mutateCreate } = useMutation({
    mutationKey: [createEndpoint],
    mutationFn: (payload: z.infer<typeof TrainingSchema>) => {
      return API.post(createEndpoint, payload);
    },
    onSuccess: () => {
      toast.success("Berhasil menyimpan data pendidikan");
      setSelectedId(null);
      setIsSheetOpen(false);
      form.reset({
        course_name: "",
        is_certificate: false,
        year_end: "",
        year_start: "undefined",
      });
      refetch();
    },
    onError: (error: AxiosError<ErrorResponse<null>>) => {
      const errorMessage = error.response?.data.message || "Error occured";
      toast.error(errorMessage);
    },
  });

  const updateEndpoint = ENDPOINTS.TRAINING.UPDATE.replace(
    ":id",
    selectedId?.toString() || ""
  );
  const { isPending: isPendingUpdate, mutate: mutateUpdate } = useMutation({
    mutationKey: [updateEndpoint],
    mutationFn: (payload: z.infer<typeof TrainingSchema>) => {
      return API.put(updateEndpoint, payload);
    },
    onSuccess: () => {
      toast.success("Berhasil menyimpan data pendidikan");
      setSelectedId(null);
      setIsSheetOpen(false);
      form.reset({
        course_name: "",
        is_certificate: false,
        year_end: "",
        year_start: "undefined",
      });
      refetch();
    },
    onError: (error: AxiosError<ErrorResponse<null>>) => {
      const errorMessage = error.response?.data.message || "Error occured";
      toast.error(errorMessage);
    },
  });

  const onSubmit = (payload: z.infer<typeof TrainingSchema>) => {
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
          Riwayat Pelatihan
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
              <span>Tambah Pelatihan</span>
            </Button>
          </SheetTrigger>
          <SheetContent className="overflow-auto">
            <SheetHeader>
              <SheetTitle>
                {selectedId ? "Perbarui" : "Tambah"} Pelatihan
              </SheetTitle>
              <SheetDescription>
                Kelola data pelatihan disini, klik simpan untuk selesai.
              </SheetDescription>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormTraining form={form} />
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
            <p>Tidak ada data pelatihan</p>
          ) : (
            data.data.map((training) => (
              <Card className="relative">
                <div className="absolute flex gap-2 right-6 top-6">
                  <Button
                    variant="outline"
                    size="icon"
                    disabled={isPendingDelete}
                    onClick={() => {
                      setSelectedId(training.id);
                      form.reset({
                        course_name: training.course_name,
                        is_certificate: training.is_certificate,
                        year_end: training.year_end,
                        year_start: training.year_start,
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
                    onClick={() => mutateDelete(training.id)}
                  >
                    <TrashIcon className="w-4 h-4" />
                  </Button>
                </div>
                <CardHeader>
                  <CardTitle>{training.course_name}</CardTitle>
                  <CardDescription>
                    {training.year_start} - {training.year_end} (
                    {training.is_certificate
                      ? "Bersertifikat"
                      : "Tidak Bersertifikat"}
                    )
                  </CardDescription>
                </CardHeader>
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

export default TrainingSection;
