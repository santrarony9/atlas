import { Phone, Mail } from "lucide-react";
import Clock from "./Clock";
import LanguageSwitcher from "./LanguageSwitcher";

export default function TopBar() {
    return (
        <div className="bg-brand-blue border-b border-white/10 text-white py-1">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center text-sm gap-2 md:gap-0">
                    {/* Left Side: Contact Info */}
                    <div className="flex items-center gap-6">
                        <a href="tel:+919830735480" className="flex items-center gap-2 hover:text-brand-orange transition-colors group">
                            <Phone className="w-4 h-4 text-brand-orange group-hover:scale-110 transition-transform" />
                            <span>+91 98307 35480</span>
                        </a>
                        <a href="mailto:enquiry@atlasfoundries.com" className="hidden sm:flex items-center gap-2 hover:text-brand-orange transition-colors group">
                            <Mail className="w-4 h-4 text-brand-orange group-hover:scale-110 transition-transform" />
                            <span>enquiry@atlasfoundries.com</span>
                        </a>
                    </div>

                    {/* Right Side: Clock & Language */}
                    <div className="flex items-center gap-6">
                        <Clock />
                        <div className="h-4 w-px bg-white/20 hidden md:block"></div>
                        <LanguageSwitcher />
                    </div>
                </div>
            </div>
        </div>
    );
}
