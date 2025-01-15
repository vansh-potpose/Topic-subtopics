'use client';
import { fetchTopics, resetTopic } from '@/actions/useractions';
import { useEffect, useState } from 'react';

const difficultyLevels = ['Beginner Level', 'Intermediate Level', 'Advanced Level', 'Expert Level'];

export default function Home() {
    const [topics, setTopics] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalType, setModalType] = useState('');
    const [formData, setFormData] = useState({ name: '', level: '', subtopicName: '', questionText: '', questionLink: '' });
    const [currentTopicIndex, setCurrentTopicIndex] = useState(null);
    const [currentSubtopicIndex, setCurrentSubtopicIndex] = useState(null);
    const [editQuestionIndex, setEditQuestionIndex] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        let t = await fetchTopics();
        setTopics(t);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const openModal = (type, topicIndex = null, subIndex = null, questionIndex = null) => {
        setModalType(type);
        setCurrentTopicIndex(topicIndex);
        setCurrentSubtopicIndex(subIndex);
        setEditQuestionIndex(questionIndex);
        
        if (type === 'question' && questionIndex !== null) {
            const question = topics[topicIndex].subtopics[subIndex].questions[questionIndex];
            setFormData({ questionText: question.text, questionLink: question.link });
        } else if (type === 'subtopic' && subIndex !== null) {
            const subtopic = topics[topicIndex].subtopics[subIndex];
            setFormData({ subtopicName: subtopic.name });
        } else {
            setFormData({ name: '', level: '', subtopicName: '', questionText: '', questionLink: '' });
        }
        
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setFormData({ name: '', level: '', subtopicName: '', questionText: '', questionLink: '' });
    };

    const addTopic = () => {
        const { name, level } = formData;
        if (name && level) {
            setTopics((prev) => [...prev, { name, level, subtopics: [] }]);
            closeModal();
        }
    };

    const addSubtopic = () => {
        const { subtopicName } = formData;
        if (subtopicName && currentTopicIndex !== null) {
            const updatedTopics = [...topics];
            updatedTopics[currentTopicIndex].subtopics.push({ name: subtopicName, questions: [] });
            setTopics(updatedTopics);
            closeModal();
        }
    };

    const editSubtopic = () => {
        const { subtopicName } = formData;
        if (subtopicName && currentTopicIndex !== null && currentSubtopicIndex !== null) {
            const updatedTopics = [...topics];
            updatedTopics[currentTopicIndex].subtopics[currentSubtopicIndex].name = subtopicName;
            setTopics(updatedTopics);
            closeModal();
        }
    };

    const saveQuestion = () => {
        const { questionText, questionLink } = formData;
        if (questionText && questionLink && currentTopicIndex !== null && currentSubtopicIndex !== null) {
            const updatedTopics = [...topics];
            if (editQuestionIndex !== null) {
                updatedTopics[currentTopicIndex].subtopics[currentSubtopicIndex].questions[editQuestionIndex] = { text: questionText, link: questionLink };
            } else {
                updatedTopics[currentTopicIndex].subtopics[currentSubtopicIndex].questions.push({ text: questionText, link: questionLink });
            }
            setTopics(updatedTopics);
            closeModal();
        }
    };

    const removeTopic = (topicIndex) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this topic?');
        if (confirmDelete) {
            const updatedTopics = topics.filter((_, index) => index !== topicIndex);
            setTopics(updatedTopics);
        }
    };

    const removeSubtopic = (topicIndex, subIndex) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this subtopic?');
        if (confirmDelete) {
            const updatedTopics = [...topics];
            updatedTopics[topicIndex].subtopics.splice(subIndex, 1);
            setTopics(updatedTopics);
        }
    };
    const removeQuestion = (topicIndex, subIndex, questionIndex) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this question?');
        if (confirmDelete) {
            const updatedTopics = [...topics];
            updatedTopics[topicIndex].subtopics[subIndex].questions.splice(questionIndex, 1);
            setTopics(updatedTopics);
        }
    };

    const toggleSubtopics = (index) => {
        const subtopics = document.getElementById(`subtopics-${index}`);
        subtopics.style.display = subtopics.style.display === 'block' ? 'none' : 'block';
    };

    const toggleQuestions = (topicIndex, subIndex) => {
        const questionsList = document.getElementById(`questions-${topicIndex}-${subIndex}`);
        questionsList.style.display = questionsList.style.display === 'block' ? 'none' : 'block';
    };

    const saveTopics = async () => {
        resetTopic(topics);
        alert('Topics saved successfully');
    };

    return (
        <div className="container mx-auto p-6 bg-gray-800 text-white min-h-screen shadow-lg">
            <h1 className="text-4xl font-bold text-center mb-14">Competitive Programming Topics</h1>
            <div id="topics-container">
                {topics.map((topic, index) => (
                    <div key={index} className="mb-6 border-b border-gray-700 pb-4">
                        <div className='flex min-w-[900px] w-fit justify-between mb-3 items-center'>
                            <h2 onClick={() => toggleSubtopics(index)} className="cursor-pointer font-medium text-2xl mb-2 hover:text-blue-400 transition-colors">
                                {topic.name} : {topic.level}
                            </h2>
                            <button onClick={() => removeTopic(index)} className="bg-red-600 hover:bg-red-700 text-white font-semibold py-1 px-3 rounded mb-2 transition-all duration-200">
                                <img src="delete.svg" alt="delete" />
                            </button>
                        </div>
                        <div className="subtopics" id={`subtopics-${index}`} style={{ display: 'none' }}>
                            {topic.subtopics.map((subtopic, subIndex) => (
                                <div key={subIndex} className="ml-5 mb-1">
                                    <div className='flex justify-between min-w-[750px] w-fit items-center hover:bg-gray-700 rounded-md'>
                                        <h3 onClick={() => toggleQuestions(index, subIndex)} className="cursor-pointer text-xl hover:text-green-400 transition-colors p-2 rounded">
                                            {subtopic.name}
                                        </h3>
                                        <div>
                                            <button onClick={() => openModal('subtopic', index, subIndex)} className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-1 px-2 rounded mr-2 transition-all duration-200">
                                                <img src="edit.svg" alt="edit" />
                                            </button>
                                            <button onClick={() => removeSubtopic(index, subIndex)} className="bg-red-600 hover:bg-red-700 text-white font-semibold py-1 px-2 mr-2 rounded transition-all duration-200">
                                                <img src="delete.svg" alt="delete" />
                                            </button>
                                        </div>
                                    </div>
                                    <ul id={`questions-${index}-${subIndex}`} className="questions ml-5 mb-4" style={{ display: 'none' }}>
                                        {subtopic.questions.map((q, qIndex) => (
                                            <li key={qIndex} className="my-1 flex gap-4 items-center ">
                                                <div className="flex items-center hover:bg-gray-700 transition-colors rounded px-2 py-1">
                                                    <a href={q.link} target="_blank" className={(q.text.includes("M)")?"text-yellow-300":(q.text.includes("E)")?"text-green-400":q.text.includes("H)")?"text-red-500":"text-blue-300"))+" hover:underline w-96 overflow-auto no-scrollbar transition-colors text-lg"}>{q.text}</a>
                                                    <div className='ml-5'>

                                                        <button onClick={() => openModal('question', index, subIndex, qIndex)} className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-1 px-2 rounded mr-2 transition-all duration-200">
                                                            <img src="edit.svg" alt="edit" />
                                                        </button>
                                                        <button onClick={() => removeQuestion(index, subIndex, qIndex)} className="bg-red-600 hover:bg-red-700 text-white font-semibold py-1 px-2 rounded transition-all duration-200">
                                                            <img src="delete.svg" alt="delete" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                        <button onClick={() => openModal('question', index, subIndex)} className="mt-4 flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1 px-3 rounded mb-2 transition-all duration-200">
                                           Add Question
                                        </button>
                                    </ul>
                                </div>
                            ))}
                            <button onClick={() => openModal('subtopic', index)} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1 px-3 rounded mb-2 mt-4 transition-all duration-200">
                                Add Subtopic
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <div className='flex gap-5'>
                <button onClick={() => openModal('topic')} className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded mt-4 transition-all duration-200">
                    Add New Topic
                </button>
                <button onClick={() => saveTopics()} className="bg-green-700 hover:bg-green-800 text-white font-semibold py-2 px-4 rounded mt-4 transition-all duration-200">
                    Save changes
                </button>
            </div>

            {modalVisible && (
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
                        {difficultyLevels.map((level, index) => (
                            <option key={index} value={level}>{level}</option>
                        ))}
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
                    {currentSubtopicIndex !== null ? (
                        <button onClick={editSubtopic} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1 px-2 rounded transition-all duration-200">
                            Save Changes
                        </button>
                    ) : (
                        <button onClick={addSubtopic} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1 px-2 rounded transition-all duration-200">
                            Save Subtopic
                        </button>
                    )}
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
                        {editQuestionIndex !== null ? 'Save Changes' : 'Add Question'}
                    </button>
                </>
            )}
            <button onClick={closeModal} className="ml-6 bg-red-600 hover:bg-red-700 text-white font-semibold py-1 px-2 rounded mt-2 transition-all duration-200">
                Cancel
            </button>
        </div>
    </div>
)}

        </div>
    );
}
