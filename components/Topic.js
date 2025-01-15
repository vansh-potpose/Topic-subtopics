// components/Topic.js
'use client';

import Subtopic from './Subtopic';

const Topic = ({ topic, index, removeTopic, openModal }) => {
    return (
        <div className="mb-6 border-b border-gray-700 pb-4">
            <div className='flex min-w-[900px] w-fit justify-between mb-3 items-center'>
                <h2 onClick={() => toggleSubtopics(index)} className="cursor-pointer font-medium text-2xl mb-2 hover:text-blue-400 transition-colors">
                    {topic.name} : {topic.level}
                </h2>
                <button onClick={() => removeTopic(index)} className="bg-red-600 hover:bg-red-700 text-white font-semibold py-1 px-3 rounded mb-2 transition-all duration-200">
                    <img src="delete.svg" alt="delete" />
                </button>
            </div>
            {topic.subtopics.map((subtopic, subIndex) => (
                <Subtopic 
                    key={subIndex} 
                    topic={topic} 
                    subtopic={subtopic} 
                    subIndex={subIndex} 
                    topicIndex={index} 
                    openModal={openModal} 
                />
            ))}
            <button onClick={() => openModal('subtopic', index)} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1 px-3 rounded mb-2 mt-4 transition-all duration-200">
                Add Subtopic
            </button>
        </div>
    );
};

export default Topic;
