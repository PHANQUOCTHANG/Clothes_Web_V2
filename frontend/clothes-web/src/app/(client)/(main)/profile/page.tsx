/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";

const ProfilePage: React.FC<{ userName: string; toggleLoginState: any; setCurrentView: any }> = ({ userName, toggleLoginState, setCurrentView }) => {
  const [activeTab, setActiveTab] = useState("info");

  return (
    <section className="px-4 sm:px-6 max-w-7xl mx-auto pt-6 pb-12">
      <div className="bg-gray-900 text-white p-8 rounded-lg mb-8 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <div className="w-20 h-20 rounded-full bg-gray-600 flex items-center justify-center text-2xl font-bold">{userName[0]}</div>
          <div><h1 className="text-3xl font-bold">{userName}</h1><p className="text-gray-400">john.doe@example.com</p></div>
        </div>
        <button onClick={() => { toggleLoginState(false); setCurrentView("home"); }} className="bg-red-600 px-6 py-2 rounded">Đăng xuất</button>
      </div>

      <div className="flex border-b mb-6 overflow-x-auto">
        {["info", "orders", "addresses"].map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`px-6 py-3 uppercase text-sm font-bold ${activeTab === tab ? "border-b-2 border-red-600 text-red-600" : "text-gray-500"}`}>
            {tab === "info" ? "Thông tin" : tab === "orders" ? "Đơn hàng" : "Địa chỉ"}
          </button>
        ))}
      </div>

      <div className="bg-white p-6 border rounded-lg shadow-sm">
        {activeTab === "info" && <div><h2 className="text-xl font-bold mb-4">Thông tin cá nhân</h2><p>Họ tên: {userName}</p><p>Email: john.doe@example.com</p></div>}
        {activeTab === "orders" && <p className="text-gray-500">Bạn chưa có đơn hàng nào.</p>}
        {activeTab === "addresses" && <p className="text-gray-500">216 Đại lộ CMT8, Q.3, TP.HCM (Mặc định)</p>}
      </div>
    </section>
  );
};

export default ProfilePage;