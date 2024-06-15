import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import './UploadFile.css';

const UploadFile = () => {
    const [isUploading, setIsUploading] = useState(false);
    const [statusMessage, setStatusMessage] = useState('Перетащите видео сюда или нажмите, чтобы выбрать файл');

    const onDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];
        if (file) {
            uploadFile(file);
        }
    }, []);

    const uploadFile = async (file) => {
        setIsUploading(true);
        setStatusMessage('Видео загружается');
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://localhost:8080/split-video', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Файл успешно загружен:', response.data);
        } catch (error) {
            console.error('Ошибка при загрузке файла:', error);
            setStatusMessage('Ошибка при загрузке файла. Попробуйте снова.');
        } finally {
            setIsUploading(false);
        }
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: 'video/*',
        multiple: false
    });

    return (
        <div className="container">
            <h1 className="header">Сравнение с базой</h1>
            <div className="uploadBox" {...getRootProps()}>
                <input {...getInputProps()} />
                <p>{statusMessage}</p>
            </div>
            <button onClick={() => window.history.back()} className="backButton">Назад</button>
        </div>
    );
};

export default UploadFile;
