import { renderHook, act } from "@testing-library/react";
import { usePomodoro } from "@/features/pomodoro/hooks/usePomodoro";
import { DEFAULT_SETTINGS, POMODORO_PRESETS } from "@/features/pomodoro/utils";

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    },
    removeItem: (key: string) => {
      delete store[key];
    },
  };
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

// Mock Audio
class AudioMock {
  volume = 1;
  play = jest.fn().mockResolvedValue(undefined);
}
global.Audio = AudioMock as unknown as typeof Audio;

// Mock Notification
const notificationMock = jest.fn() as unknown as typeof Notification;
Object.defineProperty(global, "Notification", {
  value: notificationMock,
  writable: true,
});

Object.defineProperty(notificationMock, "permission", {
  get: () => "granted",
  configurable: true,
});

Object.defineProperty(notificationMock, "requestPermission", {
  value: jest.fn().mockResolvedValue("granted"),
  writable: true,
});

describe("usePomodoro Hook", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.useFakeTimers();
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test("initializes with default settings", () => {
    const { result } = renderHook(() => usePomodoro());

    expect(result.current.settings).toEqual(DEFAULT_SETTINGS);
    expect(result.current.mode).toBe("focus");
    expect(result.current.timeLeft).toBe(DEFAULT_SETTINGS.focusDuration * 60);
    expect(result.current.isActive).toBe(false);
  });

  test("loads from localStorage", () => {
    const customSettings = {
      ...DEFAULT_SETTINGS,
      focusDuration: 30,
    };
    localStorage.setItem("pomodoro_settings", JSON.stringify(customSettings));

    const { result } = renderHook(() => usePomodoro());

    expect(result.current.settings.focusDuration).toBe(30);
    expect(result.current.timeLeft).toBe(30 * 60);
  });

  test("toggles timer correctly", () => {
    const { result } = renderHook(() => usePomodoro());

    act(() => {
      result.current.toggleTimer();
    });
    expect(result.current.isActive).toBe(true);

    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(result.current.timeLeft).toBe(
      DEFAULT_SETTINGS.focusDuration * 60 - 1,
    );

    act(() => {
      result.current.toggleTimer();
    });
    expect(result.current.isActive).toBe(false);
  });

  test("resets timer correctly", () => {
    const { result } = renderHook(() => usePomodoro());

    act(() => {
      result.current.toggleTimer();
      jest.advanceTimersByTime(10000);
      result.current.resetTimer();
    });

    expect(result.current.isActive).toBe(false);
    expect(result.current.timeLeft).toBe(DEFAULT_SETTINGS.focusDuration * 60);
  });

  test("transitions to short break after focus session", () => {
    const { result } = renderHook(() => usePomodoro());

    act(() => {
      result.current.toggleTimer();
    });

    act(() => {
      jest.advanceTimersByTime(DEFAULT_SETTINGS.focusDuration * 60 * 1000);
    });

    expect(result.current.timeLeft).toBe(
      DEFAULT_SETTINGS.shortBreakDuration * 60,
    );
    expect(result.current.mode).toBe("shortBreak");
    expect(result.current.sessionsToday).toBe(1);
    expect(result.current.completedSessions).toBe(1);
  });

  test("transitions to long break after correct number of sessions", () => {
    const { result } = renderHook(() => usePomodoro());

    // Cycle 4 focus sessions
    for (let i = 0; i < 4; i++) {
      // Focus
      act(() => {
        result.current.toggleTimer();
      });
      act(() => {
        jest.advanceTimersByTime(result.current.timeLeft * 1000);
      });

      if (i < 3) {
        expect(result.current.mode).toBe("shortBreak");
        // Finish break
        act(() => {
          result.current.toggleTimer();
        });
        act(() => {
          jest.advanceTimersByTime(result.current.timeLeft * 1000);
        });
        expect(result.current.mode).toBe("focus");
      }
    }

    expect(result.current.mode).toBe("longBreak");
    expect(result.current.timeLeft).toBe(
      DEFAULT_SETTINGS.longBreakDuration * 60,
    );
  });

  test("updates preset correctly", () => {
    const { result } = renderHook(() => usePomodoro());

    act(() => {
      result.current.updatePreset("Baby Step");
    });

    expect(result.current.preset).toBe("Baby Step");
    expect(result.current.settings.focusDuration).toBe(
      POMODORO_PRESETS["Baby Step"].focusDuration,
    );
    expect(result.current.timeLeft).toBe(
      POMODORO_PRESETS["Baby Step"].focusDuration! * 60,
    );
  });

  test("updates custom settings", () => {
    const { result } = renderHook(() => usePomodoro());

    act(() => {
      result.current.updateCustomSettings({ focusDuration: 15 });
    });

    expect(result.current.preset).toBe("Custom");
    expect(result.current.settings.focusDuration).toBe(15);
    expect(result.current.timeLeft).toBe(15 * 60);
  });

  test("skips session", () => {
    const { result } = renderHook(() => usePomodoro());

    act(() => {
      result.current.skipSession();
    });

    expect(result.current.mode).toBe("shortBreak");
    expect(result.current.sessionsToday).toBe(1);
  });
});
