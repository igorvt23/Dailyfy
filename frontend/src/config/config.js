
// ACTIVE LANGUAGE
export let activeLang = 'pt';

// DEFAULT CALENDAR SET
export let defaultCalendarSet = 'M';
const availableCalendarSets = ['T', 'W', 'M', 'Y'];
const defaultCalendarSetListeners = [];

export let numberOfCategoriesAlreadyAnswered = 0;

// DEFAULT CALENDAR COLOR
export let defaultCalendarColor = 'D';

export function setDefaultCalendarSet(nextCalendarSet) {
    if (!availableCalendarSets.includes(nextCalendarSet)) {
        return;
    }

    if (defaultCalendarSet === nextCalendarSet) {
        return;
    }

    defaultCalendarSet = nextCalendarSet;
    defaultCalendarSetListeners.forEach((listener) => listener(defaultCalendarSet));
}

export function subscribeToDefaultCalendarSet(listener) {
    if (typeof listener !== 'function') {
        return () => {};
    }

    defaultCalendarSetListeners.push(listener);

    return () => {
        const listenerIndex = defaultCalendarSetListeners.indexOf(listener);
        if (listenerIndex >= 0) {
            defaultCalendarSetListeners.splice(listenerIndex, 1);
        }
    };
}
