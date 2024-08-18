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
import { TrainingSchema } from "../config/training-config";
import { Checkbox } from "@/components/ui/checkbox";

const FormTraining = ({
  form,
}: {
  form: UseFormReturn<z.infer<typeof TrainingSchema>, null, undefined>;
}) => {
  return (
    <Form {...form}>
      <div className="flex flex-col gap-2 mt-6">
        <FormField
          control={form.control}
          name="course_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama Kursus/Seminar</FormLabel>
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
        <FormField
          control={form.control}
          name="is_certificate"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start p-4 space-x-3 space-y-0 border rounded-md">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Apakah pelatihan ini bersertifikat?</FormLabel>
              </div>
            </FormItem>
          )}
        />
      </div>
    </Form>
  );
};

export default FormTraining;
