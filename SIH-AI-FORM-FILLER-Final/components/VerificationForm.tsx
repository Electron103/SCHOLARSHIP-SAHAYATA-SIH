// VerificationForm.tsx
import React, { useState, useEffect, useRef, useCallback, memo } from "react";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { TRANSLATIONS } from "../constants";
import { FormData } from "../types";

interface VerificationFormProps {
  data: FormData;
  onChange: (data: FormData) => void;
  onGenerate: () => void;
  isGenerating?: boolean;
  lang?: string;
}

/** keys used in the form - keep in sync with your FormData type */
type TextFieldKey =
  | "fullName"
  | "aadhaarNumber"
  | "accountNumber"
  | "ifscCode"
  | "bankName"
  | "branchName"
  | "mobileNumber"
  | "email";

interface FieldProps {
  label: string;
  field: TextFieldKey;
  value: string; // value from parent (OCR or saved)
  onCommit: (value: string) => void; // call only on blur/enter
  confidentLabel: string;
  checkLabel: string;
  isFilled: boolean;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  maxLength?: number;
  // optional validator to show inline validity state
  validator?: (v: string) => boolean;
  // optional custom error message
  errorMessage?: string;
}

/**
 * FieldInner implements a UX that:
 * - Uses local state for typing (prevents remount/caret loss).
 * - Calls onCommit on blur or Enter.
 * - Syncs parent value into local when parent value changes (but avoids clobbering active typing).
 */
const FieldInner: React.FC<FieldProps> = ({
  label,
  field,
  value,
  onCommit,
  confidentLabel,
  checkLabel,
  isFilled,
  inputMode,
  maxLength,
  validator,
  errorMessage,
}) => {
  const id = `verify-${field}`;
  const [localValue, setLocalValue] = useState<string>(value ?? "");
  // track whether user is interacting (focused)
  const focusedRef = useRef(false);
  // last prop value to compare for sync decisions
  const lastPropRef = useRef(value ?? "");

  useEffect(() => {
    // If parent sends a new value and user is NOT actively focused,
    // or the parent value actually changed meaningfully (OCR updated),
    // then sync into localValue.
    // Avoid forcing sync while user is focused (typing).
    if (!focusedRef.current && (value ?? "") !== lastPropRef.current) {
      setLocalValue(value ?? "");
      lastPropRef.current = value ?? "";
    }
    // if parent value changed while user is not focused, we keep local in sync.
  }, [value]);

  // keep lastPropRef updated when local commits
  const commitToParent = useCallback(
    (v: string) => {
      if ((v ?? "") !== lastPropRef.current) {
        lastPropRef.current = v ?? "";
        onCommit(v ?? "");
      }
    },
    [onCommit]
  );

  const handleFocus = () => {
    focusedRef.current = true;
  };

  const handleBlur = () => {
    focusedRef.current = false;
    // commit on blur
    commitToParent(localValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      // commit on Enter as well (useful on desktop)
      (e.target as HTMLInputElement).blur();
      commitToParent(localValue);
    }
  };

  // On every keystroke update only local state -> ensures caret/focus not lost
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let v = e.target.value;
    // If this field is a mobileNumber, keep only digits to make typing easier
    if (field === "mobileNumber") {
      v = v.replace(/\D/g, "");
    }
    if (typeof maxLength === "number" && v.length > maxLength) return;
    setLocalValue(v);
  };

  // determine current validity (use validator if provided)
  const hasValidator = typeof validator === "function";
  const isValid = hasValidator ? validator(localValue) : true;

  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={id}
        className="text-sm font-medium text-slate-700 flex justify-between"
        title={label}
      >
        {label}
        {isFilled ? (
          <span className="text-[10px] bg-green-100 text-green-700 px-1.5 rounded-sm flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> {confidentLabel}
          </span>
        ) : (
          <span className="text-[10px] bg-amber-100 text-amber-700 px-1.5 rounded-sm flex items-center gap-1">
            <AlertCircle className="w-3 h-3" /> {checkLabel}
          </span>
        )}
      </label>

      <input
        id={id}
        type="text"
        value={localValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        placeholder={label}
        title={label}
        autoComplete="off"
        inputMode={inputMode}
        maxLength={maxLength}
        className="px-4 py-2.5 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-slate-800"
      />

      {/* Inline validation message:
          - show only when there is a validator,
          - not while the user is focused (avoids distracting while typing),
          - and when there's some input present but it's invalid.
      */}
      {hasValidator && !focusedRef.current && localValue.length > 0 && !isValid && (
        <div className="text-[12px] text-red-600 mt-1">
          {errorMessage ?? "Please enter a valid value."}
        </div>
      )}
    </div>
  );
};

// Memoize field so parent re-renders don't recreate this component
const Field = memo(FieldInner);

