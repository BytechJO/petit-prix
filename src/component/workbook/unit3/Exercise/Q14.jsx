import React, { useState, useRef } from 'react';
import { Download } from 'lucide-react';
import './Q9.css';
import domtoimage from 'dom-to-image';

const Q14 = () => {
    const [formData, setFormData] = useState({
        name: '',
        city: '',
        age: '',
        like: '',
        dislike: '',
        comment: '',
        siblings: '',
    });
    const letterRef = useRef(null);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleReset = () => {
        setFormData({
            name: '',
            city: '',
            age: '',
            like: '',
            dislike: '',
            comment: '',
            siblings: '',
        });
    };

    const handleDownload = () => {
        if (!letterRef.current) return;

        domtoimage.toPng(letterRef.current)
            .then((dataUrl) => {
                const link = document.createElement('a');
                link.href = dataUrl;
                link.download = 'letter.png';
                link.click();
            })
            .catch(err => console.error(err));
    };


    return (
        <div className="q9-wrapper">
            <div className="q9-letter" ref={letterRef}>

                <p className="q9-text">
                    a) Mon père s’appelle{' '}
                    <input
                        className="q9-input"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    .
                </p>

                <p className="q9-text">
                    b) Ma mère s’appelle{' '}
                    <input
                        className="q9-input q9-input-small"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                    />
                    .
                </p>

                <p className="q9-text">
                    c) Mon frère s’appelle{' '}
                    <input
                        className="q9-input"
                        name="comment"
                        value={formData.comment}
                        onChange={handleChange}
                    />
                    .
                </p>

                <p className="q9-text">
                    d) Ma soeur s’appelle{' '}
                    <input
                        className="q9-input"
                        name="comment"
                        value={formData.comment}
                        onChange={handleChange}
                    />
                    .
                </p>

            </div>
            <div className="popup-buttons shrink-0">
                <button className="try-again-button" onClick={handleReset}>
                    Recommencer
                </button>
                <button
                    onClick={handleDownload}
                    className="bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-colors cursor-pointer p-1 flex items-center justify-center"
                >
                    <Download size={20} />

                </button>
            </div>
        </div>
    );
};

export default Q14;
