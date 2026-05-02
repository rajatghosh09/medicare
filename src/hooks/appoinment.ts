// import { useMutation } from "@tanstack/react-query";
// import { supabase } from "@/lib/supabaseclint";

// export type AppointmentForm = {
//   fullName: string;
//   email: string;
//   phone: string;
//   doctor: string;
//   treatment: string;
//   date: string;
//   message: string;
// };

// export const useCreateAppointment = () => {
//   return useMutation({
//     mutationFn: async (formData: AppointmentForm) => {
//       const { data, error } = await supabase
//         .from("appointment")
//         .insert([
//           {
//             name: formData.fullName,
//             email: formData.email,
//             phone: formData.phone,
//             date: formData.date,
//             doctor: formData.doctor,
//             treatment: formData.treatment,
//             message: formData.message,
//           },
//         ]);

//       if (error) throw error;
//       return data;
//     },
//   });
// };



import { useMutation, useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabaseclint";
import { useAuthStore } from "@/zustand/useAuth";

export type AppointmentForm = {
  fullName: string;
  email: string;
  phone: string;
  doctor: string;
  treatment: string;
  date: string;
  message: string;
  auth_id?: string; // Link to user
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
            auth_id: formData.auth_id, // Associates the identity
          },
        ]);

      if (error) throw error;
      return data;
    },
  });
};

// Fetch appointments for the logged-in user
export const useUserAppointments = () => {
  const { user } = useAuthStore();

  return useQuery({
    queryKey: ["userAppointments", user?.auth_id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("appointment")
        .select("*")
        .eq("auth_id", user?.auth_id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!user?.auth_id,
  });
};