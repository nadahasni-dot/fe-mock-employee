type User = {
  id: number;
  email: string;
  role: string;
};

export type BiodataDetailResponse = {
  id: number;
  userId: number;
  position: string | null;
  name: string | null;
  birth_place: string | null;
  birth_date: string | null;
  gender: string | null;
  religion: string | null;
  blood_type: string | null;
  status: string | null;
  address_idcard: string | null;
  address_live: string | null;
  phone: string | null;
  phone_relation: string | null;
  skills: string | null;
  is_accept_all_placement: boolean | null;
  expected_income: number | null;
  user: User;
};
