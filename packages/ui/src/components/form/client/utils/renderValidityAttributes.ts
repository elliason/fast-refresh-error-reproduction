export const renderValidityAttributes = ({
    isValid,

    isSubmitted,
}: {
    isValid: boolean | undefined;
    isSubmitted: boolean;
}) => {
    return {
        'data-valid': isValid,
        'data-invalid': !isValid,
        'aria-invalid': isSubmitted && !isValid ? true : undefined, // When aria-invalid is used in conjunction with the aria-required attribute, aria-invalid should not be set to true before the form is submitted - only in response to validation.
    };
};
