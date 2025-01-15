// components/Question.js
'use client';

const Question = ({ question, topicIndex, subIndex, questionIndex, openModal, removeQuestion }) => {
    return (
        <li className="my-1 flex gap-4 items-center ">
            <div className="flex items-center hover:bg-gray-700 transition-colors rounded px-2 py-1">
                <a href={question.link} target="_blank" className="text-lg hover:underline">{question.text}</a>
                <div className='ml-5'>
                    <button onClick={() => openModal('question', topicIndex, subIndex, questionIndex)} className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-1 px-2 rounded mr-2 transition-all duration-200">
                        <img src="edit.svg" alt="edit" />
                    </button>
                    <button onClick={() => removeQuestion(topicIndex, subIndex, questionIndex)} className="bg-red-600 hover:bg-red-700 text-white font-semibold py-1 px-2 rounded transition-all duration-200">
                        <img src="delete.svg" alt="delete" />
                    </button>
                </div>
            </div>
        </li>
    );
};

export default Question;
