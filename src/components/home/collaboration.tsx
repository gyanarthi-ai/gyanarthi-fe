/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Image from "next/image";
import { collabApps } from "@/constants";
import { Check } from "lucide-react";
import logo from "../../assets/logo.png"
const Collaboration = () => {
  const features = [
    "Confident Answers",
    "Secure Data",
    "Validated Responses"
  ]
  return (
    <div className="min-h-screen bg-[#0B0A0F] text-white">
      <div className="max-w-7xl mx-auto px-4 py-20 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Column - Content */}
        <div className="space-y-8">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            AI Validation<br />
            for<br />
            everyone
          </h1>

          <p className="text-gray-400 text-lg">
            Work smarter and faster with Gyanarthi. Get the most accurate and reliable information with our AI validation.
          </p>

          <div className="space-y-4">
            {features.map((feature) => (
              <div key={feature} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <Check className="w-4 h-4 text-purple-500" />
                </div>
                <span className="text-gray-300">{feature}</span>
              </div>
            ))}
          </div>

          <button className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-200"></div>
            <div className="relative px-6 py-3 bg-[#0B0A0F] rounded-lg leading-none">
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent font-medium tracking-wide">
                TRY IT NOW
              </span>
            </div>
          </button>
        </div>

        {/* Right Column - App Icons */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-48 h-48 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full blur-3xl"></div>
          </div>

          <div className="relative aspect-square">
            {/* Center Brain Icon */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
              <div className="w-10 h-10 text-white absolute">
                <Image src={logo} alt="logo" fill />
              </div>
            </div>

            {/* Orbit Path */}
            <div className="absolute inset-0 rounded-full border border-gray-800"></div>

            {/* App Icons */}
            <div className="absolute inset-0">
              {collabApps.map((_, i) => (
                <div
                  key={i}
                  className="absolute h-16 w-16 rounded-xl bg-white p-2 border border-gray-800 flex items-center justify-center"
                  style={{
                    left: `${50 + 40 * Math.cos((i * Math.PI * 2) / 4)}%`,
                    top: `${50 + 40 * Math.sin((i * Math.PI * 2) / 4)}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  <Image src={_.icon} alt="" height={700} width={700} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collaboration;
