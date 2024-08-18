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
import { EducationDetailResponse } from "@/types/response/education";
import { ErrorResponse } from "@/types/response/error";
import { CommonResponse } from "@/types/response/success";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { EditIcon, PlusIcon, TrashIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { EducationSchema } from "../config/education-config";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormEducation from "../form/FormEducation";
import { toast } from "sonner";

const EducationSection = ({ biodataId }: { biodataId?: number }) => {
  const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const form = useForm<z.infer<typeof EducationSchema>>({
    resolver: zodResolver(EducationSchema),
  });

  const endpoint = ENDPOINTS.EDUCATION.GET_LIST.replace(
    ":id",
    biodataId?.toString() || ""
  );

  const { data, refetch } = useQuery<
    AxiosResponse<CommonResponse<EducationDetailResponse[]>>,
    AxiosError<ErrorResponse<null>>,
    CommonResponse<EducationDetailResponse[]>
  >({
    queryKey: [endpoint],
    queryFn: () => {
      return API.get(endpoint);
    },
    select: (res) => res.data,
  });

  const { isPending: isPendingDelete, mutate: mutateDelete } = useMutation({
    mutationKey: [ENDPOINTS.EDUCATION.DELETE],
    mutationFn: (educationId: number) => {
      return API.delete(
        ENDPOINTS.EDUCATION.DELETE.replace(":id", educationId.toString())
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

  const createEndpoint = ENDPOINTS.EDUCATION.CREATE.replace(
    ":id",
    biodataId?.toString() || ""
  );
  const { isPending: isPendingCreate, mutate: mutateCreate } = useMutation({
    mutationKey: [createEndpoint],
    mutationFn: (payload: z.infer<typeof EducationSchema>) => {
      return API.post(createEndpoint, payload);
    },
    onSuccess: () => {
      toast.success("Berhasil menyimpan data pendidikan");
      setSelectedId(null);
      setIsSheetOpen(false);
      form.reset();
      refetch();
    },
    onError: (error: AxiosError<ErrorResponse<null>>) => {
      const errorMessage = error.response?.data.message || "Error occured";
      toast.error(errorMessage);
    },
  });

  const updateEndpoint = ENDPOINTS.EDUCATION.UPDATE.replace(
    ":id",
    selectedId?.toString() || ""
  );
  const { isPending: isPendingUpdate, mutate: mutateUpdate } = useMutation({
    mutationKey: [updateEndpoint],
    mutationFn: (payload: z.infer<typeof EducationSchema>) => {
      return API.put(updateEndpoint, payload);
    },
    onSuccess: () => {
      toast.success("Berhasil menyimpan data pendidikan");
      setSelectedId(null);
      setIsSheetOpen(false);
      form.reset();
      refetch();
    },
    onError: (error: AxiosError<ErrorResponse<null>>) => {
      const errorMessage = error.response?.data.message || "Error occured";
      toast.error(errorMessage);
    },
  });

  const onSubmit = (payload: z.infer<typeof EducationSchema>) => {
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
          Riwayat Pendidikan
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
              <span>Tambah Pendidikan</span>
            </Button>
          </SheetTrigger>
          <SheetContent className="overflow-auto">
            <SheetHeader>
              <SheetTitle>
                {selectedId ? "Perbarui" : "Tambah"} Pendidikan
              </SheetTitle>
              <SheetDescription>
                Kelola data edukasi disini, klik simpan untuk selesai.
              </SheetDescription>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormEducation form={form} />
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
            <p>Tidak ada data pendidikan</p>
          ) : (
            data.data.map((edu) => (
              <Card className="relative">
                <div className="absolute flex gap-2 right-6 top-6">
                  <Button
                    variant="outline"
                    size="icon"
                    disabled={isPendingDelete}
                    onClick={() => {
                      setSelectedId(edu.id);
                      form.reset({
                        grade: edu.grade,
                        institute: edu.institute,
                        level: edu.level,
                        major: edu.major,
                        year_graduated: edu.year_graduated,
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
                    onClick={() => mutateDelete(edu.id)}
                  >
                    <TrashIcon className="w-4 h-4" />
                  </Button>
                </div>
                <CardHeader>
                  <CardTitle>
                    {edu.major} ({edu.level})
                  </CardTitle>
                  <CardDescription>
                    {edu.institute} - Lulus {edu.year_graduated} ({edu.grade})
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

export default EducationSection;
