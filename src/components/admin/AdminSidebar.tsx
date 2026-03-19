import React from 'react';
import { 
    LayoutDashboard, 
    Package, 
    BookOpen, 
    Tags, 
    Settings, 
    Users, 
    LogOut,
    ChevronLeft,
    ChevronRight,
    ShieldCheck
} from 'lucide-react';
import { motion } from 'framer-motion';

interface SidebarProps {
    activeTab: string;
    setActiveTab: (tab: any) => void;
    isCollapsed: boolean;
    setIsCollapsed: (collapsed: boolean) => void;
    onLogout: () => void;
}

const AdminSidebar: React.FC<SidebarProps> = ({ 
    activeTab, 
    setActiveTab, 
    isCollapsed, 
    setIsCollapsed,
    onLogout 
}) => {
    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'products', label: 'Products', icon: Package },
        { id: 'journal', label: 'Journal', icon: BookOpen },
        { id: 'categories', label: 'Categories & Tags', icon: Tags },
        { id: 'content', label: 'Site Content', icon: Settings },
        { id: 'subscription', label: 'Digital Asset Status', icon: ShieldCheck },
        { id: 'users', label: 'Manage Users', icon: Users },
    ];

    return (
        <motion.aside 
            initial={false}
            animate={{ width: isCollapsed ? 80 : 280 }}
            className="bg-slate-900 border-r border-slate-800 flex flex-col h-screen sticky top-0 transition-all duration-300 ease-in-out z-50"
        >
            <div className="p-6 flex items-center justify-between">
                {!isCollapsed && (
                    <motion.h1 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"
                    >
                        ATLAS ADMIN
                    </motion.h1>
                )}
                <button 
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors"
                >
                    {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
                </button>
            </div>

            <nav className="flex-1 px-4 py-4 space-y-2">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group ${
                                isActive 
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40' 
                                : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                            }`}
                        >
                            <Icon size={22} className={`${isActive ? 'text-white' : 'text-slate-400 group-hover:text-blue-400'}`} />
                            {!isCollapsed && (
                                <span className="font-medium whitespace-nowrap">{item.label}</span>
                            )}
                            {isActive && !isCollapsed && (
                                <motion.div 
                                    layoutId="activeTab"
                                    className="ml-auto w-1.5 h-1.5 rounded-full bg-white"
                                />
                            )}
                        </button>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-slate-800">
                <button 
                    onClick={onLogout}
                    className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-slate-400 hover:bg-red-900/20 hover:text-red-400 transition-all group"
                >
                    <LogOut size={22} />
                    {!isCollapsed && <span className="font-medium">Sign Out</span>}
                </button>
            </div>
        </motion.aside>
    );
};

export default AdminSidebar;
