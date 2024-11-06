"use client"

import { Suspense, useEffect, useState } from "react";
import Form from "@components/Form";
import { useRouter, useSearchParams } from "next/navigation";

const UpdatePrompt = () => {
    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: "",
        tag: ""
    });
    const router = useRouter();

    const promptId = (
        <Suspense fallback={null}>
            {useSearchParams().get("id")}
        </Suspense>
    );

    useEffect(() => {
        const getPrompt = async () => {
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

        if (!promptId) alert("Prompt ID not found");

        try {
            const res = await fetch(`/api/prompt/${promptId}`, {
                method: "PATCH",
                body: JSON.stringify({ ...post })
            })

            if (res.ok) {
                router.push("/")
            }
        } catch (error) {
            console.error(error);
        } finally {
            setSubmitting(false);
        }
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
    )
}

export default UpdatePrompt;