# Issues & Roadmap

## Active Features

- [ ] **Pomodoro Timer with Notifications & Custom Focus Levels**
  - **Title**: Advanced Pomodoro Timer
  - **Description**: Implement a robust and customizable Pomodoro Timer within the "Produktivitas" category.
  - **User Stories & Acceptance Criteria**:
    - [x] Focus Level Presets (Baby Step, Popular, Medium, Extended, Custom)
    - [x] Custom Mode for manual duration setting
    - [x] Notification System (Browser, UI alert, Sound)
    - [x] Alarm Functionality (Sound toggle, volume)
    - [x] Timer Behavior (Start, Pause, Resume, Reset, Auto-switch)
    - [x] Session Flow (Focus -> Break -> Long Break after cycles)
    - [x] Progress Tracking (Daily count)
    - [x] Persistence (localStorage for settings and count)
    - [x] UI following brand guidelines (Kunyit Emas) and sleep cycle layout pattern.
    - [x] **Pomodoro Test Implementation**
      - [x] Unit tests for `utils.ts` (formatting, labels, colors)
      - [x] Unit tests for `usePomodoro.ts` (timer logic, transitions, persistence)
      - [x] Integration tests for `PomodoroPage.tsx` (interactions and layout)
  - **Branch**: `/feat/pomodoro`
