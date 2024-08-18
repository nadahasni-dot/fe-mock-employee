import NavBar from "@/components/NavBar";
import ProtectedRoute from "@/components/ProtectedRoute";
import { ENDPOINTS } from "@/constants/api";
import { LOCAL_STORAGE_KEY } from "@/constants/client-storage-keys";
import { API } from "@/lib/axios";
import { BiodataDetailResponse } from "@/types/response/biodata";
import { ErrorResponse } from "@/types/response/error";
import { CommonResponse } from "@/types/response/success";
import { useQuery } from "@tanstack/react-query";

import { AxiosError, AxiosResponse } from "axios";
import BiodataSection from "../biodata/components/BiodataSection";
import EducationSection from "../biodata/components/EducationSection";
import TrainingSection from "../biodata/components/TrainingSection";

const DashboardUser = () => {
  const email = localStorage.getItem(LOCAL_STORAGE_KEY.EMAIL) || "";

  const { data } = useQuery<
    AxiosResponse<CommonResponse<BiodataDetailResponse>>,
    AxiosError<ErrorResponse<null>>,
    CommonResponse<BiodataDetailResponse>
  >({
    queryKey: [ENDPOINTS.BIODATA.GET_DETAIL_USER],
    queryFn: () => {
      return API.get(ENDPOINTS.BIODATA.GET_DETAIL_USER);
    },
    select: (res) => res.data,
  });

  return (
    <ProtectedRoute role="USER">
      <NavBar />
      <section className="container flex flex-col gap-2 py-10">
        <h2 className="text-2xl font-semibold tracking-tight scroll-m-20">
          Selamat Datang {email}!
        </h2>
        <p className="leading-7">Harap lengkapi biodata</p>
        <BiodataSection data={data?.data} />
        <EducationSection biodataId={data?.data?.id} />
        <TrainingSection biodataId={data?.data?.id} />
      </section>
    </ProtectedRoute>
  );
};

export default DashboardUser;
