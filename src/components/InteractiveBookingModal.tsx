import React, { useState } from 'react';
import { X, CheckCircle2, Phone, MapPin, User, Wrench, ShieldCheck, Clock } from 'lucide-react';
import { BookingData } from '../types';

interface InteractiveBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
}

export const InteractiveBookingModal: React.FC<InteractiveBookingModalProps> = ({
  isOpen,
  onClose,
  defaultService = 'General Plumbing Repair',
}) => {
  const [step, setStep] = useState<'form' | 'submitting' | 'confirmed'>('form');
  const [formData, setFormData] = useState<BookingData>({
    fullName: '',
    phone: '',
    address: 'Santa Ana, CA',
    serviceType: defaultService,
    urgency: 'standard',
    notes: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) errs.fullName = 'Please enter your full name';
    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required';
    } else if (!/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(formData.phone)) {
      errs.phone = 'Enter a valid 10-digit phone number';
    }
    if (!formData.address.trim()) errs.address = 'Street address is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStep('submitting');
    setTimeout(() => {
      setStep('confirmed');
    }, 700);
  };

  const resetAndClose = () => {
    setStep('form');
    setErrors({});
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#10232D]/70 backdrop-blur-sm overflow-y-auto"
    >
      <div className="relative w-full max-w-lg bg-[#FFFFFF] rounded-[12px] border border-[#D7DEE1] p-6 sm:p-10 shadow-2xl my-8">
        {/* Close Button */}
        <button
          onClick={resetAndClose}
          aria-label="Close modal"
          className="absolute top-6 right-6 p-2 text-[#69767D] hover:text-[#10232D] rounded-md hover:bg-[#F7F6F1] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'form' && (
          <div>
            <div className="mb-6">
              <span className="text-xs font-mono tracking-widest text-[#4F9DA6] uppercase font-semibold block mb-1">
                SANTA ANA DIRECT DISPATCH
              </span>
              <h2 id="booking-modal-title" className="text-2xl sm:text-3xl font-bold uppercase text-[#10232D]">
                Request Service
              </h2>
              <p className="text-xs text-[#69767D] mt-1 font-normal">
                Direct phone: <a href="tel:6572723124" className="text-[#10232D] font-bold hover:text-[#4F9DA6]">(657) 272-3124</a>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-medium uppercase text-[#10232D] mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3 w-4 h-4 text-[#69767D]" />
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Jane Doe"
                    className={`w-full pl-10 pr-4 py-2.5 text-sm bg-[#F7F6F1] border rounded-[6px] text-[#10232D] placeholder-[#69767D]/60 focus:outline-none focus:border-[#4F9DA6] ${
                      errors.fullName ? 'border-[#C94B45]' : 'border-[#D7DEE1]'
                    }`}
                  />
                </div>
                {errors.fullName && (
                  <p className="text-[11px] text-[#C94B45] mt-1 font-medium">{errors.fullName}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-medium uppercase text-[#10232D] mb-1">
                  Phone Number *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-3 w-4 h-4 text-[#69767D]" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="(657) 272-3124"
                    className={`w-full pl-10 pr-4 py-2.5 text-sm bg-[#F7F6F1] border rounded-[6px] text-[#10232D] placeholder-[#69767D]/60 focus:outline-none focus:border-[#4F9DA6] ${
                      errors.phone ? 'border-[#C94B45]' : 'border-[#D7DEE1]'
                    }`}
                  />
                </div>
                {errors.phone && (
                  <p className="text-[11px] text-[#C94B45] mt-1 font-medium">{errors.phone}</p>
                )}
              </div>

              {/* Address */}
              <div>
                <label className="block text-xs font-medium uppercase text-[#10232D] mb-1">
                  Service Address *
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3.5 top-3 w-4 h-4 text-[#69767D]" />
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="1464 Maple St, Santa Ana, CA"
                    className={`w-full pl-10 pr-4 py-2.5 text-sm bg-[#F7F6F1] border rounded-[6px] text-[#10232D] placeholder-[#69767D]/60 focus:outline-none focus:border-[#4F9DA6] ${
                      errors.address ? 'border-[#C94B45]' : 'border-[#D7DEE1]'
                    }`}
                  />
                </div>
                {errors.address && (
                  <p className="text-[11px] text-[#C94B45] mt-1 font-medium">{errors.address}</p>
                )}
              </div>

              {/* Service Type */}
              <div>
                <label className="block text-xs font-medium uppercase text-[#10232D] mb-1">
                  Service Needed
                </label>
                <div className="relative">
                  <Wrench className="absolute left-3.5 top-3 w-4 h-4 text-[#69767D]" />
                  <select
                    value={formData.serviceType}
                    onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-[#F7F6F1] border border-[#D7DEE1] rounded-[6px] text-[#10232D] focus:outline-none focus:border-[#4F9DA6]"
                  >
                    <option value="Plumbing Repair">Plumbing Repair & Fixtures</option>
                    <option value="Water Heater Service">Water Heater Service & Replacement</option>
                    <option value="Drain Cleaning">Drain Cleaning & Clog Removal</option>
                    <option value="Leak Detection">Leak Detection & Isolation</option>
                    <option value="Emergency Plumbing">Emergency Plumbing</option>
                  </select>
                </div>
              </div>

              {/* Urgency */}
              <div>
                <label className="block text-xs font-medium uppercase text-[#10232D] mb-1">
                  Urgency Level
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, urgency: 'standard' })}
                    className={`py-2.5 px-3 rounded-[6px] text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                      formData.urgency === 'standard'
                        ? 'bg-[#10232D] text-[#FFFFFF]'
                        : 'bg-[#F7F6F1] text-[#69767D] border border-[#D7DEE1] hover:border-[#10232D]'
                    }`}
                  >
                    Standard Visit
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, urgency: 'emergency' })}
                    className={`py-2.5 px-3 rounded-[6px] text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                      formData.urgency === 'emergency'
                        ? 'bg-[#4F9DA6] text-[#FFFFFF]'
                        : 'bg-[#F7F6F1] text-[#69767D] border border-[#D7DEE1] hover:border-[#4F9DA6]'
                    }`}
                  >
                    Immediate Dispatch
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-4 py-4 bg-[#10232D] hover:bg-[#4F9DA6] text-[#FFFFFF] font-semibold text-xs uppercase tracking-wider rounded-[6px] transition-colors cursor-pointer"
              >
                Submit Service Request
              </button>
            </form>
          </div>
        )}

        {step === 'submitting' && (
          <div className="py-16 text-center space-y-4">
            <div className="w-10 h-10 border-2 border-[#10232D] border-t-[#4F9DA6] rounded-full animate-spin mx-auto" />
            <p className="text-sm font-mono text-[#69767D] uppercase tracking-wider">
              CONNECTING TO SANTA ANA DISPATCH...
            </p>
          </div>
        )}

        {step === 'confirmed' && (
          <div className="py-8 text-center space-y-6">
            <div className="w-14 h-14 bg-[#4F9DA6]/15 rounded-full flex items-center justify-center mx-auto text-[#4F9DA6]">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-mono text-[#4F9DA6] uppercase tracking-widest font-semibold block mb-1">
                CONFIRMATION // 2026-AVIE
              </span>
              <h3 className="text-2xl font-bold uppercase text-[#10232D]">
                Request Received
              </h3>
              <p className="text-sm text-[#69767D] mt-2 leading-relaxed">
                Thank you, <span className="font-semibold text-[#10232D]">{formData.fullName}</span>. An Avie Plumbing technician is reviewing your request for <span className="font-semibold text-[#10232D]">{formData.address}</span> and will call you shortly at <span className="font-mono text-[#10232D]">{formData.phone}</span>.
              </p>
            </div>

            <div className="p-4 rounded-[8px] bg-[#F7F6F1] border border-[#D7DEE1] text-xs text-[#69767D] text-left space-y-1">
              <div><strong className="text-[#10232D]">Service:</strong> {formData.serviceType}</div>
              <div><strong className="text-[#10232D]">Direct Line:</strong> (657) 272-3124</div>
            </div>

            <button
              onClick={resetAndClose}
              className="w-full py-3.5 bg-[#10232D] hover:bg-[#4F9DA6] text-[#FFFFFF] rounded-[6px] text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
