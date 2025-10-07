"use client";

import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

export interface ServerSelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface ServerSelectProps {
  options: ServerSelectOption[];
  label: string;
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  name?: string;
  id?: string;
}

export function ServerSelect({
  options,
  value,
  label,
  onValueChange,
  placeholder = "Select an option...",
  className,
  disabled = false,
  name,
  id,
}: ServerSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find((option) => option.value === value);

  const handleOptionClick = (optionValue: string) => {
    onValueChange?.(optionValue);
    setIsOpen(false);
  };

  return (
    <div className='relative'>
      {/* Hidden input for form submission */}
      <input
        type='hidden'
        name={name}
        id={id}
        value={value || ""}
      />

      {/* Custom dropdown trigger */}
      <div
        className={cn(
          "flex h-10 xl:max-w-[299px] items-center justify-between rounded-xl border border-input bg-background p-6 text-sm cursor-pointer ",
          !selectedOption && "text-muted-foreground",
          className
        )}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        aria-controls=''
        aria-expanded={isOpen}
        aria-haspopup='listbox'
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            if (!disabled) setIsOpen(!isOpen);
          }
        }}>
        <label className='absolute -top-2 left-4 text-xs text-[#020202] bg-white px-2'>
          {label}
        </label>
        <span className='truncate'>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 opacity-50 transition-transform",
            isOpen && "rotate-90"
          )}
        />
      </div>

      {/* Dropdown menu */}
      {isOpen && (
        <div className='absolute z-50 w-[299px] mt-1 bg-white border border-gray-200 rounded-md shadow-lg'>
          <div className='max-h-60 overflow-auto'>
            {options.map((option, i) => (
              <div
                key={i}
                className={cn(
                  "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors",
                  option.disabled
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-accent hover:text-accent-foreground",
                  value === option.value && "bg-accent text-accent-foreground"
                )}
                onClick={() =>
                  !option.disabled && handleOptionClick(option.value)
                }
                role='option'
                aria-selected={value === option.value}>
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === option.value ? "opacity-100" : "opacity-0"
                  )}
                />
                <span className='truncate'>{option.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Click outside to close */}
      {isOpen && (
        <div
          className='fixed inset-0 z-40'
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
