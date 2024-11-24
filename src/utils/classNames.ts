export const classNames = (...classes: Array<string | undefined>): string => {
    return classes.filter(Boolean).join(' ')
};