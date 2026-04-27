import { Badge, CheckCircle, Phone, Play, Stethoscope } from 'lucide-react'
import { Button } from './ui/button'

const About = () => {
  return (
    <div> {/* ── ABOUT ──────────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div className="grid grid-cols-2 gap-4 relative">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="rounded-2xl overflow-hidden bg-gradient-to-br from-cyan-100 to-blue-100 h-44 flex items-center justify-center">
                <Stethoscope className="w-12 h-12 text-cyan-400 opacity-60" />
              </div>
            ))}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-14 h-14 bg-cyan-500 rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:bg-cyan-600 transition">
                <Play className="w-6 h-6 fill-white text-white" />
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <Badge className="bg-cyan-50 text-cyan-600 border-cyan-200 text-xs">About Us</Badge>
            <h2 className="text-3xl font-bold text-blue-900 leading-snug">
              Redefining Healthcare Standards with Expert Professionals
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              Our team of board-certified physicians, nurses, and specialists work together to deliver
              compassionate, evidence-based care. We believe every patient deserves world-class
              treatment in a comfortable environment.
            </p>
            <ul className="space-y-2">
              {["Advanced Medical Technology", "24/7 Emergency Services", "Patient-Centered Approach"].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-cyan-500 shrink-0" /> {item}
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-4 pt-2">
              <Button className="bg-cyan-500 hover:bg-cyan-600 text-white rounded-full px-6">Learn More</Button>
              <span className="flex items-center gap-1 text-sm font-semibold text-blue-900">
                <Phone className="w-4 h-4 text-cyan-500" /> +400-799-0000
              </span>
            </div>
          </div>
        </div>
      </section></div>
  )
}

export default About