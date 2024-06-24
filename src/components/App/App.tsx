import { useState } from "react";
import type { MouseEventHandler, ReactElement } from "react";
import DatePicker from "react-datepicker";
import { CalendarBubbleClasses } from "~/config/constants";

// Type def for rendering a custom header with DatePicker. Need a custom header to display abbreviated month
// names in the header (DatePicker displays the full name by default).
type CustomHeaderRendererParams = {
    monthDate: Date;
    customHeaderCount: number;
    decreaseMonth: MouseEventHandler<HTMLButtonElement>;
    increaseMonth: MouseEventHandler<HTMLButtonElement>;
    prevMonthButtonDisabled: boolean;
    nextMonthButtonDisabled: boolean;
};

export function App(): ReactElement {
    const twoDaysFromNow = new Date(); // Default initial selection
    twoDaysFromNow.setHours(0, 0, 0, 0); // Set to midnight
    twoDaysFromNow.setDate(twoDaysFromNow.getDate() + 2);
    const [selectedDate, setSelectedDate] = useState(twoDaysFromNow);
    const curMonth = new Date();
    curMonth.setDate(1); // Set to first day of month
    curMonth.setHours(0, 0, 0, 0); // Set to midnight
    // We keep track of this to ensure we only display days from the currently displayed month.
    // DatePicker displays days from the previous/subsequent month by default.
    const [displayedMonth, setDisplayedMonth] = useState(curMonth);

    /**
     * Determine the correct CSS class to apply to a particular Day div/bubble based on the date it
     * represents. This function is called by the DatePicker for each Day bubble prior to their render.
     *
     * The currently selected bubble should have the bubbleSelected class, which takes priority
     * over all other class selections. The bubble representing the current date, if not selected should have
     * the bubbleToday class. Any bubble representing a past day in the current month should have the
     * bubblePastDay class (and never the bubbleSelected class). Bubbles representing future days in the
     * currently displayed month (which are not selected) should have the bubbleNotSelected class. Lastly,
     * bubbles representing days outside the currently displayed month should not be shown, and thus are given
     * the bubbleDisabled class.
     *
     * We use the bubbleDisabled class on days not belonging to the currently displayed month because DatePicker
     * doesn't provide an official means to prevent future/past month days from displaying on the current month.
     *
     * @param date The date represented by the current bubble. From DatePicker
     * @returns the class name that should be applied to the current bubble
     */
    function determineDayClass(date: Date): string {
        const curDate = new Date();
        curDate.setHours(0, 0, 0, 0); // Set to midnight
        const nextDay = new Date(curDate);
        nextDay.setDate(curDate.getDate() + 1); // Date class handles overflow (ex.: 31+1 = next month)
        if (date < displayedMonth) {
            // Don't display days that don't belong in the currently displayed month
            return CalendarBubbleClasses.DISABLED;
        } else if (date < curDate) {
            return CalendarBubbleClasses.PASTDAY;
        } else if (date < nextDay) {
            // today
            if (date.getTime() === selectedDate.getTime()) {
                // it's the one we selected
                return CalendarBubbleClasses.SELECTED;
            }
            return CalendarBubbleClasses.TODAY;
        } else if (date >= nextDay) {
            const nextMonth = new Date(displayedMonth);
            nextMonth.setMonth(displayedMonth.getMonth() + 1); // Date class handles overflow
            if (date >= nextMonth) {
                return CalendarBubbleClasses.DISABLED;
            } else if (date.getTime() === selectedDate.getTime()) {
                return CalendarBubbleClasses.SELECTED;
            }
            return CalendarBubbleClasses.NOTSELECTED;
        }
        return CalendarBubbleClasses.NOTSELECTED;
    }

    /**
     * Prevent days outside the currently displayed month from showing. This function is called by the
     * DatePicker for each Day bubble prior to their render.
     *
     * We are removing all content from a day bubble that shouldn't show in an attempt to prevent the user
     * from clicking on it. This is still a workaround, as the day bubble still technically exists, though
     * it is unlikely any user will click on it by accident since its size is too small without content.
     *
     * @param day The number of the month that would normally display on the current day bubble. From DatePicker
     * @param date The date represented by the current bubble. From DatePicker
     * @returns either the day of the month that the bubble should display (as a number type), or null.
     */
    function determineDayContents(day: number, date: Date): number | null {
        if (date.getMonth() !== displayedMonth.getMonth()) {
            return null; // Do not display days outside of the currently displayed month
        }
        return day;
    }

    /**
     * Callback handler for when the currently displayed month changes on the calendar. This function is
     * called by DatePicker to tell us when the user clicks one of the two arrows on the header. We keep track
     * of the currently displayed month to ensure days outside the currently displayed month are not shown.
     *
     * @param month Date object representing the currently selected month in the DatePicker.
     */
    function handleMonthChange(month: Date): void {
        const monthToDisplay = new Date(month);
        monthToDisplay.setDate(1); // Set to first day of month
        monthToDisplay.setHours(0, 0, 0, 0); // Set to midnight
        setDisplayedMonth(monthToDisplay);
    }

    /**
     * Date change handler for the DatePicker. Called by the DatePicker when the user selects a different date
     * than was previously selected. Aside from just updating the state, this handler also ensures the user
     * cannot select a date that doesn't belong to the current month by accident. See determineDayClass,
     * determineDayContents, and handleMonthChange above for more info.
     *
     * @param date Date obj representing the user's latest selection in the DatePicker.
     */
    function onChangeHandler(date: Date | null): void {
        let dateToSet: Date;
        if (date === null) {
            // Have to check for null since DatePicker's 'selected' type is Date | null
            dateToSet = new Date();
        } else {
            const nextMonth = new Date(displayedMonth);
            nextMonth.setMonth(displayedMonth.getMonth() + 1); // Date class handles overflow
            if (date < displayedMonth || date >= nextMonth) {
                // Can't select a date that doesn't belong to the currently displayed month
                dateToSet = selectedDate;
            } else {
                dateToSet = date;
            }
        }
        dateToSet.setHours(0, 0, 0, 0); // Set to midnight
        setSelectedDate(dateToSet);
    }

    /**
     * Renders a custom header for the DatePicker with the shorthand for the month. DatePicker displays full
     * month names by default.
     *
     * @param params object containing parametes from DatePicker to help us build a custom header. See the
     * CustomHeaderRendererParams type above.
     * @returns a custom header completely resembling the default header, but with a shorthand month.
     */
    function renderCustomHeader(params: CustomHeaderRendererParams): ReactElement {
        return (
            <div>
                {params.prevMonthButtonDisabled ? null : (
                    <button
                        className="react-datepicker__navigation react-datepicker__navigation--previous"
                        onClick={params.decreaseMonth}
                    >
                        <span className="react-datepicker__navigation-icon react-datepicker__navigation-icon--previous">
                            {"<"}
                        </span>
                    </button>
                )}
                <span className="react-datepicker__current-month" data-testid="month-header">
                    {params.monthDate.toLocaleString("en-US", { month: "short", year: "numeric" })}{" "}
                    {/* Shorten month name on the header */}
                </span>
                {params.nextMonthButtonDisabled ? null : (
                    <button
                        className="react-datepicker__navigation react-datepicker__navigation--next"
                        onClick={params.increaseMonth}
                    >
                        <span className="react-datepicker__navigation-icon react-datepicker__navigation-icon--next">
                            {">"}
                        </span>
                    </button>
                )}
            </div>
        );
    }

    return (
        <div className="center" data-testid="app-container">
            <DatePicker
                selected={selectedDate}
                onChange={onChangeHandler}
                dayClassName={determineDayClass}
                renderDayContents={determineDayContents}
                minDate={new Date()}
                onMonthChange={handleMonthChange}
                renderCustomHeader={renderCustomHeader}
                inline={true}
            />
        </div>
    );
}
