import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
    title: string;
    value: number | string;
    icon: LucideIcon;
    color: string;
    subtitle?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, color, subtitle }) => {
    return (
        <motion.div 
            whileHover={{ y: -5 }}
            className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 p-6 rounded-2xl shadow-xl relative overflow-hidden group"
        >
            <div className={`absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 rounded-full blur-3xl opacity-10 transition-opacity group-hover:opacity-20 ${color}`}></div>
            
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-slate-400 text-sm font-medium mb-1">{title}</p>
                    <h3 className="text-3xl font-bold text-white tracking-tight">{value}</h3>
                    {subtitle && <p className="text-xs text-slate-500 mt-2">{subtitle}</p>}
                </div>
                <div className={`p-3 rounded-xl ${color.replace('bg-', 'bg-opacity-20 bg-')} text-white`}>
                    <Icon size={24} />
                </div>
            </div>
        </motion.div>
    );
};

export default StatCard;
