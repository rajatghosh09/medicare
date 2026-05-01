
"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDoctorProfile, useUpdateDoctorProfile } from "@/hooks/doctor.details";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Stethoscope, DollarSign, FileText, Loader2, Pencil, Check, X, Clock, Calendar, Mail } from "lucide-react";

const DAYS_OF_WEEK = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const DoctorDashboard = () => {
  const { data: profile, isLoading } = useDoctorProfile();
  const mutation = useUpdateDoctorProfile();
  const [isEditing, setIsEditing] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (profile) {
      reset({
        name: profile.name || profile.signup?.name,
        email: profile.email || profile.signup?.email,
        designation: profile.designation,
        fees: profile.fees,
        description: profile.description,
        availability: profile.availability || { days: [], startTime: "09:00", endTime: "17:00" }
      });
    }
  }, [profile, reset]);

  const onSubmit = (data: any) => {
    mutation.mutate(data, {
      onSuccess: () => {
        setIsEditing(false);
        console.log("Profile updated successfully!");
      },
      onError: (error) => {
        alert("Error saving profile: " + error.message);
      },
    });
  };

  if (isLoading)
    return (
      <div className="flex h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-cyan-600" />
      </div>
    );

  return (
    <div className="container max-w-3xl mx-auto py-10 px-4">
      <Card className="overflow-hidden border-none shadow-lg">
        <div className="h-32 bg-gradient-to-r from-cyan-600 to-blue-700 relative">
          <div className="absolute -bottom-10 left-8">
            <div className="h-20 w-20 rounded-full bg-white flex items-center justify-center shadow-lg border-4 border-white">
              <User className="h-10 w-10 text-cyan-600" />
            </div>
          </div>
        </div>

        <CardHeader className="pt-14 px-8 pb-2 flex flex-row justify-between items-start">
          <div>
            <CardTitle className="text-3xl font-bold">{profile?.name || profile?.signup?.name || "Doctor Name"}</CardTitle>
            <p className="text-cyan-600 font-medium">{profile?.designation || "Add your designation"}</p>
          </div>
          {!isEditing && (
            <Button variant="outline" onClick={() => setIsEditing(true)} className="gap-2">
              <Pencil className="w-4 h-4" /> Edit Profile
            </Button>
          )}
        </CardHeader>

        <CardContent className="px-8 pb-8 pt-6">
          {!isEditing ? (
            /* VIEW MODE */
            <div className="space-y-8">
              <div className="space-y-2">
                <Label className="text-xs uppercase text-slate-400 font-bold tracking-wider flex items-center gap-2"><Mail className="w-3 h-3"/> Email</Label>
                <p className="p-3 bg-slate-100 rounded-md text-slate-700 font-medium">{profile?.email || profile?.signup?.email || "No email available"}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-1">
                  <Label className="text-xs uppercase text-slate-400 font-bold tracking-wider">Consultation Fees</Label>
                  <p className="text-lg font-semibold flex items-center gap-2"><DollarSign className="w-5 h-5 text-green-600" />{profile?.fees ? `${profile.fees} USD` : "Not set"}</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs uppercase text-slate-400 font-bold tracking-wider">Expertise</Label>
                  <p className="text-lg font-semibold flex items-center gap-2"><Stethoscope className="w-5 h-5 text-blue-600" />{profile?.designation || "Not specified"}</p>
                </div>
              </div>

              {/* View Availability */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t">
                 <div className="space-y-1">
                    <Label className="text-xs uppercase text-slate-400 font-bold tracking-wider">Availability</Label>
                    <p className="font-medium text-slate-700 flex items-center gap-2 mt-1"><Calendar className="w-4 h-4 text-cyan-600"/> {profile?.availability?.days?.join(", ") || "No days set"}</p>
                 </div>
                 <div className="space-y-1">
                    <Label className="text-xs uppercase text-slate-400 font-bold tracking-wider">Hours</Label>
                    <p className="font-medium text-slate-700 flex items-center gap-2 mt-1"><Clock className="w-4 h-4 text-cyan-600"/> {profile?.availability?.startTime || "--:--"} - {profile?.availability?.endTime || "--:--"}</p>
                 </div>
              </div>
              
              <div className="space-y-2 pt-4 border-t">
                <Label className="text-xs uppercase text-slate-400 font-bold tracking-wider">About Me</Label>
                <p className="text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-lg">{profile?.description || "No biography added yet."}</p>
              </div>
            </div>
          ) : (
            /* EDIT MODE */
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid gap-5">
                <div className="grid gap-2">
                  <Label>Full Name</Label>
                  <Input {...register("name")} />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label>Designation</Label>
                    <Input {...register("designation")} />
                  </div>
                  <div className="grid gap-2">
                    <Label>Fees ($)</Label>
                    <Input {...register("fees")} type="number" />
                  </div>
                </div>

                {/* Edit Availability */}
                <div className="border-t pt-4">
                    <Label className="mb-3 block">Available Days</Label>
                    <div className="flex flex-wrap gap-2">
                        {DAYS_OF_WEEK.map((day) => (
                            <label key={day} className="flex items-center gap-2 border px-3 py-2 rounded-lg cursor-pointer hover:bg-slate-50">
                                <input type="checkbox" value={day} {...register("availability.days")} />
                                {day}
                            </label>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <Label>Start Time</Label>
                        <Input type="time" {...register("availability.startTime")} />
                    </div>
                    <div>
                        <Label>End Time</Label>
                        <Input type="time" {...register("availability.endTime")} />
                    </div>
                </div>

                <div className="grid gap-2">
                  <Label>Professional Bio</Label>
                  <Textarea {...register("description")} className="min-h-[120px]" />
                </div>
              </div>

              <div className="flex gap-3 justify-end">
                <Button type="button" variant="ghost" onClick={() => setIsEditing(false)}><X className="w-4 h-4 mr-2" /> Cancel</Button>
                <Button type="submit" className="bg-cyan-600 hover:bg-cyan-700" disabled={mutation.isPending}>
                  {mutation.isPending ? <Loader2 className="animate-spin" /> : <><Check className="w-4 h-4 mr-2" /> Save Changes</>}
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DoctorDashboard;