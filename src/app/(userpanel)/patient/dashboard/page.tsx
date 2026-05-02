"use client";

import React from "react";
import { useUserAppointments } from "@/hooks/appoinment";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, Stethoscope, Loader2, AlertCircle } from "lucide-react";

export default function UserAppointmentDashboard() {
  const { data: appointments, isLoading, isError } = useUserAppointments();

  if (isLoading) return (
    <div className="flex h-96 items-center justify-center">
      <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
    </div>
  );

  if (isError) return (
    <div className="p-8 text-center text-red-500">
      <AlertCircle className="mx-auto mb-2 h-10 w-10" />
      <p>Failed to load appointments.</p>
    </div>
  );

  return (
    <div className="container mx-auto max-w-5xl py-10 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">My Appointments</h1>
        <p className="text-slate-500">View and track your scheduled medical sessions.</p>
      </div>

      {appointments?.length === 0 ? (
        <Card className="border-dashed border-2 py-20 text-center">
          <CardContent>
            <Calendar className="mx-auto h-12 w-12 text-slate-300 mb-4" />
            <h3 className="text-lg font-medium">No appointments found</h3>
            <p className="text-slate-500">You haven't booked any medical appointments yet.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {appointments?.map((appt) => (
            <Card key={appt.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row">
                {/* Date Highlight */}
                <div className="bg-blue-50 p-6 flex flex-col items-center justify-center border-r border-blue-100 min-w-[140px]">
                  <span className="text-blue-600 font-bold text-2xl">
                    {new Date(appt.date).getDate()}
                  </span>
                  <span className="text-blue-400 text-sm uppercase font-semibold">
                    {new Date(appt.date).toLocaleString('default', { month: 'short' })}
                  </span>
                  <span className="text-slate-400 text-xs mt-1">
                    {new Date(appt.date).getFullYear()}
                  </span>
                </div>

                <div className="flex-1 p-6">
                  <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        <Stethoscope className="h-5 w-5 text-cyan-500" />
                        {appt.treatment}
                      </h3>
                      <p className="text-slate-500 flex items-center gap-1 mt-1 text-sm">
                        <User className="h-4 w-4" /> {appt.doctor}
                      </p>
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100">
                      Scheduled
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t pt-4">
                    <div className="space-y-1">
                      <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Patient Details</p>
                      <p className="text-sm font-medium">{appt.name}</p>
                      <p className="text-xs text-slate-500">{appt.email}</p>
                    </div>
                    {appt.message && (
                      <div className="space-y-1">
                        <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Note</p>
                        <p className="text-sm text-slate-600 italic">"{appt.message}"</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}