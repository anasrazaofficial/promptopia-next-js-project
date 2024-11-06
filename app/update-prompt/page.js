"use client"

import { Suspense, useEffect, useState } from "react";
import Form from "@components/Form";
import { useRouter } from "next/navigation";

const UpdatePrompt = () => {
    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: "",
        tag: ""
    });
    const [promptId, setPromptId] = useState(null);
    const router = useRouter();

    // Fetch the search parameter when the component mounts
    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const id = searchParams.get("id");
        setPromptId(id);
    }, []);

    useEffect(() => {
        const getPrompt = async () => {
            if (!promptId) return;  // If there's no promptId, skip fetching
            const res = await fetch(`/api/prompt/${promptId}`);
            const data = await res.json();
            setPost({
                prompt: data.prompt,
                tag: data.tag
            });
        }

        if (promptId) getPrompt();
    }, [promptId]);

    const updatePrompt = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        if (!promptId) {
            alert("Prompt ID not found");
            setSubmitting(false);
            return;
        }

        try {
            const res = await fetch(`/api/prompt/${promptId}`, {
                method: "PATCH",
                body: JSON.stringify({ ...post }),
            });

            if (res.ok) {
                router.push("/");
            }
        } catch (error) {
            console.error(error);
        } finally {
            setSubmitting(false);
        }
    };

    if (!promptId) {
        return <div>Loading...</div>;
    }

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Form
                type="Edit"
                post={post}
                setPost={setPost}
                submitting={submitting}
                handleSubmit={updatePrompt}
            />
        </Suspense>
    );
};

export default UpdatePrompt;
