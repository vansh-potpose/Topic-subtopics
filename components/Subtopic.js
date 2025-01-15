// components/Subtopic.js
'use client';

import Question from './Question';

const Subtopic = ({ topic, subtopic, subIndex, topicIndex, openModal, removeSubtopic }) => {
    return (
        <div className="ml-5 mb-1">
            <div className='flex justify-between min-w-[750px] w-fit items-center hover:bg-gray-700 rounded-md'>
                <h3 onClick={() => toggleQuestions(topicIndex, subIndex)} className="cursor-pointer text-xl hover:text-green-400 transition-colors p-2 rounded">
                    {subtopic.name}
                </h3>
                <div>
                    <button onClick={() => openModal('subtopic', topicIndex, subIndex)} className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-1 px-2 rounded mr-2 transition-all duration-200">
                        <img src="edit.svg" alt="edit" />
                    </button>
                    <button onClick={() => removeSubtopic(topicIndex, subIndex)} className="bg-red-600 hover:bg-red-700 text-white font-semibold py-1 px-2 mr-2 rounded transition-all duration-200">
                        <img src="delete.svg" alt="delete" />
                    </button>
                </div>
            </div>
            {subtopic.questions.map((question, qIndex) => (
                <Question 
                    key={qIndex} 
                    question={question} 
                    topicIndex={topicIndex} 
                    subIndex={subIndex} 
                    questionIndex={qIndex} 
                    openModal={openModal} 
                />
            ))}
            <button onClick={() => openModal('question', topicIndex, subIndex)} className="mt-4 flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1 px-3 rounded mb-2 transition-all duration-200">
                Add Question
            </button>
        </div>
    );
};

export default Subtopic;
