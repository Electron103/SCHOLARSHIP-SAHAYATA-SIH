
import React, { useState, useRef } from 'react';
import { Send, Plus, Filter, Trash2, Tag, Users, Calendar, ExternalLink, FileText, Landmark } from 'lucide-react';
import type { Notification, PdfDocument, NotificationType, Priority, AccountSection } from '../../types';
import { NOTIFICATION_CATEGORIES, TARGET_AUDIENCES, PRIORITIES, NOTIFICATION_TYPES, PDF_CATEGORIES } from '../../constants';
import { formatTime } from '../../utils/ui';

// Props for the entire dashboard
interface GovernmentDashboardProps {
  notifications: Notification[];
  pdfDocuments: PdfDocument[];
  onSendNotification: (formData: Omit<Notification, 'createdAt'>) => void;
  onUploadPdf: (pdfData: Omit<PdfDocument, 'id' | 'uploadDate' | 'size' | 'downloads' | 'uploadedBy' | 'viewed'>) => void;
  onDeleteNotification: (id: string) => void;
  onDeletePdf: (id: number) => void;
}

// Notification Form Component
const NotificationForm: React.FC<{ onSendNotification: GovernmentDashboardProps['onSendNotification'] }> = ({ onSendNotification }) => {
  const [formData, setFormData] = useState({
    title: '', 
    message: '', 
    type: 'info' as NotificationType, 
    category: 'Educational',
    targetAudience: 'All Students', 
    priority: 'medium' as Priority, 
    link: '',
    accountType: 'aadhaar' as AccountSection
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value as any }));
  };

  const handleSubmit = () => {
    if (!formData.title || !formData.message) {
      alert('Please fill in title and message');
      return;
    }
    onSendNotification({
      _id: '',
      title: formData.title,
      description: formData.message,
      message: formData.message,
      type: formData.type,
      category: formData.category,
      audience: formData.targetAudience,
      priority: formData.priority,
      link: formData.link,
      accountType: formData.accountType as "aadhaar" | "dbt" | "scholarship"
    });
    setFormData({
      title: '', message: '', type: 'info', category: 'Educational',
      targetAudience: 'All Students', priority: 'medium', link: '', accountType: 'aadhaar'
    });
    alert('✅ Notification sent successfully!');
  };
  
  return (
    <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg p-6 mb-8">
      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2"><Plus />Create New Notification</h3>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Title *</label>
            <input type="text" name="title" value={formData.title} onChange={handleInputChange} placeholder="Enter notification title" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" />
          </div>
          <div>
             <label className="block text-sm font-semibold text-gray-700 mb-2"><Landmark className="w-4 h-4 inline mr-1" />Target Account Section</label>
             <select name="accountType" value={formData.accountType} onChange={handleInputChange} aria-label="Target Account Section" className="w-full px-4 py-2 border border-blue-500 bg-blue-50 rounded-lg focus:ring-2 focus:ring-blue-500 font-medium">
                <option value="aadhaar">Aadhaar-Linked Account</option>
                <option value="dbt">DBT-Enabled Account</option>
             </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Message *</label>
          <textarea name="message" value={formData.message} onChange={handleInputChange} placeholder="Enter notification message" rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">Type</label>
            <select name="type" value={formData.type} onChange={handleInputChange} aria-label="Notification Type" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                {NOTIFICATION_TYPES.map(type => <option key={type} value={type}>{type.toUpperCase()}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">Category</label>
            <select name="category" value={formData.category} onChange={handleInputChange} aria-label="Notification Category" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                {NOTIFICATION_CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">Audience</label>
            <select name="targetAudience" value={formData.targetAudience} onChange={handleInputChange} aria-label="Target Audience" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                {TARGET_AUDIENCES.map(aud => <option key={aud} value={aud}>{aud}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">Priority</label>
            <select name="priority" value={formData.priority} onChange={handleInputChange} aria-label="Priority Level" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                {PRIORITIES.map(pri => <option key={pri} value={pri}>{pri.toUpperCase()}</option>)}
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Link/Route (Optional)</label>
          <input type="text" name="link" value={formData.link} onChange={handleInputChange} placeholder="/guides/some-guide" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" />
        </div>
        <button onClick={handleSubmit} className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"><Send className="w-5 h-5" />Send Notification</button>
      </div>
    </div>
  );
};

// PDF Upload Form Component
const PdfUploadForm: React.FC<{ onUploadPdf: GovernmentDashboardProps['onUploadPdf'] }> = ({ onUploadPdf }) => {
    const [pdfFormData, setPdfFormData] = useState({ title: '', description: '', category: 'Aadhaar Guide', tags: '' });
    const [file, setFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setPdfFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile && selectedFile.type === 'application/pdf') {
            setFile(selectedFile);
        } else {
            alert('❌ Please select a PDF file only!');
            setFile(null);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    const handleSubmit = () => {
        if (!pdfFormData.title || !pdfFormData.description || !file) {
            alert('❌ Please fill all fields and select a PDF file.');
            return;
        }
        onUploadPdf({
            title: pdfFormData.title,
            description: pdfFormData.description,
            category: pdfFormData.category,
            tags: pdfFormData.tags.split(',').map(t => t.trim()).filter(Boolean),
            fileData: file,
            fileName: file.name
        });
        setPdfFormData({ title: '', description: '', category: 'Aadhaar Guide', tags: '' });
        setFile(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
        alert('✅ PDF Document uploaded successfully!');
    };

    return (
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 mb-6">
            <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2"><Plus />Upload New PDF</h4>
            <div className="space-y-4">
                <input type="text" name="title" value={pdfFormData.title} onChange={handleInputChange} placeholder="Document Title *" className="w-full px-4 py-2 border rounded-lg" />
                <textarea name="description" value={pdfFormData.description} onChange={handleInputChange} placeholder="Description *" rows={3} className="w-full px-4 py-2 border rounded-lg" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <select name="category" value={pdfFormData.category} onChange={handleInputChange} aria-label="PDF Category" className="w-full px-4 py-2 border rounded-lg">
                        {PDF_CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                    <input type="text" name="tags" value={pdfFormData.tags} onChange={handleInputChange} placeholder="Tags (comma separated)" className="w-full px-4 py-2 border rounded-lg" />
                </div>
                <div>
                  <label htmlFor="pdf-file-input" className="block border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-500 transition-colors cursor-pointer">
                    <FileText className="w-12 h-12 mx-auto text-gray-400 mb-2" />
                    {file ? <p className="text-sm text-green-600 font-semibold">✅ {file.name}</p> : <p className="text-sm text-gray-600">Click to upload PDF</p>}
                  </label>
                  <input ref={fileInputRef} id="pdf-file-input" type="file" accept=".pdf" onChange={handleFileChange} className="hidden" />
                </div>
                <button onClick={handleSubmit} className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 flex items-center justify-center gap-2"><FileText />Upload PDF</button>
            </div>
        </div>
    );
};

// Main Dashboard Component
const GovernmentDashboard: React.FC<GovernmentDashboardProps> = ({
  notifications, pdfDocuments, onSendNotification, onUploadPdf, onDeleteNotification, onDeletePdf
}) => {
  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 mb-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-indigo-600 p-3 rounded-lg"><Send className="w-8 h-8 text-white" /></div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Government Dashboard</h2>
            <p className="text-gray-600">Create and manage student content</p>
          </div>
        </div>

        <NotificationForm onSendNotification={onSendNotification} />
        
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2"><Filter />Sent Notifications ({notifications.length})</h3>
          <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
            {notifications.map(n => (
              <div key={n._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow flex items-start justify-between">
                <div>
                  <h4 className="font-bold text-gray-800 flex items-center gap-2">
                    {n.title}
                    <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider ${n.accountType === 'aadhaar' ? 'bg-blue-100 text-blue-800' : 'bg-indigo-100 text-indigo-800'}`}>
                        {n.accountType}
                    </span>
                  </h4>
                  <p className="text-sm text-gray-600 my-1">{n.message}</p>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500 mt-2">
                    <span className="flex items-center gap-1"><Tag className="w-3 h-3" />{n.category}</span>
                    <span className="flex items-center gap-1"><Users className="w-3 h-3" />{n.audience}</span>
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{n.createdAt ? formatTime(n.createdAt) : 'N/A'}</span>
                    {n.link && <span className="flex items-center gap-1 text-blue-600"><ExternalLink className="w-3 h-3" />{n.link}</span>}
                  </div>
                </div>
                <button onClick={() => onDeleteNotification(n._id)} aria-label="Delete notification" className="ml-4 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 /></button>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-8 border-t-2 border-gray-200">
            <PdfUploadForm onUploadPdf={onUploadPdf} />
            <div>
              <h4 className="text-lg font-bold text-gray-800 mb-4">Uploaded Documents ({pdfDocuments.length})</h4>
              <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                {pdfDocuments.map(pdf => (
                  <div key={pdf.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-800">{pdf.title}</h4>
                      <p className="text-sm text-gray-600 my-1">{pdf.description}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500 mt-2">
                        <span>Size: {pdf.size}</span>
                        <span>Downloads: {pdf.downloads}</span>
                      </div>
                    </div>
                    <button onClick={() => onDeletePdf(pdf.id)} aria-label="Delete PDF document" className="ml-4 p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 /></button>
                  </div>
                ))}
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default GovernmentDashboard;
