import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { BiodataDetailResponse } from "@/types/response/biodata";
import FormBiodata from "../form/FormBiodata";
import { BiodataSchema } from "../config/biodata-config";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { EditIcon } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ENDPOINTS } from "@/constants/api";
import { LOCAL_STORAGE_KEY } from "@/constants/client-storage-keys";
import { API } from "@/lib/axios";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { ErrorResponse } from "@/types/response/error";
import dayjs from "dayjs";

const BiodataSection = ({ data }: { data?: BiodataDetailResponse | null }) => {
  const role = localStorage.getItem(LOCAL_STORAGE_KEY.ROLE) || "";

  const form = useForm<z.infer<typeof BiodataSchema>>({
    resolver: zodResolver(BiodataSchema),
    defaultValues: {
      address_idcard: data?.address_idcard || "",
      address_live: data?.address_live || "",
      birth_date: data?.birth_date || "",
      birth_place: data?.birth_place || "",
      blood_type: data?.blood_type || "",
      expected_income: data?.expected_income?.toString() || "",
      gender: data?.gender || "",
      is_accept_all_placement: data?.is_accept_all_placement || false,
      name: data?.name || "",
      phone: data?.phone || "",
      phone_relation: data?.phone_relation || "",
      position: data?.position || "",
      religion: data?.religion || "",
      skills: data?.skills || "",
      status: data?.status || "",
    },
  });

  const endpoint =
    role === "ADMIN"
      ? ENDPOINTS.BIODATA.UPDATE_ADMIN.replace(
          ":id",
          data?.id?.toString() || ""
        )
      : ENDPOINTS.BIODATA.UPDATE_USER;

  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation({
    mutationKey: [endpoint],
    mutationFn: (payload: z.infer<typeof BiodataSchema>) => {
      return API.put(endpoint, {
        userId: data?.userId,
        position: payload.position,
        name: payload.name,
        birth_place: payload.birth_place,
        birth_date: new Date(payload.birth_date).toISOString(),
        gender: payload.gender,
        religion: payload.religion,
        blood_type: payload.blood_type,
        status: payload.status,
        address_idcard: payload.address_idcard,
        address_live: payload.address_live,
        phone: payload.phone,
        phone_relation: payload.phone_relation,
        skills: payload.skills,
        is_accept_all_placement: payload.is_accept_all_placement,
        expected_income: Number(payload.expected_income),
      });
    },
    onSuccess: () => {
      toast.success("Berhasil menyimpan biodata");

      if (role === "USER") {
        console.log("refetch user");
        queryClient.invalidateQueries({
          queryKey: [ENDPOINTS.BIODATA.GET_DETAIL_USER],
        });
      }

      if (role === "ADMIN") {
        queryClient.invalidateQueries({
          queryKey: [
            ENDPOINTS.BIODATA.GET_DETAIL_ADMIN.replace(
              ":id",
              data?.id?.toString() || ""
            ),
          ],
        });
      }
    },
    onError: (error: AxiosError<ErrorResponse<null>>) => {
      const errorMessage = error.response?.data.message || "Error occured";
      toast.error(errorMessage);
    },
  });

  const onSubmit = (payload: z.infer<typeof BiodataSchema>) => {
    mutate(payload);
  };

  return (
    <section className="flex flex-col gap-4">
      <h3 className="text-2xl font-semibold tracking-tight scroll-m-20">
        Biodata
      </h3>
      <Card className="relative flex flex-col gap-2 p-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline" className="absolute right-6">
              <EditIcon className="w-4 h-4" />
            </Button>
          </SheetTrigger>
          <SheetContent className="overflow-auto">
            <SheetHeader>
              <SheetTitle>Perbarui Biodata</SheetTitle>
              <SheetDescription>
                Perbarui biodata disini, klik simpan untuk selesai.
              </SheetDescription>
            </SheetHeader>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormBiodata form={form} />
              <Button
                type="submit"
                className="w-full mt-6"
                disabled={isPending}
              >
                Simpan
              </Button>
            </form>
          </SheetContent>
        </Sheet>
        <div>
          <Label className="leading-7">Posisi</Label>
          <p className="leading-7">{data?.position || "-"}</p>
        </div>
        <div>
          <Label className="leading-7">Nama Lengkap</Label>
          <p className="leading-7">{data?.name || "-"}</p>
        </div>
        <div>
          <Label className="leading-7">Tempat Lahir</Label>
          <p className="leading-7">{data?.birth_place || "-"}</p>
        </div>
        <div>
          <Label className="leading-7">Tanggal Lahir</Label>
          <p className="leading-7">
            {dayjs(data?.birth_date).format("DD MMMM YYYY") || "-"}
          </p>
        </div>
        <div>
          <Label className="leading-7">Jenis Kelamin</Label>
          <p className="leading-7">{data?.gender || "-"}</p>
        </div>
        <div>
          <Label className="leading-7">Agama</Label>
          <p className="leading-7">{data?.religion || "-"}</p>
        </div>
        <div>
          <Label className="leading-7">Golongan Darah</Label>
          <p className="leading-7">{data?.blood_type || "-"}</p>
        </div>
        <div>
          <Label className="leading-7">Status Perkawinan</Label>
          <p className="leading-7">{data?.status || "-"}</p>
        </div>
        <div>
          <Label className="leading-7">Alamat KTP</Label>
          <p className="leading-7">{data?.address_idcard || "-"}</p>
        </div>
        <div>
          <Label className="leading-7">Alamat Tinggal</Label>
          <p className="leading-7">{data?.address_live || "-"}</p>
        </div>
        <div>
          <Label className="leading-7">Telepon</Label>
          <p className="leading-7">{data?.phone || "-"}</p>
        </div>
        <div>
          <Label className="leading-7">Telepon Kerabat</Label>
          <p className="leading-7">{data?.phone_relation || "-"}</p>
        </div>
        <div>
          <Label className="leading-7">Skill</Label>
          <p className="leading-7">{data?.skills || "-"}</p>
        </div>
        <div>
          <Label className="leading-7">
            Bersedia Ditempatkan di Seluruh Kantor
          </Label>
          <p className="leading-7">
            {data?.is_accept_all_placement ? "Ya" : "Tidak"}
          </p>
        </div>
        <div>
          <Label className="leading-7">Penghasilan Yang Diharapkan</Label>
          <p className="leading-7">
            {data?.expected_income?.toLocaleString("id-ID", {
              style: "currency",
              currency: "IDR",
            }) || "-"}
          </p>
        </div>
      </Card>
    </section>
  );
};

export default BiodataSection;
