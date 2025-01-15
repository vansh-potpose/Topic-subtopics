// components/Modal.js
'use client';

import { useEffect } from 'react';

const Modal = ({ modalVisible, modalType, formData, handleInputChange, addTopic, addSubtopic, saveQuestion, editSubtopic, closeModal }) => {
    useEffect(() => {
        if (!modalVisible) {
            // Reset form data when modal closes
        }
    }, [modalVisible]);

    return (
        modalVisible && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
                <div className="bg-gray-900 p-6 rounded shadow-lg w-96">
                    <h2 className="text-2xl font-semibold mb-4">{modalType === 'topic' ? 'Add New Topic' : modalType === 'subtopic' ? 'Add New Subtopic' : 'Add New Question'}</h2>
                    {modalType === 'topic' && (
                        <>
                            <input
                                type="text"
                                name="name"
                                placeholder="Topic Name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="w-full p-2 mb-2 bg-gray-800 text-white border border-gray-600 rounded"
                            />
                            <select
                                name="level"
                                value={formData.level}
                                onChange={handleInputChange}
                                className="w-full p-2 mb-2 bg-gray-800 text-white border border-gray-600 rounded"
                            >
                                <option value="">Select Difficulty Level</option>
                                {/* Map difficulty levels here */}
                            </select>
                            <button onClick={addTopic} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1 px-2 rounded transition-all duration-200">
                                Save Topic
                            </button>
                        </>
                    )}
                    {modalType === 'subtopic' && (
                        <>
                            <input
                                type="text"
                                name="subtopicName"
                                placeholder="Subtopic Name"
                                value={formData.subtopicName}
                                onChange={handleInputChange}
                                className="w-full p-2 mb-2 bg-gray-800 text-white border border-gray-600 rounded"
                            />
                            <button onClick={editSubtopic} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1 px-2 rounded transition-all duration-200">
                                Save Changes
                            </button>
                        </>
                    )}
                    {modalType === 'question' && (
                        <>
                            <input
                                type="text"
                                name="questionText"
                                placeholder="Question Text"
                                value={formData.questionText}
                                onChange={handleInputChange}
                                className="w-full p-2 mb-2 bg-gray-800 text-white border border-gray-600 rounded"
                            />
                            <input
                                type="text"
                                name="questionLink"
                                placeholder="Question Link"
                                value={formData.questionLink}
                                onChange={handleInputChange}
                                className="w-full p-2 mb-2 bg-gray-800 text-white border border-gray-600 rounded"
                            />
                            <button onClick={saveQuestion} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1 px-2 rounded transition-all duration-200">
                                Add Question
                            </button>
                        </>
                    )}
                    <button onClick={closeModal} className="ml-6 bg-red-600 hover:bg-red-700 text-white font-semibold py-1 px-2 rounded mt-2 transition-all duration-200">
                        Cancel
                    </button>
                </div>
            </div>
        )
    );
};

export default Modal;
