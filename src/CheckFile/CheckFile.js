import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import './CheckFile.css';

const CheckFile = ({ goBack }) => {
    const [isChecking, setIsChecking] = useState(false);
    const [statusMessage, setStatusMessage] = useState('Перетащите видео сюда или нажмите, чтобы выбрать файл');
    const [resultMessage, setResultMessage] = useState('');
    const [showDetailsButton, setShowDetailsButton] = useState(false);

    const onDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];
        if (file) {
            checkFile(file);
        }
    }, []);

    const checkFile = async (file) => {
        setIsChecking(true);
        setStatusMessage('Идет сравнение с лицензионной базой');
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://localhost:8080/check-video', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Результат проверки:', response.data);
            if (response.data.matches) {
                setResultMessage('Найдены совпадения');
                setShowDetailsButton(true);
            } else {
                setResultMessage('Совпадения не найдены');
                setShowDetailsButton(false);
            }
        } catch (error) {
            console.error('Ошибка при проверке файла:', error);
            setResultMessage('Ошибка при проверке файла. Попробуйте снова.');
        } finally {
            setIsChecking(false);
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
                <p>{isChecking ? statusMessage : resultMessage}</p>
                {showDetailsButton && <button className="detailsButton">Подробнее</button>}
            </div>
            <button onClick={goBack} className="backButton">Назад</button>
        </div>
    );
};

export default CheckFile;
