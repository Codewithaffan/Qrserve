"use client";

import { useId, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const controlClass =
  "w-full rounded-xl border border-ink-200 bg-white px-3.5 text-ink-950 placeholder:text-ink-400 transition-colors " +
  "hover:border-ink-300 focus:border-ink-950 focus:outline-none focus:ring-4 focus:ring-sun-300/50 disabled:opacity-60";

interface FieldShellProps {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  children: ReactNode;
  className?: string;
}

function FieldShell({ id, label, hint, error, children, className }: FieldShellProps) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <label htmlFor={id} className="block text-sm font-semibold text-ink-900">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} role="alert" className="text-sm text-chili-600">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="text-sm text-ink-500">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hint?: string;
  error?: string;
  icon?: ReactNode;
  wrapperClassName?: string;
}

export function TextField({ label, hint, error, icon, className, wrapperClassName, id, ...props }: TextFieldProps) {
  const autoId = useId();
  const fieldId = id ?? autoId;
  return (
    <FieldShell id={fieldId} label={label} hint={hint} error={error} className={wrapperClassName}>
      <div className="relative">
        {icon && (
          <span className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-ink-400">{icon}</span>
        )}
        <input
          id={fieldId}
          aria-invalid={!!error}
          aria-describedby={error ? `${fieldId}-error` : hint ? `${fieldId}-hint` : undefined}
          className={cn(controlClass, "h-12", icon && "pl-11", error && "border-chili-500", className)}
          {...props}
        />
      </div>
    </FieldShell>
  );
}

interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  wrapperClassName?: string;
}

export function SelectField({ label, className, wrapperClassName, id, children, ...props }: SelectFieldProps) {
  const autoId = useId();
  const fieldId = id ?? autoId;
  return (
    <FieldShell id={fieldId} label={label} className={wrapperClassName}>
      <select id={fieldId} className={cn(controlClass, "h-12", className)} {...props}>
        {children}
      </select>
    </FieldShell>
  );
}

interface TextAreaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  wrapperClassName?: string;
}

export function TextAreaField({ label, className, wrapperClassName, id, ...props }: TextAreaFieldProps) {
  const autoId = useId();
  const fieldId = id ?? autoId;
  return (
    <FieldShell id={fieldId} label={label} className={wrapperClassName}>
      <textarea id={fieldId} className={cn(controlClass, "min-h-24 resize-none py-3", className)} {...props} />
    </FieldShell>
  );
}

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  className?: string;
}

/** Accessible switch. */
export function Toggle({ checked, onChange, label, className }: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative inline-flex h-7 w-12 shrink-0 items-center rounded-full transition-colors",
        checked ? "bg-ink-950" : "bg-ink-200",
        className,
      )}
    >
      <span
        className={cn(
          "absolute left-1 size-5 rounded-full shadow transition-transform duration-200",
          checked ? "translate-x-5 bg-sun-400" : "translate-x-0 bg-white",
        )}
      />
    </button>
  );
}
