function isHTMLElement(element: Element): element is HTMLElement {
    return element instanceof HTMLElement;
}

function isFormControl(element: HTMLElement): element is HTMLFormElement {
    return 'validity' in element;
}

function isInvalid(control: HTMLElement) {
    return (
        isFormControl(control) && (control.validity.valid === false || control.getAttribute('aria-invalid') === 'true')
    );
}

export function getFirstInvalidControl(form: HTMLFormElement): HTMLElement | undefined {
    const elements = form.elements;
    const [firstInvalidControl] = Array.from(elements).filter(isHTMLElement).filter(isInvalid);
    return firstInvalidControl;
}