/** Main Verification form */
const VerificationForm: React.FC<VerificationFormProps> = ({
  data,
  onChange,
  onGenerate,
  isGenerating = false,
  lang = "en",
}) => {
  const t = (TRANSLATIONS[lang]?.verify || TRANSLATIONS.en.verify)!;

  // commit helper - only called on blur/enter from fields
  const commitField = useCallback(
    (field: TextFieldKey, value: string) => {
      // Avoid creating new object identity unless something changed
      if ((data as any)[field] !== value) {
        const updated = { ...data, [field]: value };
        onChange(updated);
      }
    },
    [data, onChange]
  );

  // stable wrapper passed to Field to avoid inline function recreation where possible
  const makeOnCommit = (field: TextFieldKey) => {
    return (v: string) => commitField(field, v);
  };

  // validators for mobile and email
  const mobileValidator = (v: string) => /^\d{10}$/.test(v);
  // basic but reasonable email regex
  const emailValidator = (v: string) =>
    // eslint-disable-next-line no-useless-escape
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  // Decide the 'isFilled' badge state:
  // - For mobile/email, consider them filled only if they pass validation.
  // - For other fields keep the old behavior (non-empty).
  const mobileIsFilled = mobileValidator(data.mobileNumber || "");
  const emailIsFilled = emailValidator(data.email || "");

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-800">{t.title}</h2>
        <p className="text-slate-600">{t.subtitle}</p>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <Field
            label={t.fullName}
            field="fullName"
            value={data.fullName || ""}
            onCommit={makeOnCommit("fullName")}
            confidentLabel={t.confident}
            checkLabel={t.check}
            isFilled={!!data.fullName}
            inputMode="text"
          />
        </div>

        <Field
          label={t.aadhaarNumber}
          field="aadhaarNumber"
          value={data.aadhaarNumber || ""}
          onCommit={makeOnCommit("aadhaarNumber")}
          confidentLabel={t.confident}
          checkLabel={t.check}
          isFilled={!!data.aadhaarNumber}
          inputMode="numeric"
          maxLength={12}
        />

        <Field
          label={t.accountNumber}
          field="accountNumber"
          value={data.accountNumber || ""}
          onCommit={makeOnCommit("accountNumber")}
          confidentLabel={t.confident}
          checkLabel={t.check}
          isFilled={!!data.accountNumber}
          inputMode="numeric"
        />

        <Field
          label={t.ifscCode}
          field="ifscCode"
          value={data.ifscCode || ""}
          onCommit={makeOnCommit("ifscCode")}
          confidentLabel={t.confident}
          checkLabel={t.check}
          isFilled={!!data.ifscCode}
          inputMode="text"
          maxLength={11}
        />

        <Field
          label={t.bankName}
          field="bankName"
          value={data.bankName || ""}
          onCommit={makeOnCommit("bankName")}
          confidentLabel={t.confident}
          checkLabel={t.check}
          isFilled={!!data.bankName}
          inputMode="text"
        />

        <Field
          label={t.branchName}
          field="branchName"
          value={data.branchName || ""}
          onCommit={makeOnCommit("branchName")}
          confidentLabel={t.confident}
          checkLabel={t.check}
          isFilled={!!data.branchName}
          inputMode="text"
        />

        <Field
          label={t.mobileNumber}
          field="mobileNumber"
          value={data.mobileNumber || ""}
          onCommit={makeOnCommit("mobileNumber")}
          confidentLabel={t.confident}
          checkLabel={t.check}
          // show "looks correct" only when it's exactly 10 digits
          isFilled={mobileIsFilled}
          inputMode="tel"
          maxLength={10}
          validator={mobileValidator}
          errorMessage={"Enter a 10-digit mobile number (digits only)."}
        />

        <Field
          label={t.email}
          field="email"
          value={data.email || ""}
          onCommit={makeOnCommit("email")}
          confidentLabel={t.confident}
          checkLabel={t.check}
          // show "looks correct" only when email pattern matches
          isFilled={emailIsFilled}
          inputMode="email"
          validator={emailValidator}
          errorMessage={"Enter a valid email address (example: name@domain.com)."}
        />
      </div>

      <div className="bg-indigo-50 p-6 rounded-xl border">
        <h3 className="font-semibold">{t.optionsTitle}</h3>
        {t.options.map((opt: any) => (
          <label key={opt.val} className="flex items-center gap-3 py-1 cursor-pointer">
            <input
              type="radio"
              name="dbtOption"
              checked={data.dbtOption === opt.val}
              onChange={() => onChange({ ...data, dbtOption: opt.val })}
              title={opt.label}
              aria-label={opt.label}
            />
            <span>{opt.label}</span>
          </label>
        ))}
      </div>

      <div className="flex justify-center">
        <button
          type="button"
          onClick={onGenerate}
          disabled={isGenerating}
          className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 shadow-md disabled:opacity-60"
          aria-busy={Boolean(isGenerating)}
          title={isGenerating ? "Generating..." : "Generate"}
        >
          {isGenerating ? t.generating : t.generate}
        </button>
      </div>
    </div>
  );
};

export default VerificationForm;
