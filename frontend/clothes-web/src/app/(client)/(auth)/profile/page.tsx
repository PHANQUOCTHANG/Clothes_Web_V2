"use client";

import React, { useState, ChangeEvent } from "react";
import { 
  User, Package, MapPin, Heart, Settings, 
  LogOut, Edit3, CheckCircle, ChevronRight 
} from "lucide-react";
import { ProfilePageProps } from "@/features/profile/types";

const ProfilePage: React.FC<ProfilePageProps> = ({ setCurrentView, toggleLoginState, userName }) => {
  const [activeTab, setActiveTab] = useState<string>("info");
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: userName || "John Doe",
    email: "john.doe@example.com",
    phone: "+84 901 234 567",
    avatar: `https://placehold.co/150x150/E5E7EB/666666/png?text=${userName || "User"}`,
    joinDate: "Tháng 6, 2023"
  });

  // --- Handlers ---
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleLogout = () => {
    if (confirm("Bạn có chắc chắn muốn đăng xuất?")) {
      toggleLoginState(false);
      setCurrentView("home");
    }
  };

  // --- Sub-Components ---
  const TabButton = ({ id, label, icon: Icon }: { id: string; label: string; icon: any }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center gap-3 px-6 py-4 text-xs font-black uppercase tracking-widest transition-all border-b-2
        ${activeTab === id 
          ? "border-red-600 text-red-600 bg-red-50/30" 
          : "border-transparent text-gray-400 hover:text-gray-900"}`}
    >
      <Icon size={16} />
      <span className="hidden md:inline">{label}</span>
    </button>
  );

  return (
    <section className="px-4 sm:px-6 max-w-7xl mx-auto pt-6 pb-20">
      {/* Breadcrumbs */}
      <nav className="mb-8 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
        <button onClick={() => setCurrentView("home")} className="hover:text-red-600 transition">Trang Chủ</button>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Tài khoản của tôi</span>
      </nav>

      {/* Header Profile Card */}
      <div className="bg-gray-900 text-white p-8 rounded-2xl mb-10 shadow-2xl flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        
        <div className="relative group w-32 h-32">
          <img src={profile.avatar} alt="Avatar" className="w-full h-full rounded-full object-cover border-4 border-gray-800 shadow-xl" />
          <button className="absolute bottom-0 right-0 p-2 bg-red-600 rounded-full hover:scale-110 transition shadow-lg">
            <Edit3 size={14} />
          </button>
        </div>

        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl font-black uppercase tracking-tighter mb-1">{profile.name}</h1>
          <p className="text-gray-400 font-medium">{profile.email}</p>
          <div className="flex items-center justify-center md:justify-start gap-4 mt-4">
            <span className="text-[10px] bg-red-600 px-3 py-1 rounded-full font-black uppercase tracking-widest">VIP Member</span>
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest italic">Tham gia: {profile.joinDate}</span>
          </div>
        </div>

        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 px-6 py-3 border border-gray-700 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-red-600 hover:border-red-600 transition-all"
        >
          <LogOut size={16} /> Đăng xuất
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-gray-100 mb-8 overflow-x-auto scrollbar-hide">
        <TabButton id="info" label="Thông tin" icon={User} />
        <TabButton id="orders" label="Đơn hàng" icon={Package} />
        <TabButton id="addresses" label="Địa chỉ" icon={MapPin} />
        <TabButton id="favorites" label="Yêu thích" icon={Heart} />
        <TabButton id="settings" label="Cài đặt" icon={Settings} />
      </div>

      {/* Tab Content Rendering */}
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        {activeTab === "info" && (
          <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-2xl font-black uppercase tracking-tight">Thông tin cá nhân</h2>
              {!isEditing && (
                <button onClick={() => setIsEditing(true)} className="flex items-center gap-2 text-blue-600 text-xs font-black uppercase tracking-widest hover:underline">
                  <Edit3 size={14} /> Chỉnh sửa
                </button>
              )}
            </div>

            {isEditing ? (
              <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputGroup label="Họ và tên" name="name" value={profile.name} onChange={handleInputChange} />
                <InputGroup label="Email" name="email" value={profile.email} onChange={handleInputChange} type="email" />
                <InputGroup label="Số điện thoại" name="phone" value={profile.phone} onChange={handleInputChange} />
                <div className="md:col-span-2 flex gap-4 mt-6">
                  <button type="button" onClick={() => setIsEditing(false)} className="px-10 py-4 bg-black text-white text-[11px] font-black uppercase tracking-widest hover:bg-red-600 transition shadow-xl shadow-red-100">Lưu thay đổi</button>
                  <button type="button" onClick={() => setIsEditing(false)} className="px-10 py-4 border border-gray-200 text-[11px] font-black uppercase tracking-widest hover:bg-gray-50 transition">Hủy</button>
                </div>
              </form>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <InfoDisplay label="Họ tên" value={profile.name} />
                <InfoDisplay label="Email" value={profile.email} />
                <InfoDisplay label="Số điện thoại" value={profile.phone} />
                <div className="p-6 bg-green-50 border border-green-100 rounded-2xl flex items-center gap-4">
                  <CheckCircle className="text-green-600" size={24} />
                  <div>
                    <p className="text-[10px] font-black uppercase text-green-800 tracking-widest">Trạng thái</p>
                    <p className="text-sm font-bold text-green-700">Tài khoản đã xác minh</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "orders" && <OrderHistoryView />}
        {/* Các Tab khác có thể tách tương tự... */}
      </div>
    </section>
  );
};

// --- Sub-components để code sạch hơn ---

const InputGroup = ({ label, ...props }: any) => (
  <div className="flex flex-col gap-2">
    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">{label}</label>
    <input className="w-full px-5 py-4 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-red-600 outline-none transition-all text-sm font-bold" {...props} />
  </div>
);

const InfoDisplay = ({ label, value }: { label: string; value: string }) => (
  <div className="p-6 bg-gray-50/50 border border-gray-100 rounded-2xl transition-hover hover:border-red-100">
    <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-2">{label}</p>
    <p className="text-sm font-black text-gray-900 uppercase tracking-tight">{value}</p>
  </div>
);

const OrderHistoryView = () => {
  const orders = [
    { id: "ORD-001", date: "15/12/2025", total: "$225.00", status: "Đã giao" },
    { id: "ORD-002", date: "10/12/2025", total: "$158.50", status: "Đang xử lý" },
  ];

  return (
    <div className="space-y-4">
      {orders.map(order => (
        <div key={order.id} className="p-6 bg-white border border-gray-100 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-6 hover:shadow-lg transition group">
          <div className="flex items-center gap-6">
            <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 group-hover:bg-red-600 group-hover:text-white transition-colors">
              <Package size={24} />
            </div>
            <div>
              <h4 className="font-black text-gray-900 tracking-tighter">{order.id}</h4>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">{order.date}</p>
            </div>
          </div>
          <div className="flex items-center gap-10">
            <div className="text-center">
              <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1">Tổng cộng</p>
              <p className="text-lg font-black text-red-600">{order.total}</p>
            </div>
            <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm
              ${order.status === 'Đã giao' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
              {order.status}
            </span>
            <button className="p-2 hover:bg-gray-100 rounded-full transition"><ChevronRight size={20} /></button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProfilePage;