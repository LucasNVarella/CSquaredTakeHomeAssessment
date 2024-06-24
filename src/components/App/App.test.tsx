import { describe, expect, test, beforeAll, afterAll, jest, afterEach } from "@jest/globals";
import { render, screen, act, cleanup } from "@testing-library/react";
import { App } from "./App";

describe("App", () => {
    beforeAll(() => {
        jest.useFakeTimers();
        jest.setSystemTime(new Date("Jun 23, 2024"));
    });

    afterEach(cleanup);

    afterAll(() => {
        jest.useRealTimers();
    });

    test("app-container div exists and set up properly", () => {
        render(<App />);
        const app_container: HTMLDivElement | null = screen.queryByTestId("app-container");
        expect(app_container).not.toBeNull();
        expect(app_container!).toHaveClass("center");
        expect(app_container!).toBeInstanceOf(HTMLDivElement);
    });

    test("current day is highlighted gray at first", () => {
        render(<App />);
        const curDayDiv: HTMLDivElement | null = screen.queryByRole("option", { name: /June 23rd/i });
        expect(curDayDiv).toHaveClass("bubbleToday");
    });

    test("initially selected day bubble is green", () => {
        render(<App />);
        const selectedDayDiv: HTMLDivElement | null = screen.queryByRole("option", { name: /June 25th/i });
        expect(selectedDayDiv).toHaveClass("bubbleSelected");
    });

    test("when selected, a day bubble turns green, and the previous goes back to normal", () => {
        render(<App />);
        const dayToSelect: HTMLDivElement | null = screen.queryByRole("option", { name: /June 26th/i });
        const selectedDayDiv: HTMLDivElement | null = screen.queryByRole("option", { name: /June 25th/i });
        act(() => {
            dayToSelect!.click();
        });
        expect(selectedDayDiv).toHaveClass("bubbleNotSelected");
        expect(dayToSelect).toHaveClass("bubbleSelected");
    });

    test("when selected, today's bubble turns green. When another day is subsequently selected, it goes back to gray", () => {
        render(<App />);
        const dayToSelect: HTMLDivElement | null = screen.queryByRole("option", { name: /June 26th/i });
        const curDayDiv: HTMLDivElement | null = screen.queryByRole("option", { name: /June 23rd/i });
        act(() => {
            curDayDiv!.click();
        });
        expect(curDayDiv).toHaveClass("bubbleSelected");
        act(() => {
            dayToSelect!.click();
        });
        expect(curDayDiv).toHaveClass("bubbleToday");
    });

    test("a past day in the month is grayed-out and not selectable", () => {
        render(<App />);
        const selectedDayDiv: HTMLDivElement | null = screen.queryByRole("option", { name: /June 25th/i });
        const dayToSelect: HTMLDivElement | null = screen.queryByRole("option", { name: /June 16th/i });
        act(() => {
            dayToSelect!.click();
        });
        expect(dayToSelect).toHaveClass("bubblePastDay");
        expect(selectedDayDiv).toHaveClass("bubbleSelected");
    });
});
