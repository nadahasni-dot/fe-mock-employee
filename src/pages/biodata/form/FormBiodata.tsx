import { BiodataSchema } from "../config/biodata-config";
import { z } from "zod";
import { UseFormReturn } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

const FormBiodata = ({
  form,
}: {
  form: UseFormReturn<z.infer<typeof BiodataSchema>, null, undefined>;
}) => {
  return (
    <Form {...form}>
      <div className="flex flex-col gap-2 mt-6">
        <FormField
          control={form.control}
          name="position"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Posisi yang dilamar</FormLabel>
              <FormControl>
                <Input placeholder="Posisi" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama lengkap</FormLabel>
              <FormControl>
                <Input placeholder="Nama lengkap" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-2">
          <FormField
            control={form.control}
            name="birth_place"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Tempat lahir</FormLabel>
                <FormControl>
                  <Input placeholder="Tempat lahir" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="birth_date"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Tanggal lahir</FormLabel>
                <FormControl>
                  <Input placeholder="Tanggal lahir" type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex gap-2">
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Jenis Kelamin</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih jenis kelamin" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Laki - laki">Laki - laki</SelectItem>
                    <SelectItem value="Perempuan">Perempuan</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="religion"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Agama</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih agama" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Islam">Islam</SelectItem>
                    <SelectItem value="Katolik">Katolik</SelectItem>
                    <SelectItem value="Kristen">Kristen</SelectItem>
                    <SelectItem value="Hindu">Hindu</SelectItem>
                    <SelectItem value="Budha">Budha</SelectItem>
                    <SelectItem value="Konghuchu">Konghuchu</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex gap-2">
          <FormField
            control={form.control}
            name="blood_type"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Golongan Darah</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih golongan darah" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="A">A</SelectItem>
                    <SelectItem value="B">B</SelectItem>
                    <SelectItem value="AB">AB</SelectItem>
                    <SelectItem value="O">O</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Status Perkawinan</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih status perkawinan" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Belum Menikah">Belum Menikah</SelectItem>
                    <SelectItem value="Sudah Menikah">Sudah Menikah</SelectItem>
                    <SelectItem value="Cerai">Cerai</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="address_idcard"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Alamat KTP</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Alamat ktp"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address_live"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Alamat Tinggal</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Alamat tinggal saat ini"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nomor telepon</FormLabel>
              <FormControl>
                <Input placeholder="Nomor telepon" type="tel" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone_relation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nomor telepon orang terdekat</FormLabel>
              <FormControl>
                <Input
                  placeholder="Nomor telepon orang terdekat"
                  type="tel"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="skills"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Skill</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Masukkan skill/keterampilan anda"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="expected_income"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Penghasilan yang diharapkan</FormLabel>
              <FormControl>
                <Input
                  placeholder="Penghasilan yang diharapkan"
                  type="number"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="is_accept_all_placement"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start p-4 space-x-3 space-y-0 border rounded-md">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  Bersedia ditempatkan di seluruh kantor perusahaan?
                </FormLabel>
              </div>
            </FormItem>
          )}
        />
      </div>
    </Form>
  );
};

export default FormBiodata;
