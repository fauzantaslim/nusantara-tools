/**
 * Integration test for the Kesehatan (Health) page.
 *
 * Note: Next.js RSC (React Server Components) cannot be rendered by Jest/RTL directly.
 * We test the component in isolation by importing and rendering it synchronously.
 * All imports (next/link, lucide-react) are automocked by next/jest.
 */
import React from "react";
import { render, screen } from "@testing-library/react";

// Provide a minimal mock for next/link so RTL can render it
jest.mock("next/link", () => {
  const MockLink = ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>;
  MockLink.displayName = "MockLink";
  return MockLink;
});

// Dynamic import of the default export (RSC is treated as a sync component in test env)
import KesehatanIndex from "@/app/kesehatan/page";

describe("KesehatanIndex page — integration", () => {
  beforeEach(() => {
    render(<KesehatanIndex />);
  });

  it("renders the page heading", () => {
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Kesehatan & Kebugaran",
    );
  });

  it('renders the "Kategori" badge', () => {
    expect(screen.getByText("Kategori")).toBeInTheDocument();
  });

  it("renders at least one tool card", () => {
    expect(screen.getByText("Kalkulator BMI")).toBeInTheDocument();
  });

  it("renders all 12 tool cards", () => {
    // Each tool card has a "Buka Tool" label
    const labels = screen.getAllByText("Buka Tool");
    expect(labels).toHaveLength(12);
  });

  it('marks "Populer" badge on hot tools', () => {
    // 5 tools are marked hot: bmi, masa-subur, sleep, hpl, (and one more)
    const popularBadges = screen.getAllByText("Populer");
    expect(popularBadges.length).toBeGreaterThanOrEqual(1);
  });

  it("BMI card links to /kesehatan/bmi", () => {
    const bmiCard = screen.getByText("Kalkulator BMI").closest("a");
    expect(bmiCard).toHaveAttribute("href", "/kesehatan/bmi");
  });

  it("renders a back navigation link to /", () => {
    const links = screen.getAllByRole("link");
    const homeLink = links.find((l) => l.getAttribute("href") === "/");
    expect(homeLink).toBeInTheDocument();
  });
});
