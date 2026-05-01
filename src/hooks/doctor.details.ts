import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabaseclint";
import { useAuthStore } from "@/zustand/useAuth";


export const useDoctorProfile = () => {
  const { user } = useAuthStore();

  return useQuery({
    queryKey: ["doctorProfile", user?.auth_id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("doctor")
        .select(`
          *,
          signup (
            name,
            email
          )
        `)
        .eq("auth_id", user?.auth_id)
        .single();
        
      if (error && error.code !== "PGRST116") throw error;
      
      // CASE 1: Profile already exists
      if (data) {
        return {
          ...data,
          email: data.signup?.email, // Flatten email
          isNew: false
        };
      }

      // CASE 2: New profile (Fetch from signup)
      const { data: userData } = await supabase
        .from("signup")
        .select("name, email")
        .eq("auth_id", user?.auth_id)
        .single();
        
      return { ...userData, isNew: true };
    },
    enabled: !!user?.auth_id,
  });
};


export const useUpdateDoctorProfile = () => {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();

  return useMutation({
    mutationFn: async (formData: any) => {
      // 1. Destructure to remove the 'signup' object
      const { signup, ...doctorData } = formData; 

      // 2. Add 'onConflict' so Supabase knows to match by 'auth_id'
      const { data, error } = await supabase.from("doctor").upsert(
        {
          ...doctorData,
          auth_id: user?.auth_id,
        },
        { onConflict: 'auth_id' } // <--- THIS IS THE FIX
      );

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctorProfile", user?.auth_id] });
    },
  });
};