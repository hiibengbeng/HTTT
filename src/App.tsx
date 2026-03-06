/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ChevronLeft, MapPin, Users, MessageSquare, CheckCircle2, QrCode } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Types
interface Participant {
  id: string;
  name: string;
  avatar: string;
  checkedIn?: boolean;
}

interface Activity {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  location: string;
  address: string;
  organizer: {
    name: string;
    avatar: string;
  };
  participants: Participant[];
  status: 'upcoming' | 'ongoing' | 'ended';
}

// Mock Data
const INITIAL_ACTIVITY: Activity = {
  id: '1',
  title: '测测',
  startTime: '2026/03/05 17:00',
  endTime: '2026/03/05 18:00',
  location: '曙光大厦',
  address: '广东省深圳市南山区粤海街道科技南十二路12号',
  organizer: {
    name: '蹦蹦',
    avatar: 'https://picsum.photos/seed/organizer/100/100',
  },
  participants: [
    { id: 'p1', name: '小明', avatar: 'https://picsum.photos/seed/p1/100/100', checkedIn: true },
    { id: 'p2', name: '小红', avatar: 'https://picsum.photos/seed/p2/100/100', checkedIn: false },
  ],
  status: 'ongoing',
};

export default function App() {
  const [view, setView] = useState<'detail' | 'participants'>('detail');
  const [activity] = useState<Activity>(INITIAL_ACTIVITY);
  const [showModal, setShowModal] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);

  // Mock users who cannot be added
  const failedParticipants = [
    { id: 'f1', name: '张三', avatar: 'https://picsum.photos/seed/f1/100/100' },
    { id: 'f2', name: '李四', avatar: 'https://picsum.photos/seed/f2/100/100' },
  ];

  const handleCreateGroup = () => {
    setShowModal(true);
  };

  const handleModalConfirm = () => {
    setShowModal(false);
    setTimeout(() => {
      alert('群聊已成功组建（已排除无法加入的用户）');
    }, 300);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 max-w-md mx-auto shadow-2xl relative overflow-hidden">
      <AnimatePresence mode="wait">
        {view === 'detail' ? (
          <motion.div
            key="detail"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="pb-24"
          >
            {/* Header */}
            <div className="flex items-center p-4 sticky top-0 bg-white z-10">
              <button className="p-2 -ml-2">
                <ChevronLeft className="w-6 h-6" />
              </button>
              <h1 className="flex-1 text-center text-lg font-medium mr-8">活动详情</h1>
            </div>

            {/* Banner */}
            <div className="px-4">
              <img
                src="https://picsum.photos/seed/building/800/600"
                alt="Activity"
                className="w-full h-64 object-cover rounded-2xl shadow-sm"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Info Section */}
            <div className="p-6 space-y-6">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">{activity.title}</h2>
                <p className="text-slate-400 mt-2 text-lg">
                  {activity.startTime}-{activity.endTime.split(' ')[1]}
                </p>
              </div>

              {/* Status Badge */}
              {activity.status === 'ended' && (
                <div className="inline-flex items-center px-3 py-1 bg-slate-100 text-slate-500 rounded-full text-sm font-medium">
                  <CheckCircle2 className="w-4 h-4 mr-1" />
                  活动已结束
                </div>
              )}

              {/* Location */}
              <div className="space-y-3">
                <h3 className="text-slate-400 font-medium">活动地点</h3>
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    <MapPin className="w-5 h-5 text-indigo-500" />
                  </div>
                  <div>
                    <p className="font-bold text-xl">{activity.location}</p>
                    <p className="text-slate-400 text-sm mt-1 leading-relaxed">
                      {activity.address}
                    </p>
                  </div>
                </div>
                {/* Mock Map */}
                <div className="mt-4 rounded-2xl overflow-hidden border border-slate-100">
                  <img
                    src="https://picsum.photos/seed/map/600/300"
                    alt="Map"
                    className="w-full h-32 object-cover opacity-80"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              {/* Organizer */}
              <div className="space-y-4 pt-4">
                <h3 className="text-slate-400 font-medium">组织者</h3>
                <div className="flex items-center gap-3">
                  <img
                    src={activity.organizer.avatar}
                    alt={activity.organizer.name}
                    className="w-12 h-12 rounded-full border-2 border-white shadow-sm"
                    referrerPolicy="no-referrer"
                  />
                  <span className="font-medium text-lg">{activity.organizer.name}</span>
                </div>
              </div>
            </div>

            {/* Bottom Button */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-md max-w-md mx-auto">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setView('participants')}
                className="w-full bg-[#8B5CF6] text-white py-4 rounded-full font-bold text-lg shadow-lg shadow-indigo-200"
              >
                参与者
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="participants"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="min-h-screen flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center p-4 border-b border-slate-50 sticky top-0 bg-white z-10">
              <button onClick={() => setView('detail')} className="p-2 -ml-2">
                <ChevronLeft className="w-6 h-6" />
              </button>
              <h1 className="flex-1 text-center text-lg font-medium">参与者</h1>
              <button 
                onClick={() => setShowQRCode(true)}
                className="flex flex-col items-center p-1 text-[#8B5CF6]"
              >
                <QrCode className="w-5 h-5" />
                <span className="text-[10px] font-bold mt-0.5">签到码</span>
              </button>
            </div>

            {/* Participants List */}
            <div className="flex-1 p-6">
              {activity.participants.length > 0 ? (
                <div className="space-y-6">
                  {activity.participants.map((p) => (
                    <div key={p.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <img
                          src={p.avatar}
                          alt={p.name}
                          className="w-14 h-14 rounded-full object-cover shadow-sm"
                          referrerPolicy="no-referrer"
                        />
                        <span className="text-lg font-medium">{p.name}</span>
                      </div>
                      {p.checkedIn && (
                        <span className="bg-emerald-50 text-emerald-600 text-xs font-bold px-2.5 py-1 rounded-full border border-emerald-100">
                          已签到
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-slate-300 space-y-4 pt-20">
                  <Users className="w-16 h-16 opacity-20" />
                  <p>暂无参与者</p>
                </div>
              )}
            </div>

            {/* One-click Group Chat Button */}
            <div className="p-4 bg-white border-t border-slate-50">
              <motion.button
                whileTap={activity.participants.length > 0 ? { scale: 0.95 } : {}}
                disabled={activity.participants.length === 0}
                onClick={handleCreateGroup}
                className={`w-full flex items-center justify-center gap-2 py-4 rounded-full font-bold text-lg transition-all ${
                  activity.participants.length > 0
                    ? 'bg-[#8B5CF6] text-white shadow-lg shadow-indigo-100'
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                }`}
              >
                <MessageSquare className="w-5 h-5" />
                一键组群
              </motion.button>
              <p className="text-center text-xs text-slate-400 mt-3">
                {activity.participants.length > 0 
                  ? `已有 ${activity.participants.length} 位参与者，可立即组群` 
                  : '暂无参与者，无法组群'}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal for Group Chat Notice */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl"
            >
              <div className="p-8 text-center space-y-6">
                <h3 className="text-xl font-bold text-slate-900">提示</h3>
                <p className="text-slate-500 leading-relaxed">
                  这些用户无法被一键组群
                </p>
                
                <div className="grid grid-cols-2 gap-4 pt-2">
                  {failedParticipants.map((user) => (
                    <div key={user.id} className="flex flex-col items-center space-y-2 bg-slate-50 p-3 rounded-2xl">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-12 h-12 rounded-full border-2 border-white shadow-sm"
                        referrerPolicy="no-referrer"
                      />
                      <span className="text-sm font-medium text-slate-700 truncate w-full text-center">
                        {user.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              
              <button
                onClick={handleModalConfirm}
                className="w-full py-5 border-t border-slate-100 text-[#8B5CF6] font-bold text-lg active:bg-slate-50 transition-colors"
              >
                我知道了
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal for QR Code */}
      <AnimatePresence>
        {showQRCode && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowQRCode(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white w-full max-w-xs rounded-[2.5rem] overflow-hidden shadow-2xl p-8"
            >
              <div className="text-center space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">活动签到码</h3>
                  <p className="text-slate-400 text-sm mt-1">请向工作人员出示此码</p>
                </div>
                
                <div className="bg-slate-50 p-6 rounded-3xl flex items-center justify-center aspect-square border-2 border-slate-100">
                  <div className="relative">
                    <img
                      src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=activity-checkin-123"
                      alt="Check-in QR Code"
                      className="w-48 h-48"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                       <div className="bg-white p-2 rounded-xl shadow-lg border border-slate-100">
                         <QrCode className="w-6 h-6 text-[#8B5CF6]" />
                       </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-xs text-slate-400">有效期至 2026/03/05 18:00</p>
                  <button
                    onClick={() => setShowQRCode(false)}
                    className="w-full py-4 bg-[#8B5CF6] text-white rounded-2xl font-bold text-lg shadow-lg shadow-indigo-100 active:scale-[0.98] transition-transform"
                  >
                    关闭
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
