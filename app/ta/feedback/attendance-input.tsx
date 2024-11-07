import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { UseFormReturn } from "react-hook-form";
import { FeedbackFormData } from "./schema";

interface AttendanceInputProps {
  form: UseFormReturn<FeedbackFormData>;
  attendanceType: string;
}

export function AttendanceInput({ form, attendanceType }: AttendanceInputProps) {
  if (attendanceType === "exact") {
    return (
      <FormField
        control={form.control}
        name="attendanceCount"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Attendance Count</FormLabel>
            <FormControl>
              <Input 
                type="number"
                value={field.value || ""}
                onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : 0)}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }

  return (
    <FormField
      control={form.control}
      name="attendanceEstimate"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Estimated Attendance</FormLabel>
          <FormControl>
            <RadioGroup
              value={field.value}
              onValueChange={field.onChange}
              className="flex space-x-4"
            >
              <FormItem className="flex items-center space-x-2">
                <FormControl>
                  <RadioGroupItem value="low" />
                </FormControl>
                <FormLabel className="font-normal">
                  Low
                </FormLabel>
              </FormItem>
              <FormItem className="flex items-center space-x-2">
                <FormControl>
                  <RadioGroupItem value="medium" />
                </FormControl>
                <FormLabel className="font-normal">
                  Medium
                </FormLabel>
              </FormItem>
              <FormItem className="flex items-center space-x-2">
                <FormControl>
                  <RadioGroupItem value="high" />
                </FormControl>
                <FormLabel className="font-normal">
                  High
                </FormLabel>
              </FormItem>
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}