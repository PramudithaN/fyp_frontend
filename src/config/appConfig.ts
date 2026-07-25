// Central System & Schedule Configuration for PetroCast Platform

export interface SystemScheduleConfig {
  predictCacheTtlSeconds: number;
  predictionPrecomputeEnabled: boolean;
  predictionPrecomputeIntervalSeconds: number;
  predictionLockScheduleEnabled: boolean;
  predictionLockScheduleTimezone: string;
  predictionLockScheduleHour: number;
  predictionLockScheduleMinute: number;
  predictionCloseLockBufferMinutes: number;
  explainabilityScheduleTimezone: string;
  explainabilityScheduleHour: number;
  explainabilityScheduleMinute: number;
  explainabilityScheduleRetryHour: number;
  explainabilityScheduleRetryMinute: number;
}

export const APP_CONFIG: SystemScheduleConfig = {
  predictCacheTtlSeconds: Number(import.meta.env.VITE_PREDICT_CACHE_TTL_SECONDS ?? 45),
  predictionPrecomputeEnabled: (import.meta.env.VITE_PREDICTION_PRECOMPUTE_ENABLED ?? "true") === "true",
  predictionPrecomputeIntervalSeconds: Number(import.meta.env.VITE_PREDICTION_PRECOMPUTE_INTERVAL_SECONDS ?? 900),
  predictionLockScheduleEnabled: (import.meta.env.VITE_PREDICTION_LOCK_SCHEDULE_ENABLED ?? "true") === "true",
  predictionLockScheduleTimezone: String(import.meta.env.VITE_PREDICTION_LOCK_SCHEDULE_TIMEZONE ?? "Asia/Colombo"),
  predictionLockScheduleHour: Number(import.meta.env.VITE_PREDICTION_LOCK_SCHEDULE_HOUR ?? 7),
  predictionLockScheduleMinute: Number(import.meta.env.VITE_PREDICTION_LOCK_SCHEDULE_MINUTE ?? 0),
  predictionCloseLockBufferMinutes: Number(import.meta.env.VITE_PREDICTION_CLOSE_LOCK_BUFFER_MINUTES ?? 20),
  explainabilityScheduleTimezone: String(import.meta.env.VITE_EXPLAINABILITY_SCHEDULE_TIMEZONE ?? "Asia/Colombo"),
  explainabilityScheduleHour: Number(import.meta.env.VITE_EXPLAINABILITY_SCHEDULE_HOUR ?? 7),
  explainabilityScheduleMinute: Number(import.meta.env.VITE_EXPLAINABILITY_SCHEDULE_MINUTE ?? 30),
  explainabilityScheduleRetryHour: Number(import.meta.env.VITE_EXPLAINABILITY_SCHEDULE_RETRY_HOUR ?? 9),
  explainabilityScheduleRetryMinute: Number(import.meta.env.VITE_EXPLAINABILITY_SCHEDULE_RETRY_MINUTE ?? 0),
};

/**
 * Checks whether predictions are currently locked based on the Asia/Colombo lock schedule.
 */
export const checkIsPredictionLocked = (): { isLocked: boolean; reason?: string } => {
  if (!APP_CONFIG.predictionLockScheduleEnabled) {
    return { isLocked: false };
  }

  // Get current time in Asia/Colombo
  try {
    const colomboTimeStr = new Date().toLocaleString("en-US", {
      timeZone: APP_CONFIG.predictionLockScheduleTimezone,
      hour12: false,
      hour: "2-digit",
      minute: "2-digit"
    });

    const [hour, minute] = colomboTimeStr.split(":").map(Number);
    const lockStartMinutes = APP_CONFIG.predictionLockScheduleHour * 60 + APP_CONFIG.predictionLockScheduleMinute;
    const currentMinutes = hour * 60 + minute;
    const lockEndMinutes = lockStartMinutes + APP_CONFIG.predictionCloseLockBufferMinutes;

    if (currentMinutes >= lockStartMinutes && currentMinutes < lockEndMinutes) {
      return {
        isLocked: true,
        reason: `Predictions locked for scheduled precompute (${APP_CONFIG.predictionLockScheduleHour}:${String(APP_CONFIG.predictionLockScheduleMinute).padStart(2, "0")} ${APP_CONFIG.predictionLockScheduleTimezone})`
      };
    }
  } catch {
    // Fallback if timezone conversion fails
  }

  return { isLocked: false };
};
