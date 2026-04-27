
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Calendar, MapPin, Clock, Phone, Play, Stethoscope, CheckCircle, Star } from "lucide-react";
const Hero = () => {
    return (
        <div>
            {/* ── HERO ───────────────────────────────────────────────────────── */}
            <section className="relative min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 overflow-hidden flex items-center pt-16">
                <div className="absolute top-10 right-10 w-72 h-72 bg-cyan-400/20 rounded-full blur-3xl" />
                <div className="absolute bottom-10 left-10 w-56 h-56 bg-blue-400/20 rounded-full blur-2xl" />

                <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center w-full py-20">
                    <div className="text-white space-y-6">
                        <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-400/30 text-xs px-3 py-1">
                            🏥 Trusted Healthcare
                        </Badge>
                        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                            Maximum Care For{" "}
                            <span className="text-cyan-400">Patient Health Issues</span> and Wellbeing
                        </h1>
                        <p className="text-blue-200 text-base leading-relaxed max-w-md">
                            We provide comprehensive medical care with a team of experienced professionals
                            dedicated to your health and wellness journey.
                        </p>
                        <div className="flex items-center gap-4">
                            <Button className="bg-cyan-500 hover:bg-cyan-600 text-white rounded-full px-6 py-3 font-semibold">
                                Book Appointment
                            </Button>
                            <button className="flex items-center gap-2 text-white text-sm hover:text-cyan-300 transition-colors">
                                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition">
                                    <Play className="w-4 h-4 fill-white" />
                                </div>
                                Watch Video
                            </button>
                        </div>
                    </div>

                    <div className="relative flex justify-center">
                        <div className="w-80 h-96 bg-gradient-to-b from-cyan-400/30 to-blue-600/30 rounded-3xl flex items-center justify-center border border-white/10 backdrop-blur-sm">
                            <div className="text-center text-white/50">
                                <Stethoscope className="w-20 h-20 mx-auto mb-3 text-cyan-400" />
                                <p className="text-sm">Doctor Image</p>
                            </div>
                        </div>
                        <div className="absolute top-8 -left-4 bg-white rounded-xl shadow-lg p-3 text-xs font-semibold text-blue-900 flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500" /> 100% Certified
                        </div>
                        <div className="absolute bottom-8 -right-4 bg-white rounded-xl shadow-lg p-3 text-xs font-semibold text-blue-900 flex items-center gap-2">
                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" /> 4.9 Patient Rating
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white/10 backdrop-blur-md rounded-t-2xl p-5 border-t border-white/20">
                            {[
                                { icon: <Calendar className="w-5 h-5 text-cyan-400" />, label: "Our Appointment", sub: "Schedule Now" },
                                { icon: <MapPin className="w-5 h-5 text-cyan-400" />, label: "Find A Doctor", sub: "Search Specialist" },
                                { icon: <Clock className="w-5 h-5 text-cyan-400" />, label: "Set The Date", sub: "Pick a Slot" },
                                { icon: <Phone className="w-5 h-5 text-cyan-400" />, label: "Opening Hours", sub: "Mon–Sat 8am–8pm" },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3 text-white">
                                    <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center shrink-0">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold">{item.label}</p>
                                        <p className="text-xs text-blue-200">{item.sub}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Hero