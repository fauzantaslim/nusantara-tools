import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import PomodoroPage from "@/app/produktivitas/pomodoro/page";

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

// Mock Lucide icons to avoid render issues in test
jest.mock("lucide-react", () => ({
  Settings: () => <div data-testid="settings-icon" />,
  Timer: () => <div data-testid="timer-icon" />,
  Coffee: () => <div data-testid="coffee-icon" />,
  Wind: () => <div data-testid="wind-icon" />,
  Bell: () => <div data-testid="bell-icon" />,
  Volume2: () => <div data-testid="volume-icon" />,
  Play: () => <div data-testid="play-icon" />,
  Pause: () => <div data-testid="pause-icon" />,
  RotateCcw: () => <div data-testid="reset-icon" />,
  SkipForward: () => <div data-testid="skip-icon" />,
  Flame: () => <div data-testid="flame-icon" />,
  Zap: () => <div data-testid="zap-icon" />,
  Target: () => <div data-testid="target-icon" />,
  Clock: () => <div data-testid="clock-icon" />,
  Info: () => <div data-testid="info-icon" />,
  CheckCircle2: () => <div data-testid="check-icon" />,
  Waves: () => <div data-testid="waves-icon" />,
}));

// Mock Breadcrumbs
jest.mock("@/ui/Breadcrumbs", () => ({
  Breadcrumbs: ({ items }: { items: { label: string; href?: string }[] }) => (
    <nav data-testid="breadcrumbs">
      {items.map((item) => (
        <span key={item.label}>{item.label}</span>
      ))}
    </nav>
  ),
}));

describe("PomodoroPage Integration", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test("renders the page and components", () => {
    render(<PomodoroPage />);

    expect(
      screen.getByRole("heading", { level: 1, name: /Pomodoro Timer/i }),
    ).toBeInTheDocument();
    expect(screen.getByText("Konfigurasi Fokus")).toBeInTheDocument();
    expect(screen.getByText("Popular ⭐")).toBeInTheDocument();
    expect(screen.getByText("Apa itu Teknik Pomodoro?")).toBeInTheDocument();
  });

  test("can change preset and update timer", () => {
    render(<PomodoroPage />);

    const babyStepBtn = screen.getByRole("button", { name: /Baby Step/i });
    fireEvent.click(babyStepBtn);

    // Baby Step is 10 minutes
    expect(screen.getByText("10:00")).toBeInTheDocument();
  });

  test("can start and reset timer", () => {
    render(<PomodoroPage />);

    const startBtn = screen.getByTestId("play-icon").parentElement!;
    fireEvent.click(startBtn);

    // Should show pause icon now
    expect(screen.getByTestId("pause-icon")).toBeInTheDocument();

    const resetBtn = screen.getByTestId("reset-icon").parentElement!;
    fireEvent.click(resetBtn);

    // Should show play icon again
    expect(screen.getByTestId("play-icon")).toBeInTheDocument();
  });

  test("custom settings reflect on timer", () => {
    render(<PomodoroPage />);

    const focusInput = screen.getByLabelText(/Durasi Fokus/i);
    fireEvent.change(focusInput, { target: { value: "15" } });

    expect(screen.getByText("15:00")).toBeInTheDocument();
    expect(screen.getByText("Custom")).toHaveClass("border-[#C17A3A]");
  });
});
