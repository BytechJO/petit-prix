// src/components/InteractivePage.js

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import './interactive.css'; // يمكنك إبقاء الأنماط العامة هنا

const InteractivePage = ({ items, foundItems, recentlyFound, onItemClick, iconStyles }) => {
    return (
        <div className="interactive-container">
            {/* المناطق القابلة للنقر (لا تغيير هنا) */}
            {items.map(item => (
                <div
                    key={item.index}
                    className="clickable-area"
                    style={{ top: item.top, left: item.left, width: item.width, height: item.height }}
                    onClick={() => onItemClick(item.index)}
                    aria-label={item['aria-label']}
                >
                    {foundItems[item.index] && (
                        <img
                            src={item.image}
                            alt={item["aria-label"]}
                            className={`item-image ${recentlyFound === item.index ? "animate-pop" : ""
                                }`}
                        />
                    )}

                </div>
            ))}

            {/* أيقونات الصح الخضراء (مع التعديل) */}
            <div className="feedback-icons">
                {items.map(item => {
                    const { index } = item;
                    const isFound = foundItems[index];

                    if (isFound) {
                        const isRecent = recentlyFound === index;
                        const iconClassName = `check-icon ${isRecent ? 'recent' : ''}`;

                        // احصل على التنسيق المخصص من الـ prop الجديدة
                        const customStyle = iconStyles && iconStyles[index] ? iconStyles[index] : {};

                        return (
                            <div
                                key={index}
                                className={`icon-container`} // لا حاجة لـ icon-${index} إذا كنا نستخدم style
                                style={customStyle} // تطبيق التنسيق المخصص هنا
                            >
                                <FontAwesomeIcon icon={faCheckCircle} className={iconClassName} />
                            </div>
                        );
                    }
                    return null;
                })}
            </div>
        </div>
    );
};

export default InteractivePage;
