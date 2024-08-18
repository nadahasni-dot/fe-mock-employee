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
import { EducationSchema } from "../config/education-config";

const FormBiodata = ({
  form,
}: {
  form: UseFormReturn<z.infer<typeof EducationSchema>, null, undefined>;
}) => {
  return (
    <Form {...form}>
      <div className="flex flex-col gap-2 mt-6">
        <FormField
          control={form.control}
          name="institute"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama institusi akademik</FormLabel>
              <FormControl>
                <Input
                  placeholder="Nama institusi akademik"
                  type="text"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="major"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Jurusan</FormLabel>
              <FormControl>
                <Input placeholder="Jurusan" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="grade"
          render={({ field }) => (
            <FormItem>
              <FormLabel>IPK</FormLabel>
              <FormControl>
                <Input placeholder="IPK" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-2">
          <FormField
            control={form.control}
            name="level"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Jenjang Pendidikan</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih jenjang pendidikan" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="S3">S3</SelectItem>
                    <SelectItem value="S2">S2</SelectItem>
                    <SelectItem value="S1">S1</SelectItem>
                    <SelectItem value="D4">D4</SelectItem>
                    <SelectItem value="D3">D3</SelectItem>
                    <SelectItem value="D2">D2</SelectItem>
                    <SelectItem value="D1">D1</SelectItem>
                    <SelectItem value="SMA/MA">SMA/MA</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="year_graduated"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Tahun Lulus</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Tahun lulus"
                    type="number"
                    maxLength={4}
                    {...field}
                  />
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

export default FormBiodata;
