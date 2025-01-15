// components/Home.js
'use client';

import { fetchTopics, resetTopic } from '@/actions/useractions';
import { useEffect, useState } from 'react';
import Modal from './Modal';
import Topic from './Topic';

const difficultyLevels = ['Beginner Level', 'Intermediate Level', 'Advanced Level', 'Expert Level'];

const Home = () => {
    const [topics, setTopics] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalType, setModalType] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        level: '',
        subtopicName: '',
        questionText: '',
        questionLink: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchTopics();
            setTopics(data);
        };
        fetchData();
    }, []);

    const openModal = (type, topicIndex = null, subIndex = null, questionIndex = null) => {
        setModalType(type);
        setModalVisible(true);
        // Additional logic to populate formData for editing
    };

    const closeModal = () => {
        setModalVisible(false);
        setFormData({
            name: '',
            level: '',
            subtopicName: '',
            questionText: '',
            questionLink: ''
        });
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const addTopic = () => {
        // Logic to add topic
    };

    const addSubtopic = () => {
        // Logic to add subtopic
    };

    const saveQuestion = () => {
        // Logic to save question
    };

    const removeTopic = (index) => {
        // Logic to remove topic
    };

    const removeSubtopic = (topicIndex, subIndex) => {
        // Logic to remove subtopic
    };

    const removeQuestion = (topicIndex, subIndex, questionIndex) => {
        // Logic to remove question
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-4">Topics</h1>
            {topics.map((topic, index) => (
                <Topic 
                    key={index} 
                    topic={topic} 
                    index={index} 
                    removeTopic={removeTopic} 
                    openModal={openModal} 
                />
            ))}
            <button onClick={() => openModal('topic')} className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition-all duration-200">
                Add Topic
            </button>
            <Modal 
                modalVisible={modalVisible} 
                modalType={modalType} 
                formData={formData} 
                handleInputChange={handleInputChange} 
                addTopic={addTopic} 
                addSubtopic={addSubtopic} 
                saveQuestion={saveQuestion} 
                closeModal={closeModal} 
            />
        </div>
    );
};

export default Home;
