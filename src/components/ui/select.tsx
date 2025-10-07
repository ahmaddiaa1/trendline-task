"use client";

import * as React from "react";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export interface SelectItem {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps {
  items: SelectItem[];
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  searchable?: boolean;
}

export function Select({
  items,
  value,
  onValueChange,
  placeholder = "Select an option...",
  className,
  disabled = false,
  searchable = false,
}: SelectProps) {
  const [open, setOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");

  const selectedItem = items.find((item) => item.value === value);

  const filteredItems = searchable
    ? items.filter((item) =>
        item.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : items;

  return (
    <Popover
      open={open}
      onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className={cn(
            "w-full justify-between font-normal",
            !selectedItem && "text-muted-foreground",
            className
          )}
          disabled={disabled}>
          <span className='truncate'>
            {selectedItem ? selectedItem.label : placeholder}
          </span>
          {open ? (
            <ChevronUp className='ml-2 h-4 w-4 shrink-0 opacity-50' />
          ) : (
            <ChevronDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className='w-full p-0'
        align='start'>
        {searchable && (
          <div className='p-2 border-b'>
            <input
              type='text'
              placeholder='Search...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='w-full px-2 py-1 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-primary'
            />
          </div>
        )}
        <div className='max-h-60 overflow-auto'>
          {filteredItems.length === 0 ? (
            <div className='px-2 py-1.5 text-sm text-muted-foreground text-center'>
              No options found
            </div>
          ) : (
            filteredItems.map((item) => (
              <div
                key={item.value}
                className={cn(
                  "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors",
                  item.disabled
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-accent hover:text-accent-foreground",
                  value === item.value && "bg-accent text-accent-foreground"
                )}
                onClick={() => {
                  if (!item.disabled) {
                    onValueChange?.(item.value);
                    setOpen(false);
                    setSearchTerm("");
                  }
                }}>
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === item.value ? "opacity-100" : "opacity-0"
                  )}
                />
                <span className='truncate'>{item.label}</span>
              </div>
            ))
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
