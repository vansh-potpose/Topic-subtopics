'use server'
import Topic from "@/models/Topic"
import connectDB from "@/db/connectDb"


export const fetchTopics=async () => {
    await connectDB()
    let topics = await Topic.find({}).lean();
    return topics; 
}
export const resetTopic=async (topic) => {
    await connectDB()
    await Topic.deleteMany(); 
    await Topic.insertMany(topic);
}
