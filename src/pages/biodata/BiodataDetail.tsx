import NavBar from "@/components/NavBar";
import ProtectedRoute from "@/components/ProtectedRoute";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ENDPOINTS } from "@/constants/api";
import { API } from "@/lib/axios";
import { BiodataDetailResponse } from "@/types/response/biodata";
import { ErrorResponse } from "@/types/response/error";
import { CommonResponse } from "@/types/response/success";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "@tanstack/react-router";
import { AxiosError, AxiosResponse } from "axios";

const BiodataDetail = () => {
  const { biodataId } = useParams({ from: "/biodata/detail/$biodataId" });

  const endpoint = ENDPOINTS.BIODATA.GET_DETAIL_ADMIN.replace(":id", biodataId);

  const { data } = useQuery<
    AxiosResponse<CommonResponse<BiodataDetailResponse>>,
    AxiosError<ErrorResponse<null>>,
    CommonResponse<BiodataDetailResponse>
  >({
    queryKey: [endpoint],
    queryFn: () => {
      return API.get(endpoint);
    },
    select: (res) => res.data,
  });

  return (
    <ProtectedRoute role="ADMIN">
      <NavBar />
      <section className="container flex flex-col gap-2 py-10">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink>
                <Link to="/admin">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Biodata</BreadcrumbPage>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Detail</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div>{data?.data?.name}</div>
      </section>
    </ProtectedRoute>
  );
};

export default BiodataDetail;
