import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/lib/supabaseclint";

export type AppointmentForm = {
  fullName: string;
  email: string;
  phone: string;
  doctor: string;
  treatment: string;
  date: string;
  message: string;
};

export const useCreateAppointment = () => {
  return useMutation({
    mutationFn: async (formData: AppointmentForm) => {
      const { data, error } = await supabase
        .from("appointment")
        .insert([
          {
            name: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            date: formData.date,
            doctor: formData.doctor,
            treatment: formData.treatment,
            message: formData.message,
          },
        ]);

      if (error) throw error;
      return data;
    },
  });
};