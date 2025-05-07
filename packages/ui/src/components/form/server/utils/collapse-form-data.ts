import { type FieldValues } from 'react-hook-form';

/**
 * Traverse FormData input and collapse it into a multilevel object
 * converting dot notation into nested objects.
 * { 'a.b': 'c' } => { a: { b: 'c' } }
 */
export function collapseFormData(formData: FormData): FieldValues {
    const result: FieldValues = {};

    for (const [key, value] of formData) {
        const keys = key.split('.');
        let currentLevel = result;

        // Iterate through all but the last item in keys array to build the structure
        keys.slice(0, -1).forEach((k, index) => {
            if (!currentLevel[k]) {
                currentLevel[k] = {};
            }
            currentLevel = currentLevel[k];
        });

        // Set the value at the last key
        currentLevel[keys[keys.length - 1]!] = value;
    }

    return result;
}
