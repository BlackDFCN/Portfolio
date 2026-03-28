/**
 * Basic UI Components
 * Simple implementations of common UI components
 */

import React from 'react';

// Card Components
export function Card({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-lg border border-gray-200 bg-white shadow-sm ${className}`}>
      {children}
    </div>
  );
}

export function CardHeader({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`border-b border-gray-200 px-6 py-4 ${className}`}>{children}</div>;
}

export function CardTitle({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <h2 className={`text-xl font-bold text-gray-900 ${className}`}>{children}</h2>;
}

export function CardDescription({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <p className={`text-sm text-slate-500 dark:text-slate-400 mt-1 leading-relaxed ${className}`}>{children}</p>;
}

export function CardContent({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`px-6 py-4 ${className}`}>{children}</div>;
}

// Button Component
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  children: React.ReactNode;
}

export function Button({
  children,
  variant = 'primary',
  className = '',
  disabled = false,
  ...props
}: ButtonProps) {
  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white disabled:bg-gray-400',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-900 disabled:bg-gray-400',
    outline: 'border border-gray-300 hover:bg-gray-50 text-gray-900 disabled:opacity-50',
  };

  return (
    <button
      disabled={disabled}
      className={`px-4 py-2 rounded-lg font-medium transition-colors ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

// Input Component
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function Input({ label, className = '', ...props }: InputProps) {
  return (
    <input
      className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      {...props}
    />
  );
}

// Label Component
interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
}

export function Label({ children, className = '', ...props }: LabelProps) {
  return (
    <label className={`block text-sm font-medium text-gray-700 mb-1 ${className}`} {...props}>
      {children}
    </label>
  );
}

// Select Components
interface SelectContextType {
  value: string;
  isOpen: boolean;
  onValueChange: (value: string) => void;
  setIsOpen: (open: boolean) => void;
  registerLabel: (value: string, label: string) => void;
  getLabel: (value: string) => string | undefined;
}

const SelectContext = React.createContext<SelectContextType | undefined>(undefined);

interface SelectProps {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
}

export function Select({ value, onValueChange, children }: SelectProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [labels, setLabels] = React.useState<Record<string, string>>({});
  const containerRef = React.useRef<HTMLDivElement>(null);

  const registerLabel = React.useCallback((val: string, label: string) => {
    setLabels(prev => {
      if (prev[val] === label) return prev;
      return { ...prev, [val]: label };
    });
  }, []);

  const getLabel = React.useCallback((val: string) => labels[val], [labels]);

  const contextValue = React.useMemo(() => ({
    value,
    onValueChange,
    isOpen,
    setIsOpen,
    registerLabel,
    getLabel
  }), [value, onValueChange, isOpen, registerLabel, getLabel]);

  // Cerrar al hacer clic fuera
  React.useEffect(() => {
    if (!isOpen) return;
    const handleDown = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    window.addEventListener('mousedown', handleDown);
    return () => window.removeEventListener('mousedown', handleDown);
  }, [isOpen]);

  return (
    <SelectContext.Provider value={contextValue}>
      <div className="relative w-full" ref={containerRef}>
        {children}
      </div>
    </SelectContext.Provider>
  );
}

export function SelectTrigger({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const context = React.useContext(SelectContext);

  return (
    <button
      type="button"
      onClick={() => {
        context?.setIsOpen(!context.isOpen);
      }}
      className={`w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-left flex justify-between items-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    >
      {children}
      <span className={`text-gray-500 transition-transform duration-200 ${context?.isOpen ? 'rotate-180' : ''}`}>▼</span>
    </button>
  );
}

export function SelectContent({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const context = React.useContext(SelectContext);

  if (!context?.isOpen) return null;

  return (
    <div
      className={`absolute top-full left-0 right-0 mt-1 border border-gray-300 rounded-lg bg-white shadow-xl z-50 max-h-60 overflow-y-auto animate-in fade-in zoom-in-95 duration-150 ${className}`}
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </div>
  );
}

interface SelectItemProps {
  value: string;
  children: React.ReactNode;
}

export function SelectItem({ value, children }: SelectItemProps) {
  const context = React.useContext(SelectContext);

  React.useEffect(() => {
    if (context && typeof children === 'string') {
      context.registerLabel(value, children);
    }
  }, [value, children, context]);

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        context?.onValueChange(value);
        context?.setIsOpen(false);
      }}
      className={`w-full px-3 py-2 text-left hover:bg-blue-50 transition-colors ${
        context?.value === value ? 'bg-blue-100 text-blue-900 font-semibold' : 'text-gray-900'
      }`}
    >
      {children}
    </button>
  );
}

interface SelectValueProps {
  placeholder?: string;
}

export function SelectValue({ placeholder = 'Selecciona una opción' }: SelectValueProps) {
  const context = React.useContext(SelectContext);
  const label = context?.value ? context.getLabel(context.value) : undefined;
  
  return <span>{label || context?.value || placeholder}</span>;
}

// Checkbox Component
interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'checked'> {
  checked?: boolean | 'indeterminate';
  onCheckedChange?: (checked: boolean) => void;
}

export function Checkbox({
  checked = false,
  onChange,
  onCheckedChange,
  className = '',
  id,
  ...props
}: CheckboxProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    onCheckedChange?.(isChecked);
    onChange?.(e);
  };

  return (
    <input
      type="checkbox"
      id={id}
      checked={checked === 'indeterminate' ? false : (checked as boolean)}
      onChange={handleChange}
      className={`w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer ${className}`}
      {...props}
    />
  );
}

// Textarea Component
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export function Textarea({ label, className = '', ...props }: TextareaProps) {
  return (
    <textarea
      className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-sans ${className}`}
      {...props}
    />
  );
}
