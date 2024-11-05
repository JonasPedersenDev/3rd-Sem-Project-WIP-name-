import React, { useEffect, useState } from 'react';
import ApiService from '../../../utils/ApiService';

// Define the Tool interface
interface Tool {
    id: number;
    name: string;
    description: string;
    resourcePictureFileName: string;
    type: string;
    capacity: number;
    status: string;
}

const Contact: React.FC = () => {
    const [tools, setTools] = useState<Tool[]>([]);
    const [error, setError] = useState<string | null>(null);

    // Function to fetch tools
    const getAllTools = async () => {
        try {
            const response = await ApiService.fetchData<Tool[]>('tool/all');
            setTools(response.data); // Update state with the fetched tools
        } catch (error: any) {
            setError("Error fetching tools");
            console.error("Error fetching tools", error.message || error);
        }
    };

    // Fetch tools on component mount
    useEffect(() => {
        getAllTools();
    }, []);

    return (
        <div>
            <h2>Tool List</h2>
            {error ? (
                <p>{error}</p>
            ) : (
                <ul>
                    {tools.map((tool) => (
                        <li key={tool.id}>{tool.name}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Contact;
