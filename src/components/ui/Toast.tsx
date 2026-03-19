import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, AlertCircle, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';

interface ToastProps {
    message: string;
    type: ToastType;
    onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
    const icons = {
        success: <CheckCircle className="text-emerald-400" size={20} />,
        error: <XCircle className="text-red-400" size={20} />,
        info: <AlertCircle className="text-blue-400" size={20} />,
    };

    const colors = {
        success: 'border-emerald-500/20 bg-emerald-500/10',
        error: 'border-red-500/20 bg-red-500/10',
        info: 'border-blue-500/20 bg-blue-500/10',
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl border backdrop-blur-md shadow-2xl min-w-[300px] max-w-md ${colors[type]}`}
        >
            <div className="flex-shrink-0">{icons[type]}</div>
            <p className="text-slate-200 text-sm font-medium flex-1">{message}</p>
            <button 
                onClick={onClose}
                className="text-slate-400 hover:text-white transition-colors"
            >
                <X size={18} />
            </button>
        </motion.div>
    );
};

export default Toast;
