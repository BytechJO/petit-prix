import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";

import ValidationAlert from "../../../Popup/ValidationAlert";
import { validate } from "uuid";

const Q3 = () => {
    const treeRef = useRef(null);

    const [members, setMembers] = useState({
        grandparents: [
            { id: 1, name: "", relation: "Grand-père", gender: "male" },
            { id: 2, name: "", relation: "Grand-mère", gender: "female" },
            { id: 3, name: "", relation: "Grand-père", gender: "male" },
            { id: 4, name: "", relation: "Grand-mère", gender: "female" },
        ],
        parents: [
            { id: 5, name: "", relation: "Père", gender: "male" },
            { id: 6, name: "", relation: "Mère", gender: "female" },
        ],
        me: { id: 7, name: "", relation: "Moi", gender: "male" },
        siblings: [],
    });

    const [alertMessage, setAlertMessage] = useState("");
    const [isDownloading, setIsDownloading] = useState(false);

    const handleNameChange = (category, id, value) => {
        if (category === "me") {
            setMembers((prev) => ({
                ...prev,
                me: { ...prev.me, name: value },
            }));
        } else {
            setMembers((prev) => ({
                ...prev,
                [category]: prev[category].map((m) =>
                    m.id === id ? { ...m, name: value } : m
                ),
            }));
        }
    };

    const addSibling = () => {
        const newId = Math.max(...members.siblings.map((s) => s.id), 7) + 1;
        setMembers((prev) => ({
            ...prev,
            siblings: [
                ...prev.siblings,
                { id: newId, name: "", relation: "Frère/Sœur", gender: "male" },
            ],
        }));
    };

    const removeSibling = (id) => {
        setMembers((prev) => ({
            ...prev,
            siblings: prev.siblings.filter((s) => s.id !== id),
        }));
    };

    const changeSiblingGender = (id) => {
        setMembers((prev) => ({
            ...prev,
            siblings: prev.siblings.map((s) =>
                s.id === id
                    ? {
                        ...s,
                        gender: s.gender === "male" ? "female" : "male",
                        relation: s.gender === "male" ? "Sœur" : "Frère",
                    }
                    : s
            ),
        }));
    };

    const handleDownload = async () => {
        const allMembers = [
            ...members.grandparents,
            ...members.parents,
            members.me,
            ...members.siblings,
        ];

        const emptyFields = allMembers.filter((m) => !m.name.trim());

        if (emptyFields.length > 0) {
            ValidationAlert.warning();
            return;
        }

        setIsDownloading(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 100));

            const hideElements = document.querySelectorAll('.download-hide');
            hideElements.forEach(el => {
                el.style.visibility = 'hidden';
            });

            if (!treeRef.current) {
                throw new Error("Element not found");
            }

            const canvas = await html2canvas(treeRef.current, {
                backgroundColor: '#ecfdf5',
                scale: 2,
                logging: false,
                useCORS: true,
                allowTaint: true,
            });

            hideElements.forEach(el => {
                el.style.visibility = 'visible';
            });

            const link = document.createElement('a');
            link.download = `mon-arbre-genealogique-${Date.now()}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();

            // ValidationAlert.success("Arbre téléchargé avec succès!");
        } catch (error) {
            console.error('Erreur détaillée:', error);
            ValidationAlert.error(`Erreur: ${error.message || 'Problème lors du téléchargement'}`);

            const hideElements = document.querySelectorAll('.download-hide');
            hideElements.forEach(el => {
                el.style.visibility = 'visible';
            });
        } finally {
            setIsDownloading(false);
        }
    };

    const resetTree = () => {
        setMembers({
            grandparents: [
                { id: 1, name: "", relation: "Grand-père", gender: "male" },
                { id: 2, name: "", relation: "Grand-mère", gender: "female" },
                { id: 3, name: "", relation: "Grand-père", gender: "male" },
                { id: 4, name: "", relation: "Grand-mère", gender: "female" },
            ],
            parents: [
                { id: 5, name: "", relation: "Père", gender: "male" },
                { id: 6, name: "", relation: "Mère", gender: "female" },
            ],
            me: { id: 7, name: "", relation: "Moi", gender: "male" },
            siblings: [],
        });
    };

    const inputStyle = {
        width: '100%',
        padding: '8px',
        borderRadius: '4px',
        border: '2px solid #d1d5db',
        outline: 'none',
        textAlign: 'center',
        fontFamily: 'Consolas, Monaco, "Courier New", monospace'
    };


    return (
        <div style={{ minHeight: '100vh', padding: '32px' }}>
            <div style={{ maxWidth: '1280px', margin: '0 auto' }} ref={treeRef}>
                <h1 style={{ fontSize: '36px', fontWeight: 'bold', textAlign: 'center', marginBottom: '32px', color: '#15803d' }}>
                    🌳 Mon Arbre Généalogique 🌳
                </h1>

                {/* Grands-parents */}
                <div style={{ marginBottom: '48px' }}>
                    <h2 style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'center', marginBottom: '24px', color: '#2563eb' }}>
                        Mes Grands-parents
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
                        {members.grandparents.map((gp, idx) => (
                            <div key={gp.id} style={{ position: 'relative' }}>
                                <div style={{
                                    padding: '16px',
                                    borderRadius: '8px',
                                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                                    backgroundColor: gp.gender === "male" ? "#dbeafe" : "#fce7f3"
                                }}>
                                    <div style={{ fontSize: '36px', textAlign: 'center', marginBottom: '8px' }}>
                                        {gp.gender === "male" ? "👴" : "👵"}
                                    </div>
                                    <p style={{ fontSize: '12px', textAlign: 'center', fontWeight: '600', marginBottom: '8px' }}>
                                        {gp.relation}
                                    </p>
                                    <input
                                        type="text"
                                        value={gp.name}
                                        onChange={(e) => handleNameChange("grandparents", gp.id, e.target.value)}
                                        placeholder="Nom"
                                        style={inputStyle}
                                    />
                                </div>
                                <div style={{
                                    position: 'absolute',
                                    bottom: '0',
                                    left: '50%',
                                    width: '2px',
                                    height: '32px',
                                    backgroundColor: '#16a34a',
                                    transform: 'translateY(100%)'
                                }}></div>
                            </div>
                        ))}
                    </div>

                    <div style={{ position: 'relative', height: '32px' }}>
                        <div style={{
                            position: 'absolute',
                            top: '0',
                            left: '12.5%',
                            right: '12.5%',
                            height: '2px',
                            backgroundColor: '#16a34a'
                        }}></div>
                    </div>
                </div>

                {/* الوالدين */}
                <div style={{ marginBottom: '48px' }}>
                    <h2 style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'center', marginBottom: '24px', color: '#9333ea' }}>
                        Mes Parents
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '32px', maxWidth: '768px', margin: '0 auto' }}>
                        {members.parents.map((parent) => (
                            <div key={parent.id} style={{ position: 'relative' }}>
                                <div style={{
                                    padding: '24px',
                                    borderRadius: '8px',
                                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                                    backgroundColor: parent.gender === "male" ? "#bfdbfe" : "#fbcfe8"
                                }}>
                                    <div style={{ fontSize: '48px', textAlign: 'center', marginBottom: '12px' }}>
                                        {parent.gender === "male" ? "👨" : "👩"}
                                    </div>
                                    <p style={{ fontSize: '14px', textAlign: 'center', fontWeight: 'bold', marginBottom: '12px' }}>
                                        {parent.relation}
                                    </p>
                                    <input
                                        type="text"
                                        value={parent.name}
                                        onChange={(e) => handleNameChange("parents", parent.id, e.target.value)}
                                        placeholder="Nom"
                                        style={inputStyle}
                                    />
                                </div>
                                <div style={{
                                    position: 'absolute',
                                    bottom: '0',
                                    left: '50%',
                                    width: '2px',
                                    height: '32px',
                                    backgroundColor: '#16a34a',
                                    transform: 'translateY(100%)'
                                }}></div>
                            </div>
                        ))}
                    </div>

                    <div style={{ position: 'relative', height: '32px' }}>
                        <div style={{
                            position: 'absolute',
                            top: '0',
                            left: '25%',
                            right: '25%',
                            height: '2px',
                            backgroundColor: '#16a34a'
                        }}></div>
                    </div>
                </div>

                {/* أنا وإخوتي */}
                <div style={{ marginBottom: '32px' }}>
                    <h2 style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'center', marginBottom: '24px', color: '#ea580c' }}>
                        Moi et Mes Frères/Sœurs
                    </h2>
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '24px' }}>
                        {/* أنا */}
                        <div style={{ position: 'relative' }}>
                            <div style={{
                                padding: '24px',
                                borderRadius: '8px',
                                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                                backgroundColor: '#fef3c7',
                                border: '4px solid #eab308'
                            }}>
                                <div style={{ fontSize: '48px', textAlign: 'center', marginBottom: '12px' }}>🧑</div>
                                <p style={{ fontSize: '14px', textAlign: 'center', fontWeight: 'bold', marginBottom: '12px' }}>
                                    {members.me.relation}
                                </p>
                                <input
                                    type="text"
                                    value={members.me.name}
                                    onChange={(e) => handleNameChange("me", null, e.target.value)}
                                    placeholder="Mon nom"
                                    style={inputStyle}
                                />
                            </div>
                            <div style={{
                                position: 'absolute',
                                top: '0',
                                left: '50%',
                                width: '2px',
                                height: '32px',
                                backgroundColor: '#16a34a',
                                transform: 'translateY(-100%)'
                            }}></div>
                        </div>

                        {/* الإخوة */}
                        {members.siblings.map((sibling) => (
                            <div key={sibling.id} style={{ position: 'relative' }}>
                                <div style={{
                                    padding: '24px',
                                    borderRadius: '8px',
                                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                                    backgroundColor: sibling.gender === "male" ? "#dbeafe" : "#fce7f3"
                                }}>
                                    <button
                                        onClick={() => removeSibling(sibling.id)}
                                        className="download-hide"
                                        style={{
                                            position: 'absolute',
                                            top: '4px',
                                            right: '4px',
                                            width: '24px',
                                            height: '24px',
                                            backgroundColor: '#ef4444',
                                            color: 'white',
                                            borderRadius: '50%',
                                            fontSize: '12px',
                                            border: 'none',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        ✕
                                    </button>
                                    <button
                                        onClick={() => changeSiblingGender(sibling.id)}
                                        className="download-hide"
                                        title="Changer le genre"
                                        style={{
                                            position: 'absolute',
                                            top: '4px',
                                            left: '4px',
                                            width: '24px',
                                            height: '24px',
                                            backgroundColor: '#6b7280',
                                            color: 'white',
                                            borderRadius: '50%',
                                            fontSize: '12px',
                                            border: 'none',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        ⚧
                                    </button>
                                    <div style={{ fontSize: '48px', textAlign: 'center', marginBottom: '12px' }}>
                                        {sibling.gender === "male" ? "👦" : "👧"}
                                    </div>
                                    <p style={{ fontSize: '14px', textAlign: 'center', fontWeight: 'bold', marginBottom: '12px' }}>
                                        {sibling.relation}
                                    </p>
                                    <input
                                        type="text"
                                        value={sibling.name}
                                        onChange={(e) => handleNameChange("siblings", sibling.id, e.target.value)}
                                        placeholder="Nom"
                                        style={inputStyle}
                                    />
                                </div>
                                <div style={{
                                    position: 'absolute',
                                    top: '0',
                                    left: '50%',
                                    width: '2px',
                                    height: '32px',
                                    backgroundColor: '#16a34a',
                                    transform: 'translateY(-100%)'
                                }}></div>
                            </div>
                        ))}

                        {/* زر إضافة أخ/أخت */}
                        <button
                            onClick={addSibling}
                            className="download-hide"
                            style={{
                                padding: '24px',
                                borderRadius: '8px',
                                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                                backgroundColor: '#bbf7d0',
                                border: '2px dashed #22c55e',
                                cursor: 'pointer'
                            }}
                        >
                            <div style={{ fontSize: '48px', textAlign: 'center', marginBottom: '12px' }}>➕</div>
                            <p style={{ fontSize: '14px', textAlign: 'center', fontWeight: 'bold' }}>
                                Ajouter frère/sœur
                            </p>
                        </button>
                    </div>
                </div>

                <div className="popup-buttons">
                    <button className="try-again-button" onClick={resetTree}>
                        Recommencer ↻
                    </button>
                    <button
                        className="check-button2 flex items-center justify-center"
                        onClick={handleDownload}
                        disabled={isDownloading}
                    >
                        {isDownloading ? (
                            <span className="animate-pulse text-lg">⏳</span>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-download"
                            >
                                <path d="M12 15V3" />
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                <path d="m7 10 5 5 5-5" />
                            </svg>
                        )}
                    </button>

                </div>
            </div>
        </div>
    );
};

export default Q3;