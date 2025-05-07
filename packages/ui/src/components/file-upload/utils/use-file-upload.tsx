import React, { useEffect } from 'react';
import type { Upload, UploadRejection, UploadResponse, UploadResult } from '../types.js';

const useFileUpload = (url: string) => {
    const [uploaded, setUploaded] = React.useState<Upload[]>([]); //files passed to the dropzone
    const [errorMessages, setErrorMessages] = React.useState<string[]>([]); //error messages passed to the dropzone

    /**
     * Send files to the backend via POST request
     * @param files File[] - files to add
     * @returns { uploads: File[], rejections: FileRejection[] }
     */
    const addFiles = async (files: File[]) => {
        const uploadPromises: Promise<UploadResult>[] = files.map(async (file) => {
            const base64File = await new Promise<string>((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result as string);
                reader.onerror = (error) => reject(error);
            });

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ file: base64File.split(',')[1] }), // Remove the data URL prefix
            });

            const result = (await response.json()) as UploadResponse;
            return { file, success: response.status === 200, message: result.errorMessage };
        });

        const results = await Promise.allSettled(uploadPromises);
        console.log({ results });
        return results.map(
            (result) =>
                result.status === 'fulfilled'
                    ? result.value
                    : ({ file: result.reason.file, success: false, message: 'Upload error' } as UploadResult) //default message
        );
    };

    /**
     * Send files to the backend via DELETE request
     * @param files File[] - files to delete
     * @returns { uploads: File[], rejections: FileRejection[] }
     */
    const deleteFiles = async (uploads: Upload[]) => {
        const deletePromises: Promise<UploadResult>[] = uploads.map(async (upload) => {
            const response = await fetch(url, {
                method: 'DELETE',
                body: JSON.stringify({ id: upload.id }),
            });
            const result = (await response.json()) as UploadResponse;

            return { file: upload.file, success: response.status === 200, ...result };
        });
        const results = await Promise.allSettled(deletePromises);
        return results.map((result) =>
            result.status === 'fulfilled'
                ? result.value
                : ({ file: result.reason.file, success: false } as UploadResult)
        );
    };

    /**
     * Send delete request to the backend to remove the file, then remove it from the list
     * @param file File - file to remove
     * @param index number - index of the file in the list
     * @returns boolean - true if file was removed successfully
     */
    const handleRemove = async (file: File, index: number) => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
        await deleteFiles([uploaded?.[index]!]);
        setUploaded((prevFiles) => {
            const newFiles = [...prevFiles];
            newFiles.splice(index, 1);
            return newFiles;
        });
    };

    /**
     * Send POST request to the backend to add files, then add them to the list.
     * @param files File[] - files to add
     * @returns { uploads: File[], rejections: FileRejection[] }
     */
    const handleUpload = async (files: File[]) => {
        const results = await addFiles(files);

        const uploads: Upload[] = results.filter(({ success }) => success).map(({ file, id }) => ({ file, id }));

        //filtering out rejections and parsing into UploadRejection type to match the DropZone component
        const rejections: UploadRejection[] = results
            .filter(({ success }) => !success)
            .map(({ file, message }) => ({ file, errors: [{ code: 'upload-error', message: message || '' }] }));

        if (uploads.length > 0) {
            setUploaded((prev) => [...prev, ...uploads]);
        }

        if (rejections.length > 0) {
            //geting all nonempty error messages from rejections
            const messages = rejections
                .map(({ errors }) => errors?.filter(({ message }) => message).map(({ message }) => message))
                .flat();
            setErrorMessages((prev) => [...prev, ...messages]);
        }

        return { uploads, rejections };
    };

    useEffect(() => {
        const clearErrors = setTimeout(() => {
            setErrorMessages([]);
        }, 150000);

        if (errorMessages.length > 0) {
            clearTimeout(clearErrors);
        }
    }, [errorMessages]);

    return {
        files: uploaded.map(({ file }) => file),
        errorMessages,
        setErrorMessages,
        remove: handleRemove,
        upload: handleUpload,
    };
};

export { useFileUpload };
