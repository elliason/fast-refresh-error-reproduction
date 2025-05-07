'use client';

import { ArrayField, type ArrayFieldRenderProps } from '#components/array-field';
import { FieldDescription } from './client/field/description.js';
import { Field } from './client/field/field.js';
import { useFormContainerContext } from './client/field/form-container-context.js';
import { FormContainerField } from './client/field/form-container-field.js';
import { FieldLabel } from './client/field/label.js';
import { FieldMessage } from './client/field/message.js';
import { FieldValidityState } from './client/field/validity-state.js';
import { FormControlled } from './client/form-controlled.js';
import { Form } from './client/form.js';
import { FieldAutocompleteInput } from './client/inputs/autocomplete-input.js';
import { FieldAutocompleteMultiSelect } from './client/inputs/autocomplete-multi-select.js';
import { FieldAutocompleteSelect } from './client/inputs/autocomplete-select.js';
import { CheckboxGroupItem, FieldCheckboxGroup } from './client/inputs/checkbox-group.js';
import { FieldCheckbox } from './client/inputs/checkbox.js';
import DatePickerField from './client/inputs/date-picker.js';
import DateTimePickerField from './client/inputs/date-time-picker.js';
import { DateTimeControlledInput } from './client/inputs/date-time/date-time-controlled-input.js';
import { DateControlledInput } from './client/inputs/date/date-controlled-input.js';
import {
    FieldDropArea,
    FieldDropedFilesDashboard,
    FieldDropZone,
    FieldErrorMessages,
} from './client/inputs/drop-zone.js';
import {
    FieldFileUpload,
    FieldFileUploadDropArea,
    FieldFileUploadDropedFilesDashboard,
    FieldFileUploadErrorMessages,
} from './client/inputs/file-upload.js';
import { FlexibleInputField } from './client/inputs/flexible-input-field.js';
import { InputControl } from './client/inputs/input-control.js';
import { FieldInput } from './client/inputs/input.js';
import {
    FieldMultiSelect,
    FieldMultiSelectContent,
    FieldMultiSelectInput,
    FieldMultiSelectItem,
    FieldMultiSelectList,
    FieldMultiSelectTrigger,
} from './client/inputs/multi-select.js';
import { FieldRadioButton, FieldRadioGroup, FieldRadioItem, FieldRadioLabel } from './client/inputs/radio-group.js';
import {
    FieldSelect,
    FieldSelectContent,
    FieldSelectItem,
    FieldSelectTrigger,
    FieldSelectValue,
} from './client/inputs/select.js';
import { FieldSwitch } from './client/inputs/switch.js';
import { TextareaField } from './client/inputs/textarea.js';
import TimePickerField from './client/inputs/time-picker.js';
import { FieldToggleGroup, ToggleGroupItem } from './client/inputs/toggle-group.js';
import { FieldToggle } from './client/inputs/toggle.js';
import type { FormServerState } from './server/schema/form-server-state.js';

export {
    FormControlled,
    Form,
    Field,
    FieldLabel as Label,
    FieldMessage as Message,
    FieldDescription as Description,
    FieldValidityState as ValidityState,
    InputControl as Control,
    FieldInput as Input,
    FieldSelect as Select,
    FieldAutocompleteSelect as AutocompleteSelect,
    FieldSelectContent as SelectContent,
    FieldSelectTrigger as SelectTrigger,
    FieldSelectValue as SelectValue,
    FieldSelectItem as SelectItem,
    FieldCheckbox as Checkbox,
    FieldRadioGroup as RadioGroup,
    FieldRadioItem as RadioItem,
    FieldRadioLabel as RadioLabel,
    FieldRadioButton as RadioButton,
    type FormServerState,
    FieldSwitch as Switch,
    FieldMultiSelect as MultiSelect,
    FieldAutocompleteMultiSelect as AutocompleteMultiSelect,
    FieldMultiSelectTrigger as MultiSelectTrigger,
    FieldMultiSelectContent as MultiSelectContent,
    FieldMultiSelectList as MultiSelectList,
    FieldMultiSelectItem as MultiSelectItem,
    FieldMultiSelectInput as MultiSelectInput,
    FieldAutocompleteInput as AutocompleteInput,
    FieldToggle as Toggle,
    ToggleGroupItem,
    FieldToggleGroup as ToggleGroup,
    TextareaField as Textarea,
    FlexibleInputField as FlexibleInput,
    ArrayField,
    type ArrayFieldRenderProps,
    TimePickerField as TimePicker,
    DatePickerField as DatePicker,
    DateTimePickerField as DateTimePicker,
    DateTimeControlledInput,
    DateControlledInput,
    FormContainerField as FormContainer,
    useFormContainerContext,
    FieldFileUploadDropArea as FileUploadDropArea,
    FieldFileUploadDropedFilesDashboard as FileUploadFilesDashboard,
    FieldFileUploadErrorMessages as FileUploadErrorMessages,
    FieldFileUpload as FileUpload,
    FieldDropArea as DropArea,
    FieldDropedFilesDashboard as DropedFilesDashboard,
    FieldDropZone as DropZone,
    FieldErrorMessages as ErrorMessages,
    FieldCheckboxGroup as CheckboxGroup,
    CheckboxGroupItem,
};
