import React, { useState } from 'react';
import { 
  Mail, 
  Eye, 
  Edit3, 
  CheckCircle2, 
  X, 
  Code
} from 'lucide-react';
import { useShopStore } from '../../context/ShopStoreContext';
import { EmailTemplate } from '../../types/admin';
import { generateHtmlEmailPreview, renderTemplateText } from '../../utils/emailTemplates';

export const EmailsView: React.FC = () => {
  const { emailTemplates, updateEmailTemplate, sentNotifications, orders } = useShopStore();

  const [activeSubTab, setActiveSubTab] = useState<'templates' | 'logs'>('templates');
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);
  const [previewTemplate, setPreviewTemplate] = useState<EmailTemplate | null>(null);

  // Edit Template Form
  const [editSubject, setEditSubject] = useState('');
  const [editBody, setEditBody] = useState('');
  const [editEnabled, setEditEnabled] = useState(true);

  const handleOpenEdit = (tpl: EmailTemplate) => {
    setSelectedTemplate(tpl);
    setEditSubject(tpl.subject);
    setEditBody(tpl.body);
    setEditEnabled(tpl.isEnabled);
  };

  const handleSaveTemplate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTemplate) return;

    updateEmailTemplate(selectedTemplate.id, {
      subject: editSubject.trim(),
      body: editBody.trim(),
      isEnabled: editEnabled
    });

    setSelectedTemplate(null);
  };

  const handleToggleTemplate = (tpl: EmailTemplate) => {
    updateEmailTemplate(tpl.id, { isEnabled: !tpl.isEnabled });
  };

  const sampleOrder = orders[0] || {
    id: 'ord_sample',
    orderNumber: 'SI-7829',
    customerName: 'John Doe',
    customerEmail: 'customer@example.com',
    customerPhone: '+256 700 123456',
    deliveryAddress: 'Plot 14 Kampala Road',
    district: 'Kampala Central',
    totalUGX: 185000,
    paymentMethod: 'MTN Mobile Money',
    orderStatus: 'processing',
    paymentStatus: 'paid'
  } as any;

  return (
    <div className="space-y-4">
      
      {/* Top Header & Sub-Tab Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
            <Mail size={20} />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900">Email Notification Engine</h2>
            <p className="text-xs text-slate-500">Automated customer order alerts & templated dispatch</p>
          </div>
        </div>

        <div className="inline-flex p-1 bg-slate-100 rounded-xl">
          <button
            onClick={() => setActiveSubTab('templates')}
            className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
              activeSubTab === 'templates' ? 'bg-[#2D3094] text-white shadow-xs' : 'text-slate-600'
            }`}
          >
            Email Templates ({emailTemplates.length})
          </button>
          <button
            onClick={() => setActiveSubTab('logs')}
            className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
              activeSubTab === 'logs' ? 'bg-[#2D3094] text-white shadow-xs' : 'text-slate-600'
            }`}
          >
            Sent Logs ({sentNotifications.length})
          </button>
        </div>
      </div>

      {activeSubTab === 'templates' ? (
        /* Templates List */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {emailTemplates.map((tpl) => (
            <div 
              key={tpl.id} 
              className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-slate-900">{tpl.name}</span>
                  <button
                    onClick={() => handleToggleTemplate(tpl)}
                    className="text-slate-400 hover:text-[#2D3094] transition-colors"
                  >
                    {tpl.isEnabled ? (
                      <span className="text-emerald-600 text-xs font-bold flex items-center gap-1">
                        <CheckCircle2 size={13} /> Active
                      </span>
                    ) : (
                      <span className="text-slate-400 text-xs font-bold">Disabled</span>
                    )}
                  </button>
                </div>

                <p className="text-[11px] text-slate-400 mt-1">{tpl.description}</p>
                <div className="mt-2.5 p-2 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-700 font-semibold truncate">
                  Subject: <span className="text-slate-900">{tpl.subject}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setPreviewTemplate(tpl)}
                    className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1"
                  >
                    <Eye size={12} />
                    <span>Preview</span>
                  </button>
                  <button
                    onClick={() => handleOpenEdit(tpl)}
                    className="px-3 py-1 rounded-lg bg-[#2D3094] hover:bg-[#232573] text-white text-xs font-bold flex items-center gap-1"
                  >
                    <Edit3 size={12} />
                    <span>Edit Template</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Sent Notifications Log Table */
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 text-[11px] uppercase tracking-wider font-semibold border-b border-slate-200">
                <tr>
                  <th className="px-5 py-3">Timestamp</th>
                  <th className="px-4 py-3">Order #</th>
                  <th className="px-4 py-3">Recipient</th>
                  <th className="px-4 py-3">Email Subject</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {sentNotifications.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-slate-400">
                      No sent email logs recorded yet.
                    </td>
                  </tr>
                ) : (
                  sentNotifications.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-50">
                      <td className="px-5 py-3 whitespace-nowrap text-slate-500 text-[11px]">
                        {new Date(log.sentAt).toLocaleString()}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap font-extrabold text-[#2D3094]">
                        #{log.orderNumber}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <p className="font-bold text-slate-900">{log.recipientName}</p>
                        <p className="text-[10px] text-slate-400">{log.recipientEmail}</p>
                      </td>
                      <td className="px-4 py-3 font-medium text-slate-800">
                        {log.subject}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                          Delivered
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Edit Template Modal */}
      {selectedTemplate && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in-50">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
            
            <div className="px-6 py-4 bg-[#12142B] text-white flex items-center justify-between">
              <div>
                <h2 className="text-base font-black">Edit Email Template</h2>
                <p className="text-xs text-slate-300">{selectedTemplate.name}</p>
              </div>
              <button onClick={() => setSelectedTemplate(null)} className="p-1.5 text-slate-400 hover:text-white">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveTemplate} className="p-6 space-y-4 text-xs overflow-y-auto custom-scrollbar">
              
              {/* Template Available Tags Guide */}
              <div className="p-3 bg-blue-50 rounded-xl border border-blue-200 text-[11px] text-blue-900 space-y-1">
                <p className="font-bold flex items-center gap-1.5">
                  <Code size={13} /> Available Placeholder Variables:
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {[
                    '{{customer_name}}',
                    '{{order_number}}',
                    '{{order_total}}',
                    '{{order_status}}',
                    '{{delivery_address}}',
                    '{{payment_method}}',
                    '{{tracking_notes}}'
                  ].map((tag) => (
                    <code key={tag} className="px-1.5 py-0.5 rounded bg-white font-mono text-[10px] border border-blue-200 text-[#2D3094] font-bold">
                      {tag}
                    </code>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Email Subject Line *</label>
                <input
                  type="text"
                  required
                  value={editSubject}
                  onChange={(e) => setEditSubject(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:border-[#2D3094] outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Email Message Body *</label>
                <textarea
                  rows={8}
                  required
                  value={editBody}
                  onChange={(e) => setEditBody(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono focus:border-[#2D3094] outline-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="enableTemplate"
                  checked={editEnabled}
                  onChange={(e) => setEditEnabled(e.target.checked)}
                  className="rounded text-[#2D3094] focus:ring-[#2D3094]"
                />
                <label htmlFor="enableTemplate" className="font-bold text-slate-700 text-xs cursor-pointer">
                  Enable automated dispatch for this status event
                </label>
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedTemplate(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#2D3094] hover:bg-[#232573] text-white font-bold rounded-xl"
                >
                  Save Template
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* Live Email Preview Modal */}
      {previewTemplate && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in-50">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
            
            <div className="px-6 py-4 bg-[#12142B] text-white flex items-center justify-between">
              <div>
                <h2 className="text-base font-black">Customer Email Preview</h2>
                <p className="text-xs text-slate-300">Subject: {renderTemplateText(previewTemplate.subject, sampleOrder)}</p>
              </div>
              <button onClick={() => setPreviewTemplate(null)} className="p-1.5 text-slate-400 hover:text-white">
                <X size={18} />
              </button>
            </div>

            <div className="p-6 bg-slate-100 overflow-y-auto custom-scrollbar">
              <div 
                className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 max-w-xl mx-auto"
                dangerouslySetInnerHTML={{ __html: generateHtmlEmailPreview(previewTemplate, sampleOrder) }}
              />
            </div>

            <div className="px-6 py-3 bg-white border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setPreviewTemplate(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs"
              >
                Close Preview
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
