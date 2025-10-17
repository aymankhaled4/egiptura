import React, { useState } from 'react';
import type { QuoteFormData } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { CrossedSceptersIcon } from './Icons';
import emailjs from '@emailjs/browser'; // <--- استورد EmailJS

interface QuoteRequestFormProps {
  programName: string;
  category: 'gold' | 'diamond' | null;
  onClose: () => void;
}

const QuoteRequestForm: React.FC<QuoteRequestFormProps> = ({ programName, category, onClose }) => {
  const { language } = useLanguage();
  const [formData, setFormData] = useState<QuoteFormData>({
    name: '',
    email: '',
    whatsapp: '',
    travelers: '2',
    month: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 👇 EmailJS configuration
    const serviceID = 'service_lx6sbpr';
    const templateID = 'template_2hjtdga';
    const publicKey = '3yCvfbPTSpg0kFFxT';

    // 👇 البيانات اللي هتبعت على الإيميل
    const templateParams = {
      programName,
      category: category ? category.charAt(0).toUpperCase() + category.slice(1) : 'Not selected',
      name: formData.name,
      email: formData.email,
      whatsapp: formData.whatsapp,
      travelers: formData.travelers,
      month: formData.month,
      language // لو حابب تعرف لغة المستخدم
    };

    emailjs.send(serviceID, templateID, templateParams, publicKey)
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        alert(language === 'es'
          ? '¡Gracias! Tu solicitud ha sido enviada. Te contactaremos pronto.'
          : language === 'ar'
          ? 'شكراً! تم إرسال طلبك، وسنتواصل معك قريباً.'
          : 'Thank you! Your request has been submitted. We will contact you shortly.');
        onClose();
      }, (err) => {
        console.error('FAILED...', err);
        alert('Something went wrong, please try again.');
      });
  };

  const labels = {
    es: {
      title: 'Solicitar Cotización',
      program: 'Programa',
      category: 'Categoría',
      name: 'Nombre Completo',
      email: 'Correo Electrónico',
      whatsapp: 'WhatsApp (con código de país)',
      travelers: 'Número de Viajeros',
      month: 'Mes de Viaje Preferido',
      submit: 'Enviar Solicitud',
      noCategory: 'No seleccionada'
    },
    en: {
      title: 'Request a Quote',
      program: 'Program',
      category: 'Category',
      name: 'Full Name',
      email: 'Email Address',
      whatsapp: 'WhatsApp (with country code)',
      travelers: 'Number of Travelers',
      month: 'Preferred Travel Month',
      submit: 'Submit Request',
      noCategory: 'Not selected'
    },
     ar: {
      title: 'طلب عرض سعر',
      program: 'البرنامج',
      category: 'الفئة',
      name: 'الاسم الكامل',
      email: 'البريد الإلكتروني',
      whatsapp: 'واتساب (مع رمز الدولة)',
      travelers: 'عدد المسافرين',
      month: 'شهر السفر المفضل',
      submit: 'إرسال الطلب',
      noCategory: 'لم يتم الاختيار'
    }
  };

  const text = labels[language] || labels.en;

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
      <div className="bg-[#202123] rounded-xl shadow-2xl w-full max-w-lg flex flex-col overflow-hidden border border-gray-700" onClick={e => e.stopPropagation()}>
        <header className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-xl font-semibold text-[#C59D5F]">{text.title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-300">
            <CrossedSceptersIcon className="w-7 h-7" />
          </button>
        </header>
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
          <div className="p-3 bg-gray-800/50 rounded-lg border border-gray-600">
            <p className="text-sm text-gray-400">{text.program}: <span className="font-semibold text-gray-200">{programName}</span></p>
            <p className="text-sm text-gray-400">{text.category}: <span className="font-semibold text-gray-200">{category ? (category.charAt(0).toUpperCase() + category.slice(1)) : text.noCategory}</span></p>
          </div>

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">{text.name}</label>
            <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="w-full bg-[#2a2b2e] border border-gray-600 rounded-md p-2 text-gray-200 focus:ring-[#C59D5F] focus:border-[#C59D5F]" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">{text.email}</label>
            <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required className="w-full bg-[#2a2b2e] border border-gray-600 rounded-md p-2 text-gray-200 focus:ring-[#C59D5F] focus:border-[#C59D5F]" />
          </div>
          <div>
            <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-400 mb-1">{text.whatsapp}</label>
            <input type="tel" name="whatsapp" id="whatsapp" value={formData.whatsapp} onChange={handleChange} required className="w-full bg-[#2a2b2e] border border-gray-600 rounded-md p-2 text-gray-200 focus:ring-[#C59D5F] focus:border-[#C59D5F]" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="travelers" className="block text-sm font-medium text-gray-400 mb-1">{text.travelers}</label>
              <input type="number" name="travelers" id="travelers" min="1" value={formData.travelers} onChange={handleChange} required className="w-full bg-[#2a2b2e] border border-gray-600 rounded-md p-2 text-gray-200 focus:ring-[#C59D5F] focus:border-[#C59D5F]" />
            </div>
            <div>
              <label htmlFor="month" className="block text-sm font-medium text-gray-400 mb-1">{text.month}</label>
              <input type="month" name="month" id="month" value={formData.month} onChange={handleChange} required className="w-full bg-[#2a2b2e] border border-gray-600 rounded-md p-2 text-gray-200 focus:ring-[#C59D5F] focus:border-[#C59D5F]" />
            </div>
          </div>
          
          <div className="pt-4">
            <button type="submit" className="w-full px-5 py-2.5 text-sm font-semibold text-black bg-[#C59D5F] hover:bg-amber-500 rounded-lg transition-colors duration-200">
              {text.submit}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuoteRequestForm;