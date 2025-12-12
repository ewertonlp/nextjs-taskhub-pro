"use client";

import { Bell, Clock } from "lucide-react";

interface AlertItem {
  id: number;
  message: string;
  tag: string;
  tagColor: string;
}

const alerts: AlertItem[] = [
  {
    id: 1,
    message: "Seating plan needs approval for",
    tag: "Home For all Charity Gala",
    tagColor: "bg-orange-100 text-orange-700",
  },
  {
    id: 2,
    message: "Mia Thompson’s payment was declined for",
    tag: "Vendor checklist",
    tagColor: "bg-yellow-100 text-yellow-700",
  },
  {
    id: 3,
    message: "Photo vendor replay pending",
    tag: "Hope for all charity",
    tagColor: "bg-purple-100 text-purple-700",
  },
  {
    id: 4,
    message: "Mia Thompson’s payment was declined for",
    tag: "Vendor checklist",
    tagColor: "bg-yellow-100 text-yellow-700",
  },
];

export default function AlertsCard() {
  return (
    <div className="w-full max-w-md rounded-2xl bg-slate-50 dark:bg-slate-700 p-5 border border-slate-100 dark:border-slate-500">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-slate-700 dark:text-slate-300">Alerts</h2>
        <a href="/dashboard/alerts" className="text-sm  text-amber-500 hover:underline cursor-pointer">
          See All
        </a>
      </div>

      {/* Alerts List */}
      <ul className="space-y-4">
        {alerts.map((alert) => (
          <li key={alert.id} className="flex items-start gap-3">
            {/* Icon */}
            <Clock className="w-5 h-5 text-orange-500 mt-1" />

            {/* Text */}
            <div className="flex-1 text-sm text-gray-700 dark:text-slate-300 leading-tight">
              {alert.message}{" "}
              <span
                className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${alert.tagColor}`}
              >
                {alert.tag}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
