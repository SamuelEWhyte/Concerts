"use client";

import { AlertCircle, CheckCircle2, Info, X } from "lucide-react";
import { useState } from "react";

type AlertBannerProps = {
  message: string;
  variant?: "error" | "success" | "warning" | "info";
  dismissible?: boolean;
};

const variantStyles = {
  error: "alert-error",
  success: "alert-success",
  warning: "alert-warning",
  info: "alert-info",
};

const icons = {
  error: AlertCircle,
  success: CheckCircle2,
  warning: AlertCircle,
  info: Info,
};

export function AlertBanner({
  message,
  variant = "info",
  dismissible = true,
}: AlertBannerProps) {
  const [visible, setVisible] = useState(true);
  const Icon = icons[variant];

  if (!visible) return null;

  return (
    <div role="alert" className={`alert ${variantStyles[variant]} shadow-sm`}>
      <Icon className="h-5 w-5 shrink-0" aria-hidden />
      <span className="flex-1">{message}</span>
      {dismissible && (
        <button
          type="button"
          className="btn btn-ghost btn-xs btn-circle"
          onClick={() => setVisible(false)}
          aria-label="Dismiss"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
