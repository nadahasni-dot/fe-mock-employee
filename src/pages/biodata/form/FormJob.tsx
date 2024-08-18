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
import { JobSchema } from "../config/job-config";

const FormJob = ({
  form,
}: {
  form: UseFormReturn<z.infer<typeof JobSchema>, null, undefined>;
}) => {
  return (
    <Form {...form}>
      <div className="flex flex-col gap-2 mt-6">
        <FormField
          control={form.control}
          name="company_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama perusahaan</FormLabel>
              <FormControl>
                <Input placeholder="Nama perusahaan" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="position"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Posisi/Jabatan</FormLabel>
              <FormControl>
                <Input placeholder="Posisi/Jabatan" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="last_income"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pendapatan terakhir</FormLabel>
              <FormControl>
                <Input
                  placeholder="Pendapatan terakhir"
                  type="number"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-2">
          <FormField
            control={form.control}
            name="year_start"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Tahun mulai</FormLabel>
                <FormControl>
                  <Input placeholder="Tahun mulai" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="year_end"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Tahun akhir</FormLabel>
                <FormControl>
                  <Input placeholder="Tahun akhir" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </Form>
  );
};

export default FormJob;
