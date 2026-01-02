import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { User, Mail, Shield, Camera, Save, X, Edit2 } from "lucide-react";

const Profile = () => {
  const { user } = useAuth();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: "", email: "" });

  // Sync form with user data when it loads
  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        email: user.email || ""
      });
    }
  }, [user]);

  const handleSave = () => {
    // Simulating a save operation
    const stored = JSON.parse(localStorage.getItem("auth"));
    if (stored) {
      localStorage.setItem(
        "auth",
        JSON.stringify({
          ...stored,
          user: { ...stored.user, ...form }
        })
      );
    }
    setEditing(false);
  };

  const handleCancel = () => {
    // Reset form to original user data
    if (user) {
      setForm({
        name: user.name || "",
        email: user.email || ""
      });
    }
    setEditing(false);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Profile Settings</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">Manage your account information and preferences.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* LEFT COLUMN: Identity Card */}
        <div className="md:col-span-1">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col items-center text-center h-full">
            
            <div className="relative group">
              <div className="w-24 h-24 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-400 dark:text-slate-500 mb-4 overflow-hidden border-4 border-white dark:border-slate-800 shadow-lg">
                <User size={48} />
              </div>
              <button className="absolute bottom-4 right-0 p-2 bg-primary text-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity bg-blue-600 hover:bg-blue-700">
                <Camera size={14} />
              </button>
            </div>

            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
              {form.name || "User Name"}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
              {form.email || "user@example.com"}
            </p>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-wider">
              <Shield size={12} />
              {user?.role || "MEMBER"}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Edit Details Form */}
        <div className="md:col-span-2">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
            
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-700/50">
              <h3 className="font-semibold text-slate-900 dark:text-white">Personal Information</h3>
              {!editing && (
                <button 
                  onClick={() => setEditing(true)}
                  className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 font-medium flex items-center gap-1.5"
                >
                  <Edit2 size={14} />
                  Edit
                </button>
              )}
            </div>

            <div className="p-6 space-y-6">
              {/* Name Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <User size={16} className="text-slate-400" />
                  Full Name
                </label>
                {editing ? (
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                    placeholder="Enter your name"
                  />
                ) : (
                  <div className="w-full px-4 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-transparent text-slate-700 dark:text-slate-300">
                    {form.name}
                  </div>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <Mail size={16} className="text-slate-400" />
                  Email Address
                </label>
                {editing ? (
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                    placeholder="name@company.com"
                  />
                ) : (
                  <div className="w-full px-4 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-transparent text-slate-700 dark:text-slate-300">
                    {form.email}
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons (Only visible in edit mode) */}
            {editing && (
              <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-700 flex justify-end gap-3">
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-200 transition-colors flex items-center gap-2"
                >
                  <X size={16} />
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors shadow-sm flex items-center gap-2"
                >
                  <Save size={16} />
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Profile;